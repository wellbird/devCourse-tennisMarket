let http = require('http');
let url = require('url');

function start(route, handle) {
  function onRequest(req, res) {
    let path = url.parse(req.url).pathname;
    let queryData = url.parse(req.url, true).query;

    route(path, handle, res, queryData.productId);
  }

  http.createServer(onRequest).listen(8001);
}

exports.start = start;
