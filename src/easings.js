/*
Adapted from https://github.com/mattdesl
Distributed under MIT License https://github.com/mattdesl/eases/blob/master/LICENSE.md
*/

export const linear = (x) => x

export const backInOut = (t) => {
  const s = 1.70158 * 1.525
  if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s))
  return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2)
}

export const backIn = (t) => {
  const s = 1.70158
  return t * t * ((s + 1) * t - s)
}

export const backOut = (t) => {
  const s = 1.70158
  return --t * t * ((s + 1) * t + s) + 1
}

export const bounceOut = (t) => {
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

export const bounceInOut = (t) => {
  return t < 0.5
    ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0))
    : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5
}

export const bounceIn = (t) => {
  return 1.0 - bounceOut(1.0 - t)
}

export const circInOut = (t) => {
  if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1)
  return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
}

export const circIn = (t) => {
  return 1.0 - Math.sqrt(1.0 - t * t)
}

export const circOut = (t) => {
  return Math.sqrt(1 - --t * t)
}

export const cubicInOut = (t) => {
  return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0
}

export const cubicIn = (t) => {
  return t * t * t
}

export const cubicOut = (t) => {
  const f = t - 1.0
  return f * f * f + 1.0
}

export const elasticInOut = (t) => {
  return t < 0.5
    ? 0.5 *
        Math.sin(((+13.0 * Math.PI) / 2) * 2.0 * t) *
        Math.pow(2.0, 10.0 * (2.0 * t - 1.0))
    : 0.5 *
        Math.sin(((-13.0 * Math.PI) / 2) * (2.0 * t - 1.0 + 1.0)) *
        Math.pow(2.0, -10.0 * (2.0 * t - 1.0)) +
        1.0
}

export const elasticIn = (t) => {
  return Math.sin((13.0 * t * Math.PI) / 2) * Math.pow(2.0, 10.0 * (t - 1.0))
}

export const elasticOut = (t) => {
  return (
    Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(2.0, -10.0 * t) + 1.0
  )
}

export const expoInOut = (t) => {
  return t === 0.0 || t === 1.0
    ? t
    : t < 0.5
    ? +0.5 * Math.pow(2.0, 20.0 * t - 10.0)
    : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0
}

export const expoIn = (t) => {
  return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0))
}

export const expoOut = (t) => {
  return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t)
}

export const quadInOut = (t) => {
  t /= 0.5
  if (t < 1) return 0.5 * t * t
  t--
  return -0.5 * (t * (t - 2) - 1)
}

export const quadIn = (t) => {
  return t * t
}

export const quadOut = (t) => {
  return -t * (t - 2.0)
}

export const quartInOut = (t) => {
  return t < 0.5 ? +8.0 * Math.pow(t, 4.0) : -8.0 * Math.pow(t - 1.0, 4.0) + 1.0
}

export const quartIn = (t) => {
  return Math.pow(t, 4.0)
}

export const quartOut = (t) => {
  return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0
}

export const quintInOut = (t) => {
  if ((t *= 2) < 1) return 0.5 * t * t * t * t * t
  return 0.5 * ((t -= 2) * t * t * t * t + 2)
}

export const quintIn = (t) => {
  return t * t * t * t * t
}

export const quintOut = (t) => {
  return --t * t * t * t * t + 1
}

export const sineInOut = (t) => {
  return -0.5 * (Math.cos(Math.PI * t) - 1)
}

export const sineIn = (t) => {
  const v = Math.cos(t * Math.PI * 0.5)
  if (Math.abs(v) < 1e-14) return 1
  return 1 - v
}

export const sineOut = (t) => {
  return Math.sin((t * Math.PI) / 2)
}
