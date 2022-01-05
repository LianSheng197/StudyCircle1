// 原型鍊污染 範例 #1

// 從類別污染
String.prototype.includes = function(){
    return "已污染";
}

// 已污染
console.log("ABC".includes("A"));