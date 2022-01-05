// 原型鍊污染 範例 #2

// 從物件污染
"".__proto__.includes = function(){
    return "已污染";
}

// 已污染
console.log("ABC".includes("A"));