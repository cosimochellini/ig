import { randomItem } from '~/services/math.service'

class Tanator {
  text: string

  nicknames: string[]

  images: string[]

  color: string

  description: string

  elite: boolean

  oldTanator: boolean

  newTanator: boolean

  presences: string[]

  constructor(raw: any = {}) {
    const {
      text = '',
      nicknames = [],
      images = [],
      color = '',
      description = '',
      elite = false,
      oldTanator = false,
      newTanator = false,
      presences = [],
    } = raw

    this.text = text
    this.nicknames = nicknames
    this.images = images
    this.color = color
    this.description = description
    this.elite = elite
    this.oldTanator = oldTanator
    this.newTanator = newTanator
    this.presences = presences
  }

  get computedImage(): string {
    return randomItem(this.images)
  }

  get defaultImage(): string {
    return this.images[0]
  }

  get computedNickname(): string {
    return randomItem(this.nicknames)
  }

  get computedCarousel(): string[] {
    const firstImage = this.computedImage
    return [firstImage, ...this.images.filter((i) => i !== firstImage)]
  }
}

export { Tanator }
