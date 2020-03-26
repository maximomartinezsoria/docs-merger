const path = require('path');

const frontendRoutes = (app, express) => {
    app.use(express.static(path.join(__dirname, '../public')));
}

module.exports = frontendRoutes;
