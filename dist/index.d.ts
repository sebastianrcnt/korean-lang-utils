declare const typewrite: (sentence: string) => string[];
export { typewrite };
declare global {
    var typewrite: any;
}
