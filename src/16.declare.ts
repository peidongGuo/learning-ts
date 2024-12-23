// TS 模块化
// 普通 commonjs 模块规范中，只能使用 module.exports={xxx}  const xxx=require("XXX"); 这样是没有类型提示的
const _ = require("lodash"); // any
_.sum(1, 2);

// TS 为了支持 commonjs 模块规范，创造了一种模块化 export=xxx , import xxx=require("XXX") 来使用，这样就可以有类型提示
// 前提是 tsconfig.json 中的 module="CommonJS"
// export = "adf";
// import a = require("./16.declare");
// a.toUpperCase();

// TS 支持 ES6 模块化 使用 export default/ export {}，配合使用 import * from XXX； 就好

//-----------------------------------------------------------------
declare const Window: any;
Window.addEventListener();

declare const AMap: any;
AMap.zoom();

declare let a: string;
declare function fn(): void;
declare class Person {
  constructor(name: string);
}

declare interface Person {
  name: string;
}

declare global {
  type PersonType = { name: string };
}

declare enum PersonRole {
  ADMIN,
  COMMON,
}

declare namespace A {
  const a: string;
}

A.a;
import aVue from "a.vue";
import LoDash from "jquery";

import $ from "jquery";
$("adsf").css("dsaf").height("");
$.fn.extend();
$.a;
new Person("adsf");

// 如果不加 declare global ， interface 只能在当前模块生效，加了后，就可以合并全局中所对应的 String 类型
declare global {
  interface String {
    double(a: string): string;
  }
}

String.prototype.double = (str: string) => {
  return str + str;
};

// LoDash 首页的两句话，
// export = _; // TS 语法，将 _ 作为模块导出，本文件是个单独模块
// export as namespace _; // TS 表示可以通过全局变量的形式使用，只能在某个脚本（指不带有模块导入或导出的脚本文件）里使用。例如 <script> 引入这个库的话，就需要这样的声明文件来表示可以直接引用该库，如提问所示，该库定义的全局变量名字为 `MyFavoriteLibrary` 那我们就可以这么使用：（注意是在不带模块引入的文件中才可以这么使用）MyFavoriteLibrary.getPerpetualEnergy()[14]

LoDash.fn;

export {};
