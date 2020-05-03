const randomItem = <T>(items: T[] = []): T =>
  items[Math.floor(Math.random() * items.length)]

const angle = (
  [cy = 0, cx = 0]: number[] = [],
  [ey = 0, ex = 0]: number[] = []
): number => {
  const dy = ey - cy
  const dx = ex - cx
  let theta = Math.atan2(dy, dx) // range (-PI, PI]
  theta *= 180 / Math.PI // rads to degs, range (-180, 180]
  // if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta
}

const average = (
  [cy = 0, cx = 0]: number[] = [],
  [ey = 0, ex = 0]: number[] = []
): [number, number] => [(cy + ey) / 2, (cx + ex) / 2]

export { randomItem, angle, average }
