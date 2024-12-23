// 条件类型
// typeE = typeA extends typeB ? typeC : typeD
interface IFish {
  name: string;
  type: "fish";
}

interface IBird {
  name: string;
  type: "bird";
}

interface ISwiming {
  river: string;
}

interface IFly {
  sky: string;
}

type apply="admin"|"bi";
type g= apply extends "admin"?string:number;

type a = IFish & IBird; // never
type b = IFish | IBird; // IFish | IBird
type c = b extends IFish ? ISwiming : IFly; // IFly  ????
type d = a extends IFish ? ISwiming : IFly; // ISwiming
type e = never extends IFish ? ISwiming : IFly; // ISwiming
type f = IFish | IBird extends IFish ? ISwiming : IFly; // IFly ??

type MyEnv<T> = T extends IFish ? ISwiming : IFly; // MyEnv<T> 中 T 如果是联合类型，会进行分发  (IFish extends IFish?ISwiming|IFly) | (IBird extends IFish?ISwiming|IFly);
type IEnv = MyEnv<b>; // ISwiming | IFly

// 场景一：如果一个对象定义了 name 属性，就必须定义 age 属性

let baseSchool = {
  name: "school",
};

interface ISchool1 {
  name: string;
  age: number;
}

interface ISchool2 {
  age: number;
  size: string;
}

type baseSchoolType = typeof baseSchool;
type baseSchoolTypeKeys = keyof baseSchoolType;
type ISchool1Keys = keyof { name: string; age: number };
type School<T> = T extends typeof baseSchool ? ISchool1 : ISchool2;

let school = {
  name: "gpd",
};

type MySchool = School<typeof school>;

let mySchool: MySchool = {
  name: "gpd",
  age: 20,
};

// 内置计算类型 exclude extract nonnullable
type exclude<T, K> = T extends K ? never : T;
type MyExclude = exclude<number | string | boolean, boolean>; // number|string

type extract<T, K> = T extends K ? T : never;
type MyExtract = extract<number | string | boolean, boolean>; // boolean

type MyNonNullable<T> = T extends null | undefined ? never : T;
type nn = MyNonNullable<number | string | boolean | null | undefined>;

// infer 推断
// 获取函数返回值类型
function getResult() {
  return { name: "gpd", age: 20 };
}
type MyReturnType<T extends Function> = T extends (...args: any[]) => infer R
  ? R
  : any;
type MyFnResultType = MyReturnType<typeof getResult>;

// 获取函数参数类型
function getResultByParams(a: string, b: string) {
  return 213;
}
type MyParamsType<T extends Function> = T extends (...args: infer R) => any
  ? R
  : any;

type MyFnParamsType = MyParamsType<typeof getResultByParams>;

// 获取类的构造方法参数类型
class Person {
  constructor(public name: string, public age: number) {}
}

type MyConstructorType<T extends new (...args: any[]) => any> = T extends new (
  ...args: infer CP
) => any
  ? CP
  : any;

type MyClassConstructorParamsType = MyConstructorType<typeof Person>;

let person1 = new Person("gpd", 34);
type person1Type = typeof person1; // Person
type PersonType = typeof Person;
type person1Type2 = InstanceType<typeof Person>; // 这个时候 Person 代表的是一个 class 类 或者一个构造方法，是一个变量，不要理解成类型；
type MyInstanceType<T extends abstract new (...args: any[]) => any> =
  T extends abstract new (...args: any[]) => infer R ? R : any;
type person1Type3 = MyInstanceType<typeof Person>;

interface ICompany {
  name: string;
  age: number;
}
interface IPerson {
  name: string;
  age: number;
  company: ICompany;
}

// partical 将选项变成可选的
type IPersonPartical = Partial<IPerson>;
type MyPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? MyPartial<T[K]> : T[K];
};
type MyPersonTypePartical = MyPartial<IPerson>;

// required 将选项变成必须的
type personRequired = Required<IPersonPartical>;
type MyRequired<T extends object> = {
  [K in keyof T]-?: T[K] extends object ? MyRequired<T[K]> : T[K];
};
type MyPersonRequired = MyRequired<IPersonPartical>;
type MyPersonRequired2 = MyRequired<MyPersonTypePartical>; // TODO 这个有点问题

// readonly 将选项变成 readonly 的 还有反操作
type personReadonly = Readonly<IPerson>;
type MyReadonly<T extends object> = {
  readonly [K in keyof T]: T[K] extends object ? MyReadonly<T[K]> : T[K];
};
type myPersonReadonly = MyReadonly<IPerson>;

type MyUnReadonly<T extends object> = {
  -readonly [K in keyof T]: T[K] extends object ? MyUnReadonly<T[K]> : T[K];
};
type myPersonUnReadonly = MyUnReadonly<myPersonReadonly>;

// Omit 去除不想要的属性
// 举个例子去掉 IPerson 里的 age 属性
// 1. 首先，先知道 IPerson 里有哪些属性，keyof IPerson;
// 2. 其次，要在属性中去除 age 属性 ，exclude<keyof IPerson,"age">
// 3. 最后，找到每个属性原来对应的类型， [K in exclude <keyof IPerson,"age">]:IPerson[K]
// 所以,需要两个参数，一个代表 IPerson 的 T，另一个代表要删除的属性 DK
// type Omit<T,DK extends keyof T>={[K in exclude <keyof T,DK>]:T[K]};
type myPersonOmitType = Omit<IPerson, "age">;
type MyOmit<T, K extends keyof T> = { [C in exclude<keyof T, K>]: T[C] };
type myPersonMyOmitType = MyOmit<IPerson, "age">;

// Record 类型

// 类似于任意接口  [key:string|number|symbol]:V  TODO  还得再思考思考
type MyRecord<K extends keyof any, V> = {
  [P in K]: V;
};

let obj1: Record<string, any> = {
  name: "123",
  age: 123,
};

function map<K extends keyof any, V, X>(obj: Record<K, V>, cb: (item: V) => X) {
  let result = {} as Record<K, X>;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = cb(obj[key]);
    }
  }
  return result;
}

let result2 = map({ name: "gpd", age: 11 }, (item) => {
  return "$" + item;
});
// 还需要再找一种用法 TODO

// 用来做包装器用
type getSetType<T> = {
  get: () => T;
  set: (newValue: T) => void;
};
type Proxify<T> = {
  [K in keyof T]: getSetType<T[K]>;
};
type ProxifyFn = <T extends object>(obj: T) => Proxify<T>;
const proxify: ProxifyFn = <T>(obj: T) => {
  let result = {} as Proxify<T>;
  for (const key in obj) {
    let value = obj[key];
    result[key] = {
      get() {
        return value;
      },
      set(newValue) {
        value = newValue;
      },
    };
  }
  return result;
};

let obj = {
  name: "gpd",
  age: 110,
};

let proxyObj = proxify(obj);
proxyObj.age.get();
proxyObj.name.set("asdf");
proxyObj.name.get();
proxyObj.name.set("gpd2");

type UnProxify = <T extends object>(obj: Proxify<T>) => T;
const unProxify: UnProxify = <T>(obj: Proxify<T>) => {
  let unProxifyObj = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      unProxifyObj[key] = obj[key].get();
    }
  }
  return unProxifyObj;
};
let unProxifyObj = unProxify(proxyObj);

unProxifyObj.name;

// Diff  Inter  Merge  Compute
let person11 = {
  name: "gpd",
  age: 34,
};

let person21 = {
  name: "gpd2",
  age: "sadf",
  address: "dfljqweof",
  email: "asdff",
};

type Person1 = typeof person11;
type Person2 = typeof person21;

type Diff<T, K> = Omit<T, keyof K>;
type myDiff = Diff<Person1, Person2>;

type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type myPick = Pick<Person1, "name">;
type Inter<T, K> = Pick<T, Extract<keyof T, keyof K>>;
type myInter = Inter<Person1, Person2>;

type Merge<T, K> = Diff<T, K> & Diff<K, T> & Inter<K, T>;
type Merge2<T, K> = Omit<T, keyof K> & K;
type myMerge = Compute<Merge<Person1, Person2>>;
type myMerge2 = Compute<Merge2<Person1, Person2>>;

type Compute<T> = { [K in keyof T]: T[K] };

export declare const arr1: ["a", "b", "c"];
type arr2 = typeof arr1; //["a","b","c"]
let arrValue: arr2 = ["a", "b", "c"]; // 只能是这个数组值，不能再赋给其他值
type arr3 = arr2[number]; // "a" | "b"|"c"
let arrValue2: arr3 = "a"; // 只能是一个字符串，而且是 "a" "b" "c" 中的一个；

export {};
