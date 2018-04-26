/**
 * 测试一些 ES6 特性是否成功被 babel 转译
 */

// 箭头函数
let log = (param) => {
    console.log(param);
};

// 解构
let a = 1;
let b = 2;
[a, b] = [b, a];

console.group('babel test');
log('something');
console.log(a);
console.log(b);
console.groupEnd();
