
const express = require('express')
const { uploadCSVcontroller, getTableDataController, getColumnStatsController, getHistogramController } = require('./controller/CsvController')
const upload = require('./middlewares/multerMiddleware')

const routes = new express.Router()

routes.post('/upload',upload.single("file"),uploadCSVcontroller)

routes.get('/dataset/:id',getTableDataController)

routes.get('/dataset/:id/stats',getColumnStatsController)

routes.get('/dataset/:id/histogram', getHistogramController)



module.exports = routes