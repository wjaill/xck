#!/usr/bin/env node

/**
 * Module dependencies.
 */
//请求到的应用，其实就是requestListener
var app = require('../app');
var debug = require('debug')('web-application:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */
//端口
var port = normalizePort(process.env.PORT || '3000');
//在应用设置
app.set('port', port);

/**
 * Create HTTP server.
 */
//创建服务
var server = http.createServer(app);
var broadcast = require('./broadcast')
let wss = require("socket.io")(server)

broadcast.clientMap = {}

var id = 0

wss.on("connection",(client)=>{
  client.id = ++id
  console.log('有客户端连接了')
  broadcast.clientMap[client.id] = client



  client.on("disconnect",()=>{
    delete broadcast.clientMap[client.id]
  })
})

// broadcast.broad(clientMap,1)





/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port,'127.0.0.1');
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
//处理端口输入
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
