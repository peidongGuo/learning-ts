// 泛型
// 指在写程序时不确定，只有在执行程序时，才能推断或指定的类型

// 单个泛型 <T>(count: number, value: T): T[]
function createArray<T>(count: number, value: T) {
  return new Array<T>(count).fill(value);
}

interface IFn {
  <T>(count: number, value: T): T[];
}

type IFnType = <T>(count: number, value: T) => T[];

const createArray2: IFnType = (count, value) => {
  return new Array(count).fill(value);
};

const createArray3: IFn = (count, value) => {
  return new Array(count).fill(value);
};
createArray3(1, "123");

let arr22 = createArray2(5, "123");
arr22.push("123");

// 两个及以上泛型
type ISwapType = <T, K>([value, value2]: [T, K]) => [K, T];
const swap: ISwapType = ([val1, val2]) => {
  return [val2, val1];
};
const result2 = swap([123, "456"]);

// 泛型约束
const sum22 = <T extends string>(a: T, b: T) => {
  return a + b;
};
sum22("123", "123");
// sum22(123, 123); 类型检查报错

type withLen = { length: number };
const computeArrayLength = <T extends withLen, K extends withLen>(
  val1: T,
  val2: K
): number => {
  return val1.length + val2.length;
};
computeArrayLength([1, 2, 3], { name: "gpd", length: 2 });

const getVal = <T extends object, K extends keyof T>(obj: T, key: K) => {
  return obj[key];
};
getVal({ a: "1", b: "2" }, "b");

// 泛型在类上的使用
class ArrayMax<T = number> {
  public arr: Array<T> = [];
  add(val: T) {
    this.arr.push(val);
  }
  getMax(): T {
    let max = this.arr[0];
    for (let i = 1; i < this.arr.length; i++) {
      max = max > this.arr[i] ? max : this.arr[i];
    }
    return max;
  }
}

const arrayMax = new ArrayMax<number>();
arrayMax.add(1);
let max = arrayMax.getMax();

const arrayMax2 = new ArrayMax<string>();
arrayMax2.add("123");
let max2 = arrayMax2.getMax();

// 泛型 可以有默认值   T = number
// 泛型 typeof keyof
interface IArrayMax<T = number> {
  new (): ArrayMax<T>;
}
interface IObj2 {
  fn: ArrayMax<typeof max2>;
  fn2: ArrayMax<keyof { a: "b" }>;
  fn3: ArrayMax<InstanceType<IArrayMax>>;
}
export {};
