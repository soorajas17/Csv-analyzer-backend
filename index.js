
const express = require('express')
const cors = require('cors')
const routes = require('./router')

const CsvServer = express()

CsvServer.use(cors())


CsvServer.use(express.json())

CsvServer.use(routes)

const PORT = 4000;
CsvServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

