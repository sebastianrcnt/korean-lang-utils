const TOP_ATOMS = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const MID_ATOMS = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];

const BOTTOM_ATOMS = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

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

type CharCodeType = number;

const isLetter = (letter: string) => {
  return letter.length <= 1;
};

const getCharCode = (letter: string) => {
  if (!isLetter(letter)) {
    throw new Error("Letters should be 1 length long");
  }

  return letter.charCodeAt(0);
};

const getTopAtomByIndex = (index: number) => TOP_ATOMS[index];
const getMidAtomByIndex = (index: number) => MID_ATOMS[index];
const getBottomAtomByIndex = (index: number) => BOTTOM_ATOMS[index];

const getIndexOfTopAtom = (topAtom: string) => topAtomsIndexMap.get(topAtom);
const getIndexOfMidAtom = (midAtom: string) => midAtomsIndexMap.get(midAtom);
const getIndexOfBottomAtom = (bottomAtom: string) =>
  bottomAtomsIndexMap.get(bottomAtom);

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

const isHangul = (letterString: string): boolean => {
  const code = getCharCode(letterString);
  return code >= 44032 && code <= 55199;
};

const isCompleteLetter = (letterString: string): boolean => {
  const code = getCharCode(letterString);
  return 0xac00 <= code && code <= 0xd7a3;
};

interface ILetterObject {
  top: string;
  mid: string;
  bottom: string; // includes ""
}

const injectCustomErrorMessage = (errorMessage: string) => {
  return function classDecorator<T extends { new (...args: any[]): {} }>(
    constructor: T
  ) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(errorMessage);
      }
    };
  };
};

@injectCustomErrorMessage("글자의 길이는 1 이하여야 합니다")
class InvalidLetterLengthException extends Error {}

@injectCustomErrorMessage("한글 글자가 아닙니다")
class NotHangulLetterException extends Error {}

@injectCustomErrorMessage("더 이상 분해할 수 없는 기본 음운입니다")
class AlreadyDisassembledLetterException extends Error {}

const disassembleLetter = (letterString: string): ILetterObject => {
  if (!isLetter(letterString)) {
    throw new InvalidLetterLengthException();
  }

  if (!isHangul(letterString)) {
    throw new NotHangulLetterException();
  }

  if (!isCompleteLetter(letterString)) {
    throw new AlreadyDisassembledLetterException();
  }

  const charCode = getCharCode(letterString);
  const topIndex = Math.floor((charCode - 44032) / 21 / 28);
  const midIndex = Math.floor((charCode - 44032 - topIndex * 21 * 28) / 28);
  const bottomIndex = Math.floor(
    charCode - 44032 - topIndex * 21 * 28 - midIndex * 28
  );

  return {
    top: getTopAtomByIndex(topIndex),
    mid: getMidAtomByIndex(midIndex),
    bottom: getBottomAtomByIndex(bottomIndex),
  };
};

const serializeLetterObject = (letterObject: ILetterObject): string[] =>
  letterObject.bottom === ""
    ? [letterObject.top, letterObject.mid]
    : [letterObject.top, letterObject.mid, letterObject.bottom];

const typewrite = (sentence: string) => {
  let prev = "";
  let history: string[] = [];

  for (let i = 0; i < sentence.length; i++) {
    const letterString = sentence[i];
    let stack = [];
    try {
      const letterObject = disassembleLetter(letterString);
      stack.push(letterObject.top);
      stack.push(
        assembleLetter({
          top: letterObject.top,
          mid: letterObject.mid,
          bottom: "",
        })
      );
      if (letterObject.bottom !== "") {
        stack.push(letterString);
      }
    } catch (error) {
      if (error instanceof NotHangulLetterException) {
        stack.push(letterString);
      } else if (error instanceof AlreadyDisassembledLetterException) {
        stack.push(letterString);
      } else {
        throw error;
      }
    }

    stack.forEach((s) => {
      history.push(prev + s);
    });

    prev = history[history.length - 1];
  }

  return history;
};

export { typewrite };
