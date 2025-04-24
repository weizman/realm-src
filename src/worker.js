const {Map, toString, stringStartsWith, Blob} = require('./natives');

function hook(win) {
    const native = win.Worker;
    win.Worker = function Worker(aURL, options) {
        const url = typeof aURL === 'string' ? aURL : toString(aURL);
        if (stringStartsWith(url, 'blob')) {
            throw 'worker to blob forbidden';
        }
        if (stringStartsWith(url, 'javascript')) {
            throw 'worker to javascript forbidden';
        }
        return new native(url, options);
    };
}

function hookWorker(win) {
    hook(win);
}

module.exports = hookWorker;