## 项目搭建
> 这是一个用来学习 Typescript 的项目。
  主要：
  1. 学习一些 Typescript 的一些语法；
  2. 学习 Typescript 是怎么编译成 Javascript 的；

### 思考
1. TS 文件可以直接使用 tsc 命令进行编译；（前提是安装 Typescript ，本地才有 tsc 的命令）；
2. 在 VS Code IDE 中，可以安装扩展：Code Runner，然后，打开 ts 文件，右键，选择 `Run Code` 来执行； VS Code 自带的运行调试工具，目前对 JS 的支持比较好（用的 Node.js），对 TS 的支持不太好；
3. 如果是要在项目中使用，就需要考虑怎么将 TS 文件编译成 JS 文件。因为，Browser 和 Node 环境都是只识别 JS 源码的。一般项目编译 Typescript 文件的方法有两种：1、使用构建工具相应的 TS 编译插件，自行编译； 2、借用 babel 及其 TS 插件的能力进行编译；
4. 项目的构建、打包、调试，可以使用 Webpack、Rollup、Vite 等等；综合考虑项目是个什么类型的，然后进行技术选型；复杂 Web 类项目，选用 Webpack 比较好，简单的 Web 项目、工具库、UI库等可以使用 Rollup/Vite 进行打包使用；


### 实践
1. rollup 构建打包的工具；
2. typescript 让项目有 tsc 编译的能力，其它插件可以调用这种编译能力；
3. rollup-plugin-typescipt2  调用 tsc 来编译 ts 文件；
4. @rollup/plugin-node-resolve  用来在 ts 文件中可以使用 import/export 语法；
5. rollup-plugin-serve  静态页面服务；


## 学以致用
1. 可以借助此框架快速生成一个静态页面服务器；
2. 知道在加入 TS 语言项目中，加入相应编译功能；
3. Node 环境下要使用 import/export 的方法工具；



