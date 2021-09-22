import {
  AlreadyDisassembledLetterException,
  InvalidLetterLengthException,
  NotHangulLetterException,
} from "../errors";
import {
  getBottomAtomByIndex,
  getCharCode,
  getMidAtomByIndex,
  getTopAtomByIndex,
  isCompleteLetter,
  isHangul,
  isLetter,
} from "../utils";

const disassembleLetter = (letterString: string): ILetterObject => {
  if (!isLetter(letterString)) throw new InvalidLetterLengthException();
  if (!isHangul(letterString)) throw new NotHangulLetterException();
  if (!isCompleteLetter(letterString))
    throw new AlreadyDisassembledLetterException();

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

export default disassembleLetter;
