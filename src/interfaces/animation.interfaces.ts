export interface TransitionContract {
  duration: number;
  delay: number;
  easing: () => any;
  css: (t: number, u: number) => any,
  tick?: (t: number, u: number) => any
}

export interface ShiftingParams {
  duration: number;
  delay: number;
  easing: () => any
} 