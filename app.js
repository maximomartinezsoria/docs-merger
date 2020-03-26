// Configuration imports
require('dotenv').config()

const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Other imports
const port = process.env.PORT;
const routes = require('./routes');

// Middlewares
app.use(fileUpload({
    createParentPath: true
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

routes(app, express);

// Run app
app.listen(port, () => console.log(`Server running on port: ${port}`));