// 联合类型

// 类型的联合类型
type UnionType1 = number | string;

let a: UnionType1 = 123;
a.toFixed();

a = "123wer";
a.toUpperCase();

type UnionType2 = number | string | undefined;
let b: UnionType2 = false as any as UnionType2;
b!.toString(); // b! 是 TS 语法，主要是说 b 不是 undefined、null 等；
b?.toString(); // b?.xxx 类似于 b && b.xxx
b = undefined;
console.log(a, b, b ?? a); // 123wer undefined 123wer ?? 排除 null undefined ,不是类似于三元运算符 b?b:a; 类似于 （b!==undefined && b!==null)?b:a

// 字面量联合类型
type UnionType3 = "a" | "b" | { c: 1 };
let c: UnionType3 = { c: 1 };

export {};
