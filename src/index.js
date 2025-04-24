const hookCustoms = require('./customs');
const hookOpen = require('./open');
const hookRequestWindow = require('./dpip');
const hookDOMInserters = require('./inserters');
const hookWorker = require('./worker');
const hookOpener = require('./opener');

function main(win) {
    hookCustoms(win);
    hookOpen(win);
    hookRequestWindow(win);
    hookDOMInserters(win);
    hookWorker(win);
    hookOpener(win);
}

module.exports = main;