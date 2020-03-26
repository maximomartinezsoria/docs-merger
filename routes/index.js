const frontendRoutes = require('./frontendRoutes');
const apiRoutes = require('./apiRoutes');

const routes = (app, express) => {
    apiRoutes(app);
    frontendRoutes(app, express);
}

module.exports = routes;