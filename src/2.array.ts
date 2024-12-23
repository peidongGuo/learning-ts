// 数组类型

// 普通类型
const arr1: number[] = [1, 2];
const arr2: Array<string> = ["1", "2"];
const arr3: Array<string | boolean> = ["1", false, "2"];

// 特殊类型-元组 tuple
const tuple1: [number, string, boolean] = [1, "2", true]; // 必须按顺序来赋值
// tuple1[3] tuple.3  tuple1[3]=100 会报错，没有这个索引值
let r = tuple1.pop(); // number | string | boolean | undefined
tuple1.push(1); // push 的只能是初始定义的几种类型

export {};
