// 函数类型检测：参数的类型、返回值类型、函数重载

function sum(a: number, b: number): number {
  return a + b;
}

type FnType = (a: number, b: number) => number;
const sum2: FnType = (a, b) => {
  return a + b;
};

const sum3: (a: number, b?: number, ...args: Array<number>) => number = (
  a,
  b,
  ...args
) => {
  return args.reduce((result, item) => {
    return result + item;
  }, a + b!);
};

console.log(sum3(1, 2, 3, 4, 5, 6));
console.log(sum3(1, undefined, 3, 4, 5, 6));

// 函数重载
function toArray<T>(value: T): Array<T>;
// function toArray(value: number): Array<number>;
// function toArray(value: string): Array<string>;
function toArray(value: number | string) {
  if (typeof value === "number") {
    return value.toString().split("").map(Number);
  } else {
    return value.split("");
  }
}
let arr1 = toArray(123);
let arr2 = toArray("123");
// let arr3 = toArray(false);

// 以下想法有报错，暂不知道如何解决，TODO
// 2022.9.6 的解法如下，需要使用 as 进行类型强转
function toArray2<T>(value: T): Array<T> {
  if (typeof value === "number") {
    return value.toString().split("").map(Number) as Array<T>;
  } else {
    return (value as string).split("") as Array<T>;
  }
}

export {};
