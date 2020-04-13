const express = require('express')
const app = express()

// Start serv & listen on port 3000.
var server = app.listen(3000);

app.use(express.static('public'));

console.log("Server is running on PORT 3000");900