// 类的装饰器： 类装饰器、属性装饰器、方法装饰器、方法参数装饰器

@say("语言")
@eat("food")
class Person {
  @double()
  static count: number = 1;

  static sayCount() {
    console.log(Person.count);
  }

  @toUpperCase()
  public name: string;

  constructor(name: string, public age: number) {
    this.name = name;
  }

  eat!: (food: string) => void;
  say!: (content: string) => void;

  @Enum(true)
  drink(something: string) {
    console.log(something);
  }

  @Enum(true)
  run(@times(2) miles: number) {
    console.log(`跑了 ${miles} 米！`);
  }
}

let person = new Person("gpd", 34);
console.log(person);
console.log(Person.count, Person.sayCount());

person.eat("Apple");
person.say("Apple is very delisious");
person.drink("Milk");
person.say("Milk is very delisious");
person.run(20);

function say(content: string) {
  console.log(content);
  return function (target: any) {
    target.prototype.say = (content: string) => {
      console.log(`${target?.prototype?.name} say: ${content}!`);
    };
  };
}

function eat(content: string) {
  console.log(content);

  return function (target: any) {
    target.prototype.eat = (content: string) => {
      console.log(`${target?.prototype?.name} eat: ${content}!`);
    };
  };
}

function double() {
  return function (target: any, key: string) {
    let val = target[key];
    Object.defineProperty(target, key, {
      get() {
        return val * 2;
      },
    });
  };
}
function toUpperCase() {
  return function (target: any, key: string) {
    let val = target[key];
    Object.defineProperty(target, key, {
      get() {
        return val.toUpperCase();
      },
      set(newVal: string) {
        val = newVal;
      },
    });
  };
}

function Enum(flag: boolean) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = flag;
  };
}

function times(count: number) {
  return function (target: any, key: any, index: any) {
    console.log(target, key, index);
  };
}
export {};
