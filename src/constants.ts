import {
  AssembledAtomsListType,
  CharCodeType,
  DisassembledAtomsListType,
} from ".";

/* Disassembled 초성(onset) */
export function convertToCharcodeMap(
  array: AssembledAtomsListType
): Record<CharCodeType, number> {
  const length = array.length;
  let charcodeMap: Record<CharCodeType, number> = {};
  for (let i = 0; i < length; i++) {
    if (array[i]) charcodeMap[array[i].charCodeAt(0)] = i;
  }
  return charcodeMap;
}

export function convertToCharcodeMapComplex(
  array: string[][]
): Record<CharCodeType, Record<CharCodeType, number>> {
  const length = array.length;
  let hash: Record<CharCodeType, Record<CharCodeType, number>> = {};
  for (let i = 0; i < length; i++) {
    const code1: CharCodeType = array[i][0].charCodeAt(0);
    const code2: CharCodeType = array[i][1].charCodeAt(0);

    if (!hash[code1]) {
      hash[code1] = {};
    }

    hash[code1][code2] = array[i][2].charCodeAt(0);
  }
  return hash;
}

export const DISASSEMBLED_TOP_ATOMS: DisassembledAtomsListType = [
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

export const DISASSEMBLED_MIDDLE_ATOMS: DisassembledAtomsListType = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  ["ㅗ", "ㅏ"],
  ["ㅗ", "ㅐ"],
  ["ㅗ", "ㅣ"],
  "ㅛ",
  "ㅜ",
  ["ㅜ", "ㅓ"],
  ["ㅜ", "ㅔ"],
  ["ㅜ", "ㅣ"],
  "ㅠ",
  "ㅡ",
  ["ㅡ", "ㅣ"],
  "ㅣ",
];

export const DISASSEMBLED_BOTTOM_ATOMS: DisassembledAtomsListType = [
  "",
  "ㄱ",
  "ㄲ",
  ["ㄱ", "ㅅ"],
  "ㄴ",
  ["ㄴ", "ㅈ"],
  ["ㄴ", "ㅎ"],
  "ㄷ",
  "ㄹ",
  ["ㄹ", "ㄱ"],
  ["ㄹ", "ㅁ"],
  ["ㄹ", "ㅂ"],
  ["ㄹ", "ㅅ"],
  ["ㄹ", "ㅌ"],
  ["ㄹ", "ㅍ"],
  ["ㄹ", "ㅎ"],
  "ㅁ",
  "ㅂ",
  ["ㅂ", "ㅅ"],
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

/* 유니코드 한글 시작 위치 */
export const HANGUL_OFFSET = 0xac00;

/* 자음 */
export const ASSEMBLED_CONSONANTS: AssembledAtomsListType = [
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄸ",
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
  "ㅃ",
  "ㅄ",
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

export const ASSEMBLED_TOP_ATOMS: AssembledAtomsListType = [
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
export const ASSEMBLED_MID_ATOMS: AssembledAtomsListType = [
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

export const ASSEMBLED_BOTTOM_ATOMS: AssembledAtomsListType = [
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

export const /* 복잡한 자음: [ 자음1, 자음2, 자음1+자음2 ] */
  COMPLEX_CONSONANTS = [
    ["ㄱ", "ㅅ", "ㄳ"],
    ["ㄴ", "ㅈ", "ㄵ"],
    ["ㄴ", "ㅎ", "ㄶ"],
    ["ㄹ", "ㄱ", "ㄺ"],
    ["ㄹ", "ㅁ", "ㄻ"],
    ["ㄹ", "ㅂ", "ㄼ"],
    ["ㄹ", "ㅅ", "ㄽ"],
    ["ㄹ", "ㅌ", "ㄾ"],
    ["ㄹ", "ㅍ", "ㄿ"],
    ["ㄹ", "ㅎ", "ㅀ"],
    ["ㅂ", "ㅅ", "ㅄ"],
  ];
export const /* 복잡한 모음: [모음1, 모음2, 모음1+모음2] */
  COMPLEX_VOWELS = [
    ["ㅗ", "ㅏ", "ㅘ"],
    ["ㅗ", "ㅐ", "ㅙ"],
    ["ㅗ", "ㅣ", "ㅚ"],
    ["ㅜ", "ㅓ", "ㅝ"],
    ["ㅜ", "ㅔ", "ㅞ"],
    ["ㅜ", "ㅣ", "ㅟ"],
    ["ㅡ", "ㅣ", "ㅢ"],
  ];
export const CONSONANTS_MAP = convertToCharcodeMap(ASSEMBLED_CONSONANTS);
export const ASSEMBLED_TOP_ATOMS_MAP =
  convertToCharcodeMap(ASSEMBLED_TOP_ATOMS);
export const ASSEMBLED_MID_ATOMS_MAP =
  convertToCharcodeMap(ASSEMBLED_MID_ATOMS);
export const ASSEMBLED_BOTTOM_ATOMS_MAP = convertToCharcodeMap(
  ASSEMBLED_BOTTOM_ATOMS
);
export const COMPLEX_CONSONANTS_HASH =
  convertToCharcodeMapComplex(COMPLEX_CONSONANTS);
export const COMPLEX_VOWELS_HASH = convertToCharcodeMapComplex(COMPLEX_VOWELS);
