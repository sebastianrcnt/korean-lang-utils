import typewrite from "./anatomy/typewrite";

declare global {
  var typewrite: any;
}

globalThis.typewrite = typewrite;
window.typewrite = typewrite;
