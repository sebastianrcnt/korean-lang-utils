import {
  ASSEMBLED_TOP_ATOMS_MAP,
  COMPLEX_CONSONANTS_HASH,
  COMPLEX_VOWELS_HASH,
  CONSONANTS_MAP,
  DISASSEMBLED_BOTTOM_ATOMS,
  DISASSEMBLED_MIDDLE_ATOMS,
  DISASSEMBLED_TOP_ATOMS,
  HANGUL_OFFSET,
  ASSEMBLED_BOTTOM_ATOMS_MAP,
  ASSEMBLED_MID_ATOMS_MAP,
} from "./constants";

export type CharCodeType = number;
export type AtomType = string;
export type DisassembledAtomsListType = (AtomType | AtomType[])[];
export type AssembledAtomsListType = AtomType[];
export type CharIndex = number;

/* c 가 CONSONANTS의 멤버일 경우 true 반환 (c가 자음일 경우 true 반환) */
function isConsonant(c: CharCodeType): boolean {
  return Boolean(CONSONANTS_MAP[c]);
}

/* c 가 COMPLETE_JUNG의 멤버일 경우 true 반환 (c 가 초성일 경우 true 반환) */
function isTop(c: CharCodeType): boolean {
  return Boolean(ASSEMBLED_TOP_ATOMS_MAP[c]);
}

/* c 가 COMPLETE_JUNG의 멤버일 경우 true 반환 (c 가 중성일 경우 true 반환) */
function isMid(c: CharCodeType): boolean {
  return Boolean(ASSEMBLED_MID_ATOMS_MAP[c]);
}

/* c 가 COMPLETE_JONG의 멤버일 경우 true 반환 (c 가 종성일 경우 true 반환) */
function isEnd(c: CharCodeType): boolean {
  return Boolean(ASSEMBLED_BOTTOM_ATOMS_MAP[c]);
}
/* c 가 한글일 경우 true 반환 */
function isHangul(c: CharCodeType): boolean {
  return 0xac00 <= c && c <= 0xd7a3;
}

/* a와 b가 중성으로서 결합할 수 있는 경우 COMPLEX_VOWELS_HASH[a][b] 값(결합한 종성의 유니코드 값) 반환 */
function _isJungJoinable(a: CharCodeType, b: CharCodeType) {
  return COMPLEX_VOWELS_HASH[a] && COMPLEX_VOWELS_HASH[a][b]
    ? COMPLEX_VOWELS_HASH[a][b]
    : false;
}
/* a와 b가 종성으로서 결합할 수 있는 경우 COMPLEX_CONSONANTS_HASH[a][b] 값(결합한 종성의 유니코드 값) 반환 */
function _isJongJoinable(a: CharCodeType, b: CharCodeType) {
  return COMPLEX_CONSONANTS_HASH[a] && COMPLEX_CONSONANTS_HASH[a][b]
    ? COMPLEX_CONSONANTS_HASH[a][b]
    : false;
}

const disassemble = function (str: string) {
  if (!str) {
    throw new Error("Arguments cannot be null");
  }

  var result: AtomType[] = [];
  let length = str.length;
  let top: CharCodeType;
  let mid: CharCodeType;
  let end: CharCodeType;
  let r;

  /* 모든 문자에 대해 확인 */
  for (let i = 0; i < length; i++) {
    var letterComponents: AtomType[] = [];
    let currentCharacterCharCode: CharCodeType = str.charCodeAt(i); // 문자를 유니코드값으로 변환해 code에 저장

    /* i번째 문자(code)가 완성된 한글인 경우 */
    if (isHangul(currentCharacterCharCode)) {
      currentCharacterCharCode -= HANGUL_OFFSET;
      end = currentCharacterCharCode % 28;
      mid = ((currentCharacterCharCode - end) / 28) % 21;
      top = Math.floor((currentCharacterCharCode - end) / 28 / 21);
      letterComponents.push(DISASSEMBLED_TOP_ATOMS[top]); // temp 배열에 초성 추가
      /* 중성이 object형인 경우 (2 단일 모음의 조합인 경우) */
      if (typeof DISASSEMBLED_MIDDLE_ATOMS[mid] === "object") {
        letterComponents = letterComponents.concat(
          DISASSEMBLED_MIDDLE_ATOMS[mid]
        ); // temp에 해당 중성의 모음들 추가
        /* 중성이 단일 모음으로 이루어진 경우 */
      } else {
        letterComponents.push(DISASSEMBLED_MIDDLE_ATOMS[mid]); // temp에 해당 모음 추가
      }
      /* 종성이 있는 경우 */
      if (end > 0) {
        /* 종성이 object형인 경우 (2 단일 자음의 조합인 경우) */
        if (typeof DISASSEMBLED_BOTTOM_ATOMS[end] === "object") {
          letterComponents = letterComponents.concat(
            DISASSEMBLED_BOTTOM_ATOMS[end]
          ); // temp에 해당 종성의 자음들 추가
          /* 종성이 단일 자음으로 이루어진 경우 */
        } else {
          letterComponents.push(DISASSEMBLED_BOTTOM_ATOMS[end]); // temp에 해당 자음 추가
        }
      }
      /* i번째 문자(code)가 완성된 한글이 아니면서 CONSONANTS의 멤버일 경우 (자음일 경우)*/
    } else if (isConsonant(currentCharacterCharCode)) {
      if (isTop(currentCharacterCharCode)) {
        r =
          DISASSEMBLED_TOP_ATOMS[
            ASSEMBLED_TOP_ATOMS_MAP[currentCharacterCharCode]
          ]; // 초성일 경우 해당 초성을 r에 저장
      } else {
        r =
          DISASSEMBLED_BOTTOM_ATOMS[
            ASSEMBLED_BOTTOM_ATOMS_MAP[currentCharacterCharCode]
          ]; // 종성일 경우 해당 종성을 r에 저장
      }
      if (typeof r === "string") {
        letterComponents.push(r); // r이 string 형일 경우 temp에 추가
      } else {
        letterComponents = letterComponents.concat(r); // 아닐 경우 temp에 r 배열의 요소들 추가
      }
      /* i번째 문자(code)가 완성된 한글이 아니면서 COMPLETE_JUNG의 멤버일 경우 (중성일 경우) */
    } else if (isMid(currentCharacterCharCode)) {
      r =
        DISASSEMBLED_MIDDLE_ATOMS[
          ASSEMBLED_MID_ATOMS_MAP[currentCharacterCharCode]
        ]; // r에 해당 중성 저장
      if (typeof r === "string") {
        letterComponents.push(r); // r이 string 형일 경우 temp에 추가
      } else {
        letterComponents = letterComponents.concat(r); // 아닐 경우 temp에 r 배열의 요소들 추가
      }
      /* i번째 문자(code)가 한글이 아닐 경우 */
    } else {
      letterComponents.push(str.charAt(i)); // temp에 i번째 문자를 추가
    }

    result = result.concat(letterComponents); // result에 temp의 요소들 추가
  }

  return result;
};

/* string으로 assemble */
var assemble = function (array) {
  if (typeof array === "string") {
    array = disassemble(array); // 입력값이 string형인 경우 우선 disassemble
  }

  var result = [],
    length = array.length,
    code,
    stage = 0,
    complete_index = -1, //완성된 곳의 인덱스
    previous_code,
    jong_joined = false;
  function _makeHangul(index) {
    // complete_index + 1부터 index까지를 greedy하게 한글로 만든다.
    var code,
      cho,
      jung1,
      jung2,
      jong1 = 0,
      jong2,
      hangul = "";
    jong_joined = false;
    if (complete_index + 1 > index) {
      return;
    }
    for (var step = 1; ; step++) {
      if (step === 1) {
        cho = array[complete_index + step].charCodeAt(0); // 첫 자모를 cho에 저장
        /* cho가 중성인 경우 */
        if (isMid(cho)) {
          // 첫번째 것이 모음이면 1) ㅏ같은 경우이거나 2) ㅙ같은 경우이다
          /* cho의 다음 자모(jung1)가 범위 내에 있으면서 모음인 경우 */
          if (
            complete_index + step + 1 <= index &&
            isMid((jung1 = array[complete_index + step + 1].charCodeAt(0)))
          ) {
            //다음것이 있고 모음이면
            result.push(String.fromCharCode(_isJungJoinable(cho, jung1))); // cho와 jung1이 중성으로 조합가능한 경우 result에 조합한 문자 추가
            complete_index = index; // complete_index에 index값 저장 (index까지 assemble 완료)
            return;
            /* cho의 다음 자모가 없거나 자음인 경우 (cho와 결합할 것이 없을때)*/
          } else {
            result.push(array[complete_index + step]); // result에 cho에 해당하는 자모값 추가
            complete_index = index; // complete_index에 index값 저장 (index까지 assemble 완료)
            return;
          }
          /* cho가 중성이 아니면서 초성도 아닌 경우 */
        } else if (!isTop(cho)) {
          result.push(array[complete_index + step]); // result에 cho에 해당하는 자모값 추가
          complete_index = index; // complete_index에 index값 저장 (index까지 assemble 완료)
          return;
        }
        hangul = array[complete_index + step]; // hangul에 첫 자모값 저장
      } else if (step === 2) {
        jung1 = array[complete_index + step].charCodeAt(0); // jung1에 두번째 자모 저장
        /* jung1이 자음인 경우 */
        if (isTop(jung1)) {
          //두번째 또 자음이 오면 ㄳ 에서 ㅅ같은 경우이다
          cho = _isJongJoinable(cho, jung1); // 앞의 초성(cho)과 jung1이 조합 가능한 경우 cho에 해당 조합을 저장한다
          hangul = String.fromCharCode(cho); // hangul에 cho를 문자열로 반환해 저장한다.
          result.push(hangul); // result에 hangul 추가
          complete_index = index; // complete_index에 index값 저장 (index까지 assemble 완료)
          return;
          /* jung1이 자음이 아닌 경우 */
        } else {
          hangul = String.fromCharCode(
            (ASSEMBLED_TOP_ATOMS_MAP[cho] * 21 +
              ASSEMBLED_MID_ATOMS_MAP[jung1]) *
              28 +
              HANGUL_OFFSET
          ); // cho와 jung1을 한글로 조합해 문자열로 반환 후 hangul에 저장
        }
      } else if (step === 3) {
        jung2 = array[complete_index + step].charCodeAt(0); // jung2에 세번째 자모 저장
        if (_isJungJoinable(jung1, jung2)) {
          jung1 = _isJungJoinable(jung1, jung2); // jung1과 jung2가 종성으로서 조합 가능한 경우 조합 해 jung1에 저장
        } else {
          jong1 = jung2; // jung1과 jung2가 종성으로서 조합 불가능한 경우 jung2값을 jong1에 저장
        }
        hangul = String.fromCharCode(
          (ASSEMBLED_TOP_ATOMS_MAP[cho] * 21 + ASSEMBLED_MID_ATOMS_MAP[jung1]) *
            28 +
            ASSEMBLED_BOTTOM_ATOMS_MAP[jong1] +
            HANGUL_OFFSET
        );
      } else if (step === 4) {
        jong2 = array[complete_index + step].charCodeAt(0); // jong2에 네번째 자모 저장
        if (_isJongJoinable(jong1, jong2)) {
          jong1 = _isJongJoinable(jong1, jong2); // jong1과 jong2가 종성으로서 조합 가능한 경우 조합 후 jong1에 저장
        } else {
          jong1 = jong2; // jong1과 jong2가 종성으로서 조합 불가능한 경우 jong2값을 jong1에 저장
        }
        hangul = String.fromCharCode(
          (ASSEMBLED_TOP_ATOMS_MAP[cho] * 21 + ASSEMBLED_MID_ATOMS_MAP[jung1]) *
            28 +
            ASSEMBLED_BOTTOM_ATOMS_MAP[jong1] +
            HANGUL_OFFSET
        ); // cho, jung1, jong1를 한글로 조합해 문자열로 반환 후 hangul에 저장
      } else if (step === 5) {
        jong2 = array[complete_index + step].charCodeAt(0); // jong2에 다섯번째 자모 저장
        jong1 = _isJongJoinable(jong1, jong2); // jong1과 jong2를 종성으로서 조합해 jong1에 저장
        hangul = String.fromCharCode(
          (ASSEMBLED_TOP_ATOMS_MAP[cho] * 21 + ASSEMBLED_MID_ATOMS_MAP[jung1]) *
            28 +
            ASSEMBLED_BOTTOM_ATOMS_MAP[jong1] +
            HANGUL_OFFSET
        ); // cho, jung1, jong1를 한글로 조합해 문자열로 반환 후 hangul에 저장
      }

      if (complete_index + step >= index) {
        result.push(hangul); // result에 hangul 추가 (조합 결과 추가)
        complete_index = index;
        return;
      }
    }
  }

  /* 모든 문자에 대해 확인 */
  for (let i = 0; i < length; i++) {
    code = array[i].charCodeAt(0);
    if (!isTop(code) && !isMid(code) && !isEnd(code)) {
      //초, 중, 종성 다 아니면
      _makeHangul(i - 1); // i-1번째 문자까지 우선 한글로 조합한 후
      _makeHangul(i); // i번째부터 다시 조합
      stage = 0;
      continue;
    }
    //console.log(stage, array[i]);
    if (stage === 0) {
      // 초성이 올 차례
      if (isTop(code)) {
        // 초성이 오면 아무 문제 없다.
        stage = 1;
      } else if (isMid(code)) {
        // 중성이오면 ㅐ 또는 ㅘ 인것이다. 바로 구분을 못한다. 따라서 특수한 stage인 stage4로 이동
        stage = 4;
      }
    } else if (stage == 1) {
      //중성이 올 차례
      if (isMid(code)) {
        //중성이 오면 문제없음 진행.
        stage = 2;
      } else {
        //아니고 자음이오면 ㄻ같은 경우가 있고 ㄹㅋ같은 경우가 있다.
        if (_isJongJoinable(previous_code, code)) {
          // 합쳐질 수 있다면 ㄻ 같은 경우인데 이 뒤에 모음이 와서 ㄹ마 가 될수도 있고 초성이 올 수도 있다. 따라서 섣불리 완성할 수 없다. 이땐 stage5로 간다.
          stage = 5;
        } else {
          //합쳐질 수 없다면 앞 글자 완성 후 여전히 중성이 올 차례
          _makeHangul(i - 1);
        }
      }
    } else if (stage == 2) {
      //종성이 올 차례
      if (isEnd(code)) {
        //종성이 오면 다음엔 자음 또는 모음이 온다.
        stage = 3;
      } else if (isMid(code)) {
        //그런데 중성이 오면 앞의 모음과 합칠 수 있는지 본다.
        if (_isJungJoinable(previous_code, code)) {
          //합칠 수 있으면 여전히 종성이 올 차례고 그대로 진행
        } else {
          // 합칠 수 없다면 오타가 생긴 경우
          _makeHangul(i - 1);
          stage = 4;
        }
      } else {
        // 받침이 안되는 자음이 오면 ㄸ 같은 이전까지 완성하고 다시시작
        _makeHangul(i - 1);
        stage = 1;
      }
    } else if (stage == 3) {
      // 종성이 하나 온 상태.
      if (isEnd(code)) {
        // 또 종성이면 합칠수 있는지 본다.
        if (!jong_joined && _isJongJoinable(previous_code, code)) {
          //합칠 수 있으면 계속 진행. 왜냐하면 이번에 온 자음이 다음 글자의 초성이 될 수도 있기 때문. 대신 이 기회는 한번만
          jong_joined = true;
        } else {
          //없으면 한글자 완성
          _makeHangul(i - 1);
          stage = 1; // 이 종성이 초성이 되고 중성부터 시작
        }
      } else if (isTop(code)) {
        // 초성이면 한글자 완성.
        _makeHangul(i - 1);
        stage = 1; //이 글자가 초성이되므로 중성부터 시작
      } else if (isMid(code)) {
        // 중성이면 이전 종성은 이 중성과 합쳐지고 앞 글자는 받침이 없다.
        _makeHangul(i - 2);
        stage = 2;
      }
    } else if (stage == 4) {
      // 중성이 하나 온 상태
      if (isMid(code)) {
        //중성이 온 경우
        if (_isJungJoinable(previous_code, code)) {
          //이전 중성과 합쳐질 수 있는 경우
          _makeHangul(i);
          stage = 0;
        } else {
          //중성이 왔지만 못합치는 경우. ㅒㅗ 같은
          _makeHangul(i - 1);
        }
      } else {
        // 아니면 자음이 온 경우.
        _makeHangul(i - 1);
        stage = 1;
      }
    } else if (stage == 5) {
      // 초성이 연속해서 두개 온 상태 ㄺ
      if (isMid(code)) {
        //이번에 중성이면 ㄹ가
        _makeHangul(i - 2);
        stage = 2;
      } else {
        _makeHangul(i - 1);
        stage = 1;
      }
    }
    previous_code = code;
  }
  _makeHangul(i - 1);

  return result.join("");
};
