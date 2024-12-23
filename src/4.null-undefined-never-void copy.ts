// let num1: number = undefined; // 非严格模式下，undefined/null 是任何类型的子类型；
// let null1: null = undefined; //  非严格模式下，可以； strict mode null 只能给 null 类型
// let undefined1: undefined = null; //  非严格模式下，可以； strict mode  undefined 只能给 undefined 类型。

let a: void = undefined; // 严格模式下也是可以的；
let aa: undefined = void 0; // 返回值是 undefined
// let b : void = null; // 非严格模式下，可以；  strict mode: Type 'null' is not assignable to type 'void'。

const fn1: () => void = () => {};

// never 总是抛出异常或根本不会有返回值的函数表达式或箭头函数表达式的返回值类型
function error(msg: string): never {
  throw new Error(msg);
}
let errorResult = error("asdf"); // never

function fail(): never {
  // 函数返回值需要手动标识，推断不出来
  return error("Something failed!");
}

function setVal(val: string) {
  if (typeof val === "string") {
  } else {
    val; //never
  }
}

function infiniteLoop(): never {
  // 函数返回值需要手动标识，推断不出来是 never，推断成 void;
  while (true) {}
}

// never 类型，只有 never 本身可以赋值给他，any 也不行

let num2: number = 123 as never; // never 可以是任何类型的子类型

// unknown  是 any 的安全类型
// 如果是需要在程序中调用类型对应值的属性，用 any，如果不想被调用属性，用 unknown
let t: unknown = 123; // unknow 类型没有任何属性，为了安全
// t.  后面不会有提示
type uu = boolean | unknown; // unknown 与任何类型并集还是 unknown
type ui = boolean & unknown; // unknown 与任何类型交集是所交类型

type toa = keyof any; // number|string|symbol
type tou = keyof unknown; // never

export {};
