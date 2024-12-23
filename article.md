## TypeScript 学习笔记

### 基础概念
1. 基础类型：number、string、boolean、symbol、bigint;
2. null、undefined、void、unknown、any、never;
3. 结构类型：enum、array、tuple、object、function、class;
4. interface、type；
5. 交叉类型（ typeA & typeB ）、联合类型( typeA | typeB)；
6. 类型约束：extends、keyof、typeof；
7. 类型保护、类型兼容：类似于面向对象的多态概念；前提就是安全，程序在使用变量时，是安全的；何时发生类型兼容？？ 直接赋值不能触发兼容性，但一旦借助一个中间变量来赋值就可以触发类型检测，然后判断是否类型兼容；
8. 泛型：在运行时才知道的类型，并能根据它做出很多推断；
9. 内置类型：大部分都是类似于一个 类型函数，传参是泛型，真实参数是类型，返回的是类型；
10. 模块、命名空间，会进行合并里面的各种类型；
11. declare 的使用；它可以声明变量、函数、类，也可以声明类型、模块、命名空间；global 是将声明的内容放到全局；

### 不熟悉的概念
1. number 与 Number 这种基本类型与包装类类型的区别，其它基本类型与包装类类型也如此；

``` TypeScript
let num1:number=1;
let num2:Number=1;
let num3:number=Number(1);
let num4:Number=Number(1);
let num5:number=new Number(1); // 就这个会报错：Error: Type 'Number' is not assignable to type 'number'. 'number' is a primitive, but 'Number' is a wrapper object. Prefer using 'number' when possible.
let num6:Number=new Number(1);

```

2. symbol 与 bigint 基本类型；

``` TypeScript
let symbol1:symbol=Symbol('gpd');
let bigInt1:bigint=Bigint(1231231312313131312);
```

3. tuple 类型；

``` TypeScript
// 特殊类型-元组 tuple
const tuple1: [number, string, boolean] = [1, "2", true]; // 必须按顺序来赋值
// tuple1[3] tuple.3  tuple1[3]=100 会报错，没有这个索引值
let r = tuple1.pop(); // number | string | boolean | undefined
tuple1.push(1); // push 的只能是初始定义的几种类型
```

4. null、undefined、void、unknown、any、never 之间的关系

``` TypeScript
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

```

5. 函数重载
``` TypeScript
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
```

6. 类中 super 的使用方法：子类中的构造方法，可以直接调用 super(args) 来生成一个实例；子类中的静态方法中，可以调用 super.staticMethodXXX(args)；子类中的普通方法可以调用 super.unStaticMethodYYY(args)；
```TypeScript
// 静态属性、方法可以被继承，其中静态方法可以被子类的静态方法重载，并可以 super.staticMethod；
// 子类中的方法可以使用 super 进行调用父类进行使用，一般指向父类的原型方法，但不包含静态方法。
class AnimalDemo4 {
  static count = 0;
  static addCount() {
    AnimalDemo4.count++;
  }

  constructor(public name: string) {
    AnimalDemo4.addCount();
  }
  sayName() {
    console.log(this.name);
  }
}
class DogDemo4 extends AnimalDemo4 {
  constructor(name: string, public age: number) {
    super(name);
  }

  static addCount(): void {
    super.addCount();
  }
  say(): void {
    super.sayName();
    console.log(this.age);
  }
}

const animal4 = new AnimalDemo4("cat");
animal4.name;
AnimalDemo4.count;

const dog4 = new DogDemo4("dog4", 2);
DogDemo4.count;
DogDemo4.addCount;
```

7. 类的类型与类的实例的类型要区分清楚；
``` TypeScript
// 将 Person 这个类当作参数传递时，一般做法就是  new (...args:[])=> Person 或 {new (...args:[]):Person}
// 为什么不把 typeof Person 传进去呢？
//  1、因为在传参时，只能传值，不能传类型；2、typeof 后面必须跟的是值而不是一个类型；
// 下面的例子就可以好好理解， typeof AnimalDemo1 可以写在执行函数里，但不能传递给函数参数
function createInstance(clazz: typeof AnimalDemo1) {
  let animal = new clazz("dog");
  animal.name;
  return animal;
}

function createInstance2<T>(clazz: new (name: string) => T): T {
  return new clazz("dog");
}

let r = createInstance2<AnimalDemo1>(AnimalDemo1);
r.name;

// Person 做类型时，代表这个类的实例类型
// typeof Person 表达式代表 Person 这个类的类型，
// 区别就是 typeof Person 这个类型一般含有  prototype 属性，而 Person 类型没有;
let person31!: AnimalDemo1;
let person32!: typeof AnimalDemo1;
person31 = person32;
// person32 = person31; // Property 'prototype' is missing in type 'AnimalDemo1' but required in type 'typeof AnimalDemo1'
```

7. interface 可以描述 object、array、class、function;

```TypeScript
// interface 描述对象
interface IObj {
  name: string;
  age: number;
  isMan: boolean;
  hasMoney?: boolean;
  children: IObj[];
  [key: string]: any;
}

//  interface 描述一个类数组结构
interface IArray {
  [key: number]: any;
}

// interface 用来描述一个类的构造方法
interface IPerson {
  new (name: string): Person;
}

// interface 描述函数，同时可以描述函数对象上的其他属性
interface IFn {
  (param1: string, param2: number): void;
  count: number;
}
```

8. type 描述 object、array、class、function;

```TypeScript
type objType={name:string};
type arrayType = { [key: number]: any };
type classType=new (name:string) => void;
type fnType=(param1:string,param2:string) => void;
```

9. 类型保护

``` TypeScript
// 类型保护 主要靠 js 语法特性

// typeof
function fn1(val: number | string) {
  if (typeof val === "number") {
    val; // number
  } else {
    val; //string
  }
}

// instanceof

class Person {
  say() {}
}
class Dog {
  wang() {}
}
const createInstance = (clazz: new () => Person | Dog) => {
  return new clazz();
};

let obj1 = createInstance(Person); // Person | Dog
if (obj1 instanceof Person) {
  obj1.say();
} else {
  obj1.wang();
}

// in 语法
interface IFish {
  swiming: string;
}

interface IBird {
  fly: string;
}

function getAnimalType(animal: IFish | IBird) {
  if ("swiming" in animal) {
    animal.swiming;
  } else {
    animal.fly;
  }
}

// 增加字面量来判断，语法中的可识别类型
interface IButton1 {
  color: "red";
  class: string;
}

interface IButton2 {
  color: "blue";
  class: boolean;
}

function getButton(button: IButton1 | IButton2) {
  if (button.color === "blue") {
    button.class; // boolean
  } else {
    button.class; // boolean
  }
}

// TS 语法中的 is ，要求 is 后面的类型是正确的类型范围，返回值是 true
function isString(val: any): val is string {
  return Object.prototype.toString.call(val) === "[object String]";
}
function isNumber(val: any): val is number {
  return Object.prototype.toString.call(val) === "[object Number]";
}
function isWrongNumber(val: any): val is number {
  return Object.prototype.toString.call(val) === "[object String]";
}
function isWrongNumber2(val: any): val is number {
  return true;
}

let str = 1;

if (isString(str)) {
  str; // never
}

if (isNumber(str)) {
  str.toFixed;
}

let str3 = "123";
if (isWrongNumber(str3)) {
  str3; // nerver
}

if (isWrongNumber2(str3)) {
  str3; // never
}

let str2 = "123";
if (isString(str2)) {
  str2.toUpperCase;
}

// 接合 JS 中的 in 用法
function isFish(animal: IFish | IBird): animal is IFish {
  return "swiming" in animal;
}

function getAnimal2(animal: IFish | IBird) {
  if (isFish(animal)) {
    animal.swiming;
  } else {
    animal.fly;
  }
}

// null 保护
function getNum(val: number | null) {
  val = val || 0;
  val.toFixed; // val is number

  function inner() {
    // val.toFixed; // val is possibly null
    val?.toFixed;
    val!.toFixed;
  }
}

// 代码完整性保护
interface ISquare {
  kind: "square";
  width: number;
}

interface IRent {
  kind: "rent";
  width: number;
  height: number;
}

interface ICircle {
  kind: "circle";
  radius: number;
}

const assert = (obj: never) => {
  throw new Error("err");
};
function getArea(shapeObj: ISquare | IRent | ICircle) {
  switch (shapeObj.kind) {
    case "square":
      return shapeObj.width * shapeObj.width;
    case "rent":
      return shapeObj.height * shapeObj.width;
    case "circle":
      return shapeObj.radius * shapeObj.radius * Math.PI;
    default: // 如果 case 少了判断，则会报编译错误
      assert(shapeObj);
      break;
  }
}

getArea({ kind: "circle", radius: 2 });

```

10. 类型兼容的触发机制
``` TypeScript
// 普通赋值时，不会发生类型兼容检测，只会精准检验是否符合类型
let obj1: { name: string; age: number } = { name: "gpd", age: 2 };
// let obj2: { name: string; age: number } = { name: "gpd", age: 2, run() {} }; // 直接赋值时，多属性也不可以
// let obj3: { name: string; age: number } = { name: "gpd" };  // 赋值时，少属性也不可以

// let str2: number & string = 123; // 普通情况下，是直接判断符不符合，Type 'number' is not assignable to type 'never'
let str1: number | string = "123"; // 这个时候会发生，小类型给大类型

// 兼容检测方式，只要有这个结构，就说明你可以兼容，通俗讲，你会 gaga 叫，就是鸭子！
type Mystr = { toString(): string };
let str3: Mystr = "123";
```

11. ts 中的模块化运用
TS 为了支持 commonjs 模块规范，创造了一种模块化 export=xxx , import xxx=require("XXX") 来使用，这样就可以有类型提示
前提是 tsconfig.json 中的 module="CommonJS"
export = "adf";
import a = require("./16.declare");
a.toUpperCase();
TS 支持 ES6 模块化 使用 export default/ export {}，配合使用 import * from XXX； 就好

12. declare 用法
``` TypeScript
declare module "*.vue" {
  const component: object;
  export default component;
}
// declare module "jquery" {
// const a: string;
// }

declare module "*.jpg" {}
```


### 补记实践用法
1. 模仿 jquery 的类型模块写法
```TypeScript
declare function $(selector: string): {
  css(val: string): ReturnType<typeof $>;
  height(val: string): ReturnType<typeof $>;
};

declare namespace $ {
  namespace fn {
    function extend(): void;
  }
}

declare namespace $ {
  const a: 1;
}

export default $;

declare namespace _ {
  const add: () => void;
}
// export = _;
export {};
export as namespace LoDash; // export as namespace for UMD module output #26532 在script 标签脚本程序中也可以使用。

```

### 参考链接