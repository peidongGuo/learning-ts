// interface  与  type

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
let arr10: IArray = [1, 2, 3];
let arr11: IArray = { 1: "1", 2: "2" };

// interface 描述函数，同时可以描述函数对象上的其他属性
interface IFn {
  (param1: string, param2: number): void;
  count: number;
}
const fn: IFn = ((param1, param2) => {
  fn.count++;
}) as IFn;

// interface 可以被类实现
interface ISpeakable {
  name: string;
  speak(): void;
}

interface IRunable {
  run(): void;
}

class Person implements ISpeakable, IRunable {
  // name: string = "";
  constructor(public name: string) {}
  run(): void {}
  speak(): void {}
}

// interface 用来描述一个类的构造方法
interface IPerson {
  new (name: string): Person;
}

let clazz: IPerson = Person;
let instance: Person;
function createSingleInstance(clazz: IPerson, name: string): Person {
  if (instance) {
    return instance;
  } else {
    return (instance = new clazz(name));
  }
}
let person2 = createSingleInstance(Person, "gpd");
person2.name;

// let person: IPersonInstance = new Person("gpd");

// type 给一个接口起个别名
type IObjType = IObj;

// type 给一个对象结构类型起个别名
type IObjType2 = {
  name: string;
};

// type 描述一个数组结构
type IArrayType = { [key: number]: any };
let arr12: IArrayType = [1, 2, 3];
let arr13: IArrayType = { 1: "1", 2: "2" };

// type 给一个函数类型起个别名，缺点不能再描述函数对象上其他属性，但 interface 可以做到
type IFnType = (param1: string, param2: number) => void;
// type 可以使用联合类型，但 interface 做不到
type union1 = IObjType | IFnType;
export {};
