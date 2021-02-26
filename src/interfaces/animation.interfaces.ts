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

export interface AnimatingChildNode extends Element {
  formerPos?: DOMRect;
  formerPosition?: DOMRect;
  getBoundingClientRect: () => DOMRect;
  style?: ElementCSSInlineStyle["style"];
  dataset?: HTMLOrSVGElement["dataset"]
}

export interface AnimatingNode extends HTMLElement {
  formerPos?: DOMRect;
  formerPosition?: DOMRect | string;
}

export interface Stack extends Array<AnimatingChildNode> {
  [index: number]: AnimatingChildNode
}