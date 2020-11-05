
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
    // res.setHeader("Content-Type", "application/json;charset=utf-8"); //
    next();
});
//routes sdfd

app.use(require('./routes'));



//run
app.listen(app.get('port'), () => {
    console.log('Server on Port 3000')
})