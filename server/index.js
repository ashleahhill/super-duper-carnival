const server = require('./server');

const path = require('path');

const port = process.env.PORT || 8081;
const config = require(path.resolve(__dirname, '..', 'heroku.config'));

const app = server(port, config);

console.log('Sever started on: ' + port);

app.listen(app.get('port'), server.callback.call(this, app.get('port')));
