// 类型兼容
// 何时发生类型兼容？？ 直接赋值不能触发兼容性，但一旦借助一个中间变量来赋值就可以触发类型检测

// 普通赋值时，不会发生类型兼容检测，只会精准检验是否符合类型
let obj1: { name: string; age: number } = { name: "gpd", age: 2 };
// let obj2: { name: string; age: number } = { name: "gpd", age: 2, run() {} }; // 直接赋值时，多属性也不可以
// let obj3: { name: string; age: number } = { name: "gpd" };  // 赋值时，少属性也不可以

// let str2: number & string = 123; // 普通情况下，是直接判断符不符合，Type 'number' is not assignable to type 'never'
let str1: number | string = "123"; // 这个时候会发生，小类型给大类型

// 兼容检测方式，只要有这个结构，就说明你可以兼容，通俗讲，你会 gaga 叫，就是鸭子！
type Mystr = { toString(): string };
let str3: Mystr = "123";

interface IVegetable {
  color: string;
  taste: string;
}

interface ITomoto {
  color: string;
  taste: string;
  size: string;
}

let veg1: IVegetable = {
  color: "green",
  taste: "good",
};

let tomoto1: ITomoto = {
  color: "red",
  taste: "good",
  size: "big",
};

veg1 = tomoto1; // 这时会触发类型兼容检测，ITomoto 都有 IVegetable 的结构，可以通过
// tomoto1 = veg1; // 这是也会触发类型兼容检测，IVegetable 中少了 ITomoto 中的 size 属性，所以不通过

// 函数整体类型的兼容性检测

let sum1 = (a: string, b: string, c: string) => a + b + c;
let sum2 = (a: string, b: string) => a + b;

// 正常使用
sum1("1", "2", "3");
sum2("1", "2");

// 交换使用
sum1 = sum2;
sum1("1", "2", "3"); // 虽然赋值了 (a,b)=>a+b，但类型没有相应修改还是（a:string,b:string,c:string):string，多传的一个参数 c 在程序中其实是用不到的，所以很安全

// sum2 = sum1; //sum2 值变成了 （a,b,c)=>a+b+c;  但类型还是原来的 （a:string,b:string):string，这样程序会报错，因为 c 这个参数无法传进去;

// 再举个例子，forEach的 callback，定义时，类型为 （item:T,index:number,arr:Array<T>):void
// 使用时，可以（item:T):void，
// 为什么？？ 因为这样安全，你真实 callback 调用时，只使用了比定义时更少的参数
function forEach(
  arr: Array<number>,
  cb: (item: number, index: number, arr: Array<number>) => void
) {
  arr.forEach((item, index, arr) => cb(item, index, arr));
}

forEach([1, 2, 3], (item: number) => {
  return item * 2;
});

// 函数的参数类型及返回值要做兼容性处理，还是以安全为主

function getFn2(
  a: number | string,
  b: string,
  cb: (a: number | string, b: string) => number | string
) {
  cb(a, b);
}

getFn2("123", "456", (a: number | string | boolean, b: string) => {
  return a + b;
});

class Person {
  money!: string;
}

class Child extends Person {
  house!: string;
}

class GrandSon extends Child {
  eat!: string;
}

let person11 = new Person();
let child11 = new Child();
let grandSon11 = new GrandSon();

function getFn(cb: (obj: Child) => Child) {
  cb(child11);
}
getFn((obj: Person) => new GrandSon());
// getFn((obj: GrandSon) => new Person());

export {};
