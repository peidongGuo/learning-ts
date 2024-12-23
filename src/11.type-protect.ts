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

export {};
