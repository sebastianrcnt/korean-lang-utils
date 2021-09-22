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
export class InvalidLetterLengthException extends Error {}

@injectCustomErrorMessage("한글 글자가 아닙니다")
export class NotHangulLetterException extends Error {}

@injectCustomErrorMessage("더 이상 분해할 수 없는 기본 음운입니다")
export class AlreadyDisassembledLetterException extends Error {}
