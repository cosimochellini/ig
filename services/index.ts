const canvas = (callback: (video: HTMLVideoElement) => void) => {
  // We can't `new Video()` yet, so we'll resort to the vintage
  // "hidden div" hack for dynamic loading.
  const streamContainer = document.createElement('div')
  const videoElement = document.createElement('video')

  // If we don't do this, the stream will not be played.
  // By the way, the play and pause controls work as usual
  // for streamed videos.
  videoElement.setAttribute('autoplay', '1')
  videoElement.setAttribute('playsinline', '1') // important for iPhones

  // The video should fill out all of the canvas
  videoElement.setAttribute('width', '1')
  videoElement.setAttribute('height', '1')

  streamContainer.appendChild(videoElement)
  document.body.appendChild(streamContainer)

  // The callback happens when we are starting to stream the video.
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((stream) => {
      // Yay, now our webcam input is treated as a normal video and
      // we can start having fun
      videoElement.srcObject = stream
      // Let's start drawing the canvas!
      update(callback, videoElement)
    })

  // As soon as we can draw a new frame on the canvas, we call the `draw` function
  // we passed as a parameter.
  const update = (
    callback: (video: HTMLVideoElement) => void,
    video: HTMLVideoElement
  ) => {
    const loop = () => {
      callback(video)
      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)
  }
}

export { canvas }
