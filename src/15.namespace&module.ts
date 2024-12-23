// 命名空间  namespace  module
// 建议写成 namespace ， 重命(前面关键字可以是 namespace 也可以是 module)合并导出的变量，内部必须要导出变量，外面才能访问到

namespace Home1 {
  export const a = "a";
}
Home1.a;

namespace Home2 {
  export const h2A = "h2A";
}

Home2.h2A;

namespace Home1 {
  export namespace Home11 {
    export const c = "c";
  }
}

Home1.Home11.c;

module Home2 {
  export const h2B = "h2B";
}

Home2.h2B;
export {};
