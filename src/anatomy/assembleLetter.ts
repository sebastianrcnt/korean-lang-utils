import {
  getIndexOfBottomAtom,
  getIndexOfMidAtom,
  getIndexOfTopAtom,
} from "../utils";

const assembleLetter = (letterObject: ILetterObject): string => {
  const { top, mid, bottom } = letterObject;
  let topIndex = getIndexOfTopAtom(top);
  let midIndex = getIndexOfMidAtom(mid);
  let bottomIndex = getIndexOfBottomAtom(bottom);

  if (topIndex === undefined) {
    throw new Error(`${top}은 유효한 초성이 아닙니다`);
  }

  if (midIndex === undefined) {
    throw new Error(`${top}은 유효한 중성이 아닙니다`);
  }

  if (bottomIndex === undefined) {
    throw new Error(`${top}은 유효한 종성이 아닙니다`);
  }

  let assembledLetterCharCode: CharCodeType =
    topIndex * 21 * 28 + midIndex * 28 + bottomIndex + 44032;

  return String.fromCharCode(assembledLetterCharCode);
};

export default assembleLetter;
