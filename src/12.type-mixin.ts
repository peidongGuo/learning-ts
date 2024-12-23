// 类型交集  多个类型里的属性都要有，才能算是交集，因为只有这部分才能是所有类型

interface IPerson1 {
  name: string;
}

interface IPerson2 {
  age: number;
}

type IPerson = IPerson1 & IPerson2;

const person: IPerson = {
  name: "gpd",
  age: 34,
};

const person1: IPerson1 = person;
const person2: IPerson2 = person;
const person3: { name: string } = person;

interface IPersonAll {
  name: string;
  age: number;
}

const person4: IPersonAll = {
  name: "gpd",
  age: 34,
};

const peron5: IPerson1 = person4; // 属性可以多，涉及兼容性，类型转换  这个地方要注意，如果是赋对象值，则不会进行类型兼容检查，只有赋的是一个对象引用或变量，会进行类型兼容判断
// const person6: IPersonAll = person2; // 属性不能少，涉及兼容性，类型转换

function mixin<T extends object, K extends object>(obj1: T, obj2: K): T & K {
  return { ...obj1, ...obj2 };
}

let result = mixin({ a: "a", b: "b" }, { c: "C" });
result.a;
result.b;
result.c;
