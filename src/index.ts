let a: string = "123";

a.double(a); // 因为在 16.declare.ts 中声明的是 global ，所以能拿到；

let person222: PersonType = { name: "gpd" }; // 因为在 16.declare.ts 中声明的是 global ，所以能拿到；

// let role:PersonRole   拿不到 PersonRole 这个类型， 因为在 16.declare.ts 中声明的不是 global ，只是在它自己模块中使用，所以能拿不到；
