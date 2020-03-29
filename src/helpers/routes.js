const routes = require('next-routes');

// name - pattern - page
module.exports = routes()
.add('building', '/(imovel|praia|campo|lancamentos)/:slug', 'imovel')
