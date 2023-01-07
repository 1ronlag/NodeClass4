const app = require ('./server')
app.use('/', require ('./src/routes/postRoutes.js'))

module.exports = app
