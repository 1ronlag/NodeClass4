const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.static("public"));

app.use(express.json())

app.listen(3000, console.log("SERVIDOR ENCENDIDO"))

module.exports = app;
