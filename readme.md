# 這是一道「非常簡單」的題目 

讀書會報告 #1。

<!-- TOC depthfrom:2 orderedlist:false -->

- [緣起](#%E7%B7%A3%E8%B5%B7)
- [正文](#%E6%AD%A3%E6%96%87)
    - [釐清狀況](#%E9%87%90%E6%B8%85%E7%8B%80%E6%B3%81)
    - [部署本機測試環境](#%E9%83%A8%E7%BD%B2%E6%9C%AC%E6%A9%9F%E6%B8%AC%E8%A9%A6%E7%92%B0%E5%A2%83)
        - [方法一（HTB 原本設計的方法）](#%E6%96%B9%E6%B3%95%E4%B8%80htb-%E5%8E%9F%E6%9C%AC%E8%A8%AD%E8%A8%88%E7%9A%84%E6%96%B9%E6%B3%95)
        - [方法二（方便 debug 的方法）](#%E6%96%B9%E6%B3%95%E4%BA%8C%E6%96%B9%E4%BE%BF-debug-%E7%9A%84%E6%96%B9%E6%B3%95)
    - [找出破口](#%E6%89%BE%E5%87%BA%E7%A0%B4%E5%8F%A3)
    - [原型鍊污染](#%E5%8E%9F%E5%9E%8B%E9%8D%8A%E6%B1%A1%E6%9F%93)
    - [漏洞的概念驗證](#%E6%BC%8F%E6%B4%9E%E7%9A%84%E6%A6%82%E5%BF%B5%E9%A9%97%E8%AD%89)
- [雜談](#%E9%9B%9C%E8%AB%87)

<!-- /TOC -->

## 緣起
因緣際會發現了一個網站，叫 [Hack The Box](https://app.hackthebox.com/home)。  
由於小時候就對資安攻防戰感到相當好奇，但一直不知道如何開始，也一直對其感到畏懼，這回看到這個網站時倍感驚豔，因此決定嘗試入門。  

在做完幾個基本的教學關卡後，我決定嘗試一道挑戰題。  
當時我想找個簡單的題目驗證看看自己到底在什麼水準，於是找了一題難度標示爲 `VERY EASY` 的題目，叫做 `Gunship`，並且在開始之前就決定這題目只能靠自己去解決，殊不知這一解就過了一個多月，過程可謂是痛不欲生，於是有了這篇文章。

## 正文
### 釐清狀況
剛開始我就愣住了，因爲下載必要文件時得到了一個壓縮檔，裡面看起來像是這個網站的原始碼...  
大概是因爲這是我的第一個挑戰，所以很多題目的「基本設定」都還沒有概念，所以才有這個疑慮。  
（原始碼放在 [gunship](./gunship/) 裡面）
![](images/1.png)

總之目標就是**從原始碼中嘗試找出可以利用的漏洞，然後取得 flag 即可**。

### 部署本機測試環境
#### 方法一（HTB 原本設計的方法）
這個並不難，只要在 Linux 環境並有安裝 docker 的情形下，在 [gunship](./gunship/) 裡面執行 `build-docker.sh` 即可。  
執行後即可在 `http://localhost:1337/` 看到網頁。

#### 方法二（方便 debug 的方法）
不想用 docker 也沒關係，在 [gunship/challenge](./gunship/challenge/) 底下直接 `npm i; npm run start` 也可以，不過別忘了 Node.js 的環境。  
執行後即可在 `http://localhost:1337/` 看到網頁。

![](images/2.png)

### 找出破口
既然是網頁的話，那估計是從請求下手吧？  
是的，確實是從請求下手。但是沒有我最初想象的那麼單純...

由於處理請求的關鍵檔 [routes/index.js](gunship/challenge/routes/index.js) 實在是出乎意料的單純，因此在這邊又卡了一陣子（詳情略），最後終於從 [package.json](gunship/challenge/package.json) 中找到關鍵：
```json 
"dependencies": {
    "express": "^4.17.1",
    "flat": "5.0.0",
    "pug": "^3.0.0"
}
```

是的，關鍵就是那個寫死版本的 `flat`。  
這玩意我沒看過，不過要找漏洞的話也不難，去問 Google 大神 `npm flat CVE`，然後前幾個就是我要的了。

![](images/3.png)

### 原型鍊污染
看了一下上述漏洞，可以知道這題的解法是透過原型鍊污染 (Prototype Pollution) 達成的。關於這個手法，這裡簡單介紹一下：  

先看底下的原始碼，這些範例都放在 [scripts](scripts/) 底下了。

[pollution1.js](scripts/pollution1.js)
```js
// 從類別污染
String.prototype.includes = function(){
    return "已污染";
}

// 已污染
console.log("ABC".includes("A"));
```

[pollution2.js](scripts/pollution2.js)
```js
// 從物件污染
"".__proto__.includes = function(){
    return "已污染";
}

// 已污染
console.log("ABC".includes("A"));
```

上述污染的手法其實是同樣的概念，因爲 `<class>.prototype` 與 `<instance>.__proto__` 是完全等價的。對於 `prototype` 與 `__proto__`，這裡就不展開介紹了，有疑惑的話請自行搜尋。

[pollution-note.js](scripts/pollution-note.js)
```js
// true
console.log(String.prototype === "".__proto__);
```

### 漏洞的概念驗證








****
## 雜談
由於探索過程幾乎是遇到一個不懂的就嘗試追溯下去，爲了解決前一個問題於是展開它的技術細節，於是衍生出另一個問題，然後又重複這個流程，結果導致整個探索過程看起來像是這樣：
```
    Start -> Q1 -> Q2 -> Q3 -> ... -> Qn -> Solve
```
因此這篇文章差點被命名爲「深度優先搜尋的弊端」  
<center style="color: red; font-family: Consolas,monospace">Uncaught RangeError: Maximum call stack size exceeded
</center>  



不過幸好後來心態調整，決定不要細究，而是選擇性忽略一些太過細節性的東西，這才解決問題。

