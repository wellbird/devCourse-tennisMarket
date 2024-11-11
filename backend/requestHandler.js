const fs = require('fs');
const mainView = fs.readFileSync('./frontend/main.html', 'UTF-8');
const orderListView = fs.readFileSync('./frontend/orderList.html', 'UTF-8');

const mariadb = require('./database/connect/mariadb');

function main(res) {
  console.log('main');

  mariadb.query('select * from product', (err, rows) => {
    console.log(rows);
  });

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(mainView);
  res.end();
}

function order(res, productId) {
  console.log('order');

  mariadb.query(`insert into orderlist values (${productId}, '${new Date().toLocaleDateString()}');`, (err, rows) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>주문 완료</title>
        <script>
          ${err ? "alert('주문에 실패하였습니다');" : "alert('주문이 완료되었습니다');"}
          window.location.href = "/";
        </script>
      </head>
      <body>
      </body>
      </html>
    `);
    res.end();
  });
}

function orderList(res) {
  console.log('orderList');

  res.writeHead(200, { 'Content-Type': 'text/html' });

  mariadb.query('select * from orderlist', (err, rows) => {
    res.write(orderListView);

    rows.forEach((item) => {
      res.write(`<tr><td>${item.product_id}</td><td>${item.order_date}</td></tr>`);
    });
    res.write('</table>');
    res.end();
  });
}

function redRacket(res) {
  fs.readFile('./frontend/img/redRacket.png', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  });
}

function blueRacket(res) {
  fs.readFile('./frontend/img/blueRacket.png', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  });
}

function blackRacket(res) {
  fs.readFile('./frontend/img/blackRacket.png', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  });
}

function mainStyle(res) {
  fs.readFile('./frontend/main.style.css', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.write(data);
    res.end();
  });
}

function orderListStyle(res) {
  fs.readFile('./frontend/orderList.style.css', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.write(data);
    res.end();
  });
}

let handle = {};

// 페이지들
handle['/'] = main;
handle['/order'] = order;
handle['/orderList'] = orderList;

// 이미지들
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

// 스타일시트들
handle['/main.style.css'] = mainStyle;
handle['/orderList.style.css'] = orderListStyle;

exports.handle = handle;
