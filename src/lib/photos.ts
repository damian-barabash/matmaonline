import online from '../assets/img/lesson-online.webp'
import young from '../assets/img/klasy-1-3.webp'
import older from '../assets/img/klasy-4-6.webp'
import pencils from '../assets/img/kredki.webp'
import portrait from '../assets/img/stasia-portrait.webp'
import sticker from '../assets/img/stasia-sticker.webp'
import type { PhotoKey } from '../content/types'

export const PHOTOS: Record<PhotoKey, { src: string; w: number; h: number }> = {
  online: { src: online, w: 1200, h: 900 },
  young: { src: young, w: 1000, h: 667 },
  older: { src: older, w: 1000, h: 667 },
  pencils: { src: pencils, w: 800, h: 800 },
}
export const PORTRAIT = { src: portrait, w: 1000, h: 1250 }
export const STICKER = { src: sticker, w: 799, h: 1399 }
