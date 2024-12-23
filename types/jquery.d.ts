declare function $(selector: string): {
  css(val: string): ReturnType<typeof $>;
  height(val: string): ReturnType<typeof $>;
};

declare namespace $ {
  namespace fn {
    function extend(): void;
  }
}

declare namespace $ {
  const a: 1;
}

export default $;

declare namespace _ {
  const add: () => void;
}
// export = _;
export {};
export as namespace LoDash; // export as namespace for UMD module output #26532 在script 标签脚本程序中也可以使用。
