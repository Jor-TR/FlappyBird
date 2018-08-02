// const mysql = require("mysql");
const express = require("express");
const app = express();

// Static resources that are allowed to be obtained directly
app.use(express.static(__dirname + "/flappy-bird"));
const server = app.listen(3000, () => {
	console.log(
		`\nWeb Music Server is listening at http:\/\/${server.address().address}:\
${server.address().port}`
	);
});
