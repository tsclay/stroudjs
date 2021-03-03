/*
Adapted from https://github.com/mattdesl
Distributed under MIT License https://github.com/mattdesl/eases/blob/master/LICENSE.md
*/

type EasingFunction = (t: number) => number

export const linear: EasingFunction = (t) => t

export const backInOut: EasingFunction = (t) => {
  const s = 1.70158 * 1.525
  if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s))
  return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2)
}

export const backIn: EasingFunction = (t) => {
  const s = 1.70158
  return t * t * ((s + 1) * t - s)
}

export const backOut: EasingFunction = (t) => {
  const s = 1.70158
  return --t * t * ((s + 1) * t + s) + 1
}

export const bounceOut: EasingFunction = (t) => {
  const a = 4.0 / 11.0
  const b = 8.0 / 11.0
  const c = 9.0 / 10.0

  const ca = 4356.0 / 361.0
  const cb = 35442.0 / 1805.0
  const cc = 16061.0 / 1805.0

  const t2 = t * t

  return t < a
    ? 7.5625 * t2
    : t < b
    ? 9.075 * t2 - 9.9 * t + 3.4
    : t < c
    ? ca * t2 - cb * t + cc
    : 10.8 * t * t - 20.52 * t + 10.72
}

export const bounceInOut: EasingFunction = (t) => {
  return t < 0.5
    ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0))
    : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5
}

export const bounceIn: EasingFunction = (t) => {
  return 1.0 - bounceOut(1.0 - t)
}

export const circInOut: EasingFunction = (t) => {
  if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1)
  return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
}

export const circIn: EasingFunction = (t) => {
  return 1.0 - Math.sqrt(1.0 - t * t)
}

export const circOut: EasingFunction = (t) => {
  return Math.sqrt(1 - --t * t)
}

export const cubicInOut: EasingFunction = (t) => {
  return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0
}

export const cubicIn: EasingFunction = (t) => {
  return t * t * t
}

export const cubicOut: EasingFunction = (t) => {
  const f = t - 1.0
  return f * f * f + 1.0
}

export const elasticInOut: EasingFunction = (t) => {
  return t < 0.5
    ? 0.5 *
        Math.sin(((+13.0 * Math.PI) / 2) * 2.0 * t) *
        Math.pow(2.0, 10.0 * (2.0 * t - 1.0))
    : 0.5 *
        Math.sin(((-13.0 * Math.PI) / 2) * (2.0 * t - 1.0 + 1.0)) *
        Math.pow(2.0, -10.0 * (2.0 * t - 1.0)) +
        1.0
}

export const elasticIn: EasingFunction = (t) => {
  return Math.sin((13.0 * t * Math.PI) / 2) * Math.pow(2.0, 10.0 * (t - 1.0))
}

export const elasticOut: EasingFunction = (t) => {
  return (
    Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(2.0, -10.0 * t) + 1.0
  )
}

export const expoInOut: EasingFunction = (t) => {
  return t === 0.0 || t === 1.0
    ? t
    : t < 0.5
    ? +0.5 * Math.pow(2.0, 20.0 * t - 10.0)
    : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0
}

export const expoIn: EasingFunction = (t) => {
  return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0))
}

export const expoOut: EasingFunction = (t) => {
  return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t)
}

export const quadInOut: EasingFunction = (t) => {
  t /= 0.5
  if (t < 1) return 0.5 * t * t
  t--
  return -0.5 * (t * (t - 2) - 1)
}

export const quadIn: EasingFunction = (t) => {
  return t * t
}

export const quadOut: EasingFunction = (t) => {
  return -t * (t - 2.0)
}

export const quartInOut: EasingFunction = (t) => {
  return t < 0.5 ? +8.0 * Math.pow(t, 4.0) : -8.0 * Math.pow(t - 1.0, 4.0) + 1.0
}

export const quartIn: EasingFunction = (t) => {
  return Math.pow(t, 4.0)
}

export const quartOut: EasingFunction = (t) => {
  return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0
}

export const quintInOut: EasingFunction = (t) => {
  if ((t *= 2) < 1) return 0.5 * t * t * t * t * t
  return 0.5 * ((t -= 2) * t * t * t * t + 2)
}

export const quintIn: EasingFunction = (t) => {
  return t * t * t * t * t
}

export const quintOut: EasingFunction = (t) => {
  return --t * t * t * t * t + 1
}

export const sineInOut: EasingFunction = (t) => {
  return -0.5 * (Math.cos(Math.PI * t) - 1)
}

export const sineIn: EasingFunction = (t) => {
  const v = Math.cos(t * Math.PI * 0.5)
  if (Math.abs(v) < 1e-14) return 1
  return 1 - v
}

export const sineOut: EasingFunction = (t) => {
  return Math.sin((t * Math.PI) / 2)
}
