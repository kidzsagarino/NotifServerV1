'use strict';
var port = process.env.PORT || 8080;

const WebSocketServer = require('ws');

const wss = new WebSocketServer.Server({ port: port });

var sockets = [];

wss.on('connection', function connection(ws, req) {

    if (req.url) {

        if (!sockets[parseInt(req.url.substr(1))]) {

            sockets[parseInt(req.url.substr(1))] = ws;

        }

    }



    ws.on('message', function message(data) {

        let msg = JSON.parse(data);

        if (sockets[parseInt(msg.toUserID)] !== undefined) {

            sockets[parseInt(msg.toUserID)].send(JSON.stringify(msg));
        }


    });
});

wss.on('close', function connection(ws, req) {

    if (req.url) {
        delete sockets[parseInt(req.url.substr(1))];
    }



});



