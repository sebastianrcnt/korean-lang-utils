import {
  AlreadyDisassembledLetterException,
  NotHangulLetterException,
} from "../errors";
import assembleLetter from "./assembleLetter";
import disassembleLetter from "./disassembleLetter";

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
      if (letterObject.bottom !== "") stack.push(letterString);
    } catch (error) {
      if (error instanceof NotHangulLetterException) stack.push(letterString);
      else if (error instanceof AlreadyDisassembledLetterException)
        stack.push(letterString);
      else throw error;
    }

    stack.forEach((s) => {
      history.push(prev + s);
    });

    prev = history[history.length - 1];
  }

  return history;
};

export default typewrite;
