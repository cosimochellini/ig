import hub from '~/services/hubService'
import { canvas as Canvas } from '~/services/index'

const puplocUrl =
  'https://f002.backblazeb2.com/file/tehnokv-www/posts/puploc-with-trees/demo/puploc.bin'
const cascadeUrl =
  'https://raw.githubusercontent.com/nenadmarkus/pico/c2e81f9d23cc11d1a612fd21e4f9de0921a5d0d9/rnt/cascades/facefinder'

let dets = null
let initialized = false
let faceFinderClassifyRegion = () => -1.0
let doPuploc = (
  _r: any,
  _c: any,
  _s: any,
  _number: number,
  _image: { pixels: Uint8Array; nrows: number; ncols: number; ldim: number }
) => [-1.0, -1.0]

const rgbaToGrayscale = (
  rgba: Uint8ClampedArray | undefined,
  nRows: number,
  nCols: number
) => {
  const gray = new Uint8Array(nRows * nCols)
  for (let r = 0; r < nRows; ++r)
    for (let c = 0; c < nCols; ++c)
      // gray = 0.2*red + 0.7*green + 0.1*blue
      if (rgba) {
        gray[r * nCols + c] =
          (2 * rgba[r * 4 * nCols + 4 * c] +
            7 * rgba[r * 4 * nCols + 4 * c + 1] +
            rgba[r * 4 * nCols + 4 * c + 2]) /
          10
      }
  return gray
}

export default (debug = false) => {
  const currentCanvas = document.getElementsByTagName('canvas')[0]
  currentCanvas.width = window.innerWidth * 0.9
  currentCanvas.height = window.innerHeight * 0.7

  const ctx = currentCanvas.getContext('2d')

  if (initialized) return // if yes, then do not initialize everything again

  // @ts-ignore
  const updateMemory = window.pico.instantiate_detection_memory(5) // we will use the detecions of the last 5 frames

  fetch(cascadeUrl).then((response) => {
    response.arrayBuffer().then((buffer) => {
      const bytes = new Int8Array(buffer)
      // @ts-ignore
      faceFinderClassifyRegion = window.pico.unpack_cascade(bytes)
    })
  })

  fetch(puplocUrl).then((response) => {
    response.arrayBuffer().then((buffer) => {
      const bytes = new Int8Array(buffer)
      // @ts-ignore
      doPuploc = window.lploc.unpack_localizer(bytes)
    })
  })

  /*
    (4) this function is called each time a video frame becomes available
  */
  const processfn = (video: HTMLVideoElement): void => {
    // render the video frame to the canvas element and extract RGBA pixel data
    // eslint-disable-next-line no-unused-expressions
    ctx?.drawImage(video, 0, 0)
    const rgba = ctx?.getImageData(0, 0, 640, 480).data
    // prepare input to `run_cascade`
    const image = {
      pixels: rgbaToGrayscale(rgba, 480, 640),
      nrows: 480,
      ncols: 640,
      ldim: 640,
    }
    const params = {
      shiftfactor: 0.1, // move the detection window by 10% of its size
      minsize: 100, // minimum size of a face
      maxsize: 1000, // maximum size of a face
      scalefactor: 1.1, // for multiscale processing: resize the detection window by 10% when moving to the higher scale
    }
    // run the cascade over the frame and cluster the obtained detections
    // dets is an array that contains (r, c, s, q) quadruplets
    // (representing row, column, scale and detection score)
    // @ts-ignore
    dets = window.pico.run_cascade(image, faceFinderClassifyRegion, params)
    dets = updateMemory(dets)
    // @ts-ignore
    dets = window.pico.cluster_detections(dets, 0.2) // set IoU threshold to 0.2
    // draw detections
    for (let i = 0; i < dets.length; ++i)
      // check the detection score
      // if it's above the threshold, draw it
      // (the constant 50.0 is empirical: other cascades might require a different one)
      if (dets[i][3] > 20.0) {
        let r, c, s
        //
        if (ctx && debug) {
          ctx.beginPath()
          ctx.arc(dets[i][1], dets[i][0], dets[i][2] / 2, 0, 2 * Math.PI, false)
          ctx.lineWidth = 3
          ctx.strokeStyle = 'red'
          ctx.stroke()
        }
        //
        // find the eye pupils for each detected face
        // starting regions for localization are initialized based on the face bounding box
        // (parameters are set empirically)
        // first eye
        r = dets[i][0] - 0.075 * dets[i][2]
        c = dets[i][1] - 0.175 * dets[i][2]
        s = 0.35 * dets[i][2]
        ;[r, c] = doPuploc(r, c, s, 63, image)
        const eye1 = [r, c]
        if (r >= 0 && c >= 0 && ctx && debug) {
          ctx.beginPath()
          ctx.arc(c, r, 1, 0, 2 * Math.PI, false)
          ctx.lineWidth = 3
          ctx.strokeStyle = 'red'
          ctx.stroke()
        }
        // second eye
        r = dets[i][0] - 0.075 * dets[i][2]
        c = dets[i][1] + 0.175 * dets[i][2]
        s = 0.35 * dets[i][2]
        ;[r, c] = doPuploc(r, c, s, 63, image)
        const eye2 = [r, c]
        if (r >= 0 && c >= 0 && ctx && debug) {
          ctx.beginPath()
          ctx.arc(c, r, 1, 0, 2 * Math.PI, false)
          ctx.lineWidth = 3
          ctx.strokeStyle = 'red'
          ctx.stroke()
        }

        hub.$emit('update-face', { eyes: [eye1, eye2], depth: s })
      }
  }
  /*
    (5) instantiate camera handling (see https://github.com/cbrandolino/camvas)
  */
  if (ctx) {
    // @ts-ignore
    window.canvas = new Canvas(processfn)
  }
  /*
    (6) it seems that everything went well
  */
  initialized = true
}
