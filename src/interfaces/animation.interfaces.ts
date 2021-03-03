export interface TransitionContract {
  duration: number;
  delay: number;
  easing: (t?: number) => number;
  css: (t: number, u: number) => any,
  tick?: (t: number, u: number) => any
}

export interface ShiftingParams {
  duration: number;
  delay: number;
  easing: (t?: number) => number
} 

export interface AnimatingChildNode extends Element {
  onanimationend?: () => void;
  formerPos?: DOMRect;
  formerPosition?: DOMRect | null;
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