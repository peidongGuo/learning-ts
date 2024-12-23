// 枚举类型

// 普通枚举  大写是规范
export enum ROLE {
  USER,
  ADMIN,
  MANAGER,
}
console.log(ROLE);
// 可以反举，但是限于数字索引，因为它是下面这种对象
// (function (ROLE) {
//     ROLE[ROLE["USER"] = 0] = "USER";
//     ROLE[ROLE["ADMIN"] = 1] = "ADMIN";
//     ROLE[ROLE["MANAGER"] = 2] = "MANAGER";
// })(ROLE || (ROLE = {}));

// 异构枚举
export enum ROLE2 {
  USER,
  ADMIN = "admin",
  MANAGER = 2,
}
console.log(ROLE2);
// 可以看以下数据结构，它数字部分可以反举，其它部分不支持
// (function (ROLE2) {
//     ROLE2[ROLE2["USER"] = 0] = "USER";
//     ROLE2["ADMIN"] = "admin";
//     ROLE2[ROLE2["MANAGER"] = 2] = "MANAGER";
// })(ROLE2 || (ROLE2 = {}));

// 常量枚举
export default {};
