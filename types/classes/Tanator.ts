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
    } = raw

    this.text = text
    this.nicknames = nicknames
    this.images = images
    this.color = color
    this.description = description
    this.elite = elite
    this.oldTanator = oldTanator
    this.newTanator = newTanator
  }

  get computedImage(): string {
    return randomItem(this.images)
  }

  get computedNickname(): string {
    return randomItem(this.nicknames)
  }
}

export { Tanator }
