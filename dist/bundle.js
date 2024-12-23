(function () {
	'use strict';

	// TS 模块化
	// 普通 commonjs 模块规范中，只能使用 module.exports={xxx}  const xxx=require("XXX"); 这样是没有类型提示的
	const _ = require("lodash"); // any
	_.sum(1, 2);
	// import jquery from "jquery";

})();
//# sourceMappingURL=bundle.js.map
