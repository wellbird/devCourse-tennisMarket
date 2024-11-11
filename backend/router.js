function route(path, handle, res, productId) {
  console.log(`pathName : ${path}`);

  if (typeof handle[path] === 'function') {
    handle[path](res, productId);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('Not Found');
    res.end();
  }
}

exports.route = route;
