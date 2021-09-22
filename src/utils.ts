import { BOTTOM_ATOMS, MID_ATOMS, TOP_ATOMS } from "./constants";

const reverseMapify = <T>(source: T[]): Map<T, number> => {
  const result = new Map<T, number>();
  for (let index = 0; index < source.length; index++) {
    result.set(source[index], index);
  }
  return result;
};

const topAtomsIndexMap = reverseMapify<string>(TOP_ATOMS);
const midAtomsIndexMap = reverseMapify<string>(MID_ATOMS);
const bottomAtomsIndexMap = reverseMapify<string>(BOTTOM_ATOMS);

export const getCharCode = (letter: string) => {
  if (!isLetter(letter)) throw new Error("Letters should be 1 length long");
  return letter.charCodeAt(0);
};

// index -> atom
// atom -> index
export const getTopAtomByIndex = (index: number) => TOP_ATOMS[index];
export const getMidAtomByIndex = (index: number) => MID_ATOMS[index];
export const getBottomAtomByIndex = (index: number) => BOTTOM_ATOMS[index];

export const getIndexOfTopAtom = (topAtom: string) =>
  topAtomsIndexMap.get(topAtom);
export const getIndexOfMidAtom = (midAtom: string) =>
  midAtomsIndexMap.get(midAtom);
export const getIndexOfBottomAtom = (bottomAtom: string) =>
  bottomAtomsIndexMap.get(bottomAtom);

// validators
export const isHangul = (letterString: string): boolean => {
  const code = getCharCode(letterString);
  return code >= 44032 && code <= 55199;
};

export const isLetter = (letter: string) => letter.length <= 1;
export const isCompleteLetter = (letterString: string): boolean => {
  const code = getCharCode(letterString);
  return 0xac00 <= code && code <= 0xd7a3;
};

export const serializeLetterObject = (letterObject: ILetterObject): string[] =>
  letterObject.bottom === ""
    ? [letterObject.top, letterObject.mid]
    : [letterObject.top, letterObject.mid, letterObject.bottom];
