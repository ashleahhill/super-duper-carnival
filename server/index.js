const server = require('./server');

const path = require('path');

const port = process.env.PORT || 8081;
const carnival = process.env.CARNIVAL ? process.env.CARNIVAL + '_' : 'example';
const config = require(path.resolve(__dirname, '..', `${carnival}.config.json`));

const app = server(config);

console.log('Sever started on: ' + port);

app.listen(port);
