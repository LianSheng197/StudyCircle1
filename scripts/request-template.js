// 用於瀏覽器端請求的模板

(()=>{
	console.clear();

	let data = {
		"artist.name": "Haigh"
	};

	fetch("http://localhost:1337/api/submit", {
	  "headers": {
		"content-type": "application/json"
	  },
	  "body": JSON.stringify(data),
	  "method": "POST"
	}).then(
		r => r.text()
	).then(console.log);
})();