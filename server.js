'use strict';

var staticServer = require('node-static');
const FS = require('fs');
const PATH = require('path');

function directoryTree (path, extensions) {
    const name = PATH.basename(path);
    const item = { name };
    let stats;

    try { stats = FS.statSync(path); }
    catch (e) { return null; }

    if (stats.isFile()) {
        item.size = stats.size;
        item.birthTime = stats.birthtime;
    }
    else {
        item.children = FS.readdirSync(path)
                .map(child => directoryTree(PATH.join(path, child)));
    }
    return item;
}

var file = new staticServer.Server('./public');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        if(request.url == '/tree'){
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(JSON.stringify(directoryTree('./public/Home')));
        } else file.serve(request, response);
    }).resume();
}).listen(process.env.PORT || 5000);
console.log('Listening at http://localhost:5000');
