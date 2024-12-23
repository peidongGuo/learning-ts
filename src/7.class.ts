// 类
// 实例属性 实例方法 构造方法  静态属性 静态方法 抽象方法 继承
// this.xxx this.yyy() constructor(){}  static sss static sssMethod(){} abstract method(){}  extend
// public protected  private readonly 访问限制
// getter setter 存取器

class AnimalDemo1 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class AnimalDemo2 {
  protected name: string; // protected private
  constructor(name: string) {
    this.name = name;
  }
}

class DogDemo2 extends AnimalDemo2 {
  private _age: number;
  constructor(name: string, _age: number) {
    super(name);
    this._age = _age;
  }
  sayName() {
    console.log(this.name);
  }
  get age() {
    return this._age;
  }
  set age(value) {
    this._age = value;
  }
}

const dog2 = new DogDemo2("jinmao", 1);
// console.log(dog2.name, dog2._age); // 一个 protected 报错，一个是 private 报错
dog2.sayName();
console.log(dog2.age);
dog2.age = 2;
vvbihn;

class AnimalDemo3 {
  constructor(readonly name: string) {
    this.name = name;
  }
  //   set name(value) { // 会报错，readonly 后的属性，不能再设置 set方法以
  //     this.name = value;
  //   }
}
const animal3 = new AnimalDemo3("dog");
console.log(animal3.name);
// animal3.name = "123"; 会报错，因为它只读

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

export {};
