// 基础类型：number、string、boolean
// Examples
let number1: number = 1;
let str1: string = "1";
let boolean1: boolean = false;

// 另：大写的 Number、String、Boolean 是包装器类，相当于一个类。
// Examples: number 举例
let num1: Number = 1;
let num2: number = 1;
let num3: Number = Number(1);
let num4: number = Number(1); // (value?: any) => number 返回的是一个基本类型
let num5: Number = new Number(1); // new (value?: any) => Number  返回的是一个类的类型
// let num6: number = new Number(1); // Error: Type 'Number' is not assignable to type 'number'. 'number' is a primitive, but 'Number' is a wrapper object. Prefer using 'number' when possible.

// symbol
let symbol1: symbol = Symbol("gpd");
// let symbol2: Symbol = new Symbol("gpd"); 没有这种情况  Symbol: SymbolConstructor (description?: string | number | undefined) => symbol

// bigint
let bigint1 = BigInt(1123);
// let bigint2 = new BigInt(123); 没有这种情况 var BigInt: BigIntConstructor (value: string | number | bigint | boolean) => bigint

export {};
