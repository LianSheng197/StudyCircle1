/**
 * @typedef Good
 * @type {Object}
 * @property {string} type
 * @property {string} name
 * @property {number?} quantity
 * @property {number} price
 */

/**
 * 計算賣出所有商品可以獲得多少錢
 *  
 * @param {Array<Good>} data
 */
function calc(data) {
    let amount = 0;
    data.forEach(good => {
        // 若還有庫存才計算
        if (good.quantity) {
            amount += good.quantity * good.price;
        }
    });

    console.log("總收益", amount);
}

module.exports.calc = calc;