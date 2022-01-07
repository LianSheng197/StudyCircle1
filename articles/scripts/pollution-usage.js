const data = require("./pollution-data.json");
const calc = require("./pollution-lib").calc;

console.log("原始資料", data);

// 總收益 2201
calc(data);

// ======== 原型鍊污染 ======== //
Object.prototype.quantity = (() => {
    console.log(" ==== [這是污染後的總收益] ====");
    return 48763;
})();
// ======== 原型鍊污染 ======== //

// 總收益 3171796
calc(data);
