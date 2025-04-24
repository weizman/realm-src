const {stringToLowerCase, stringStartsWith, slice, Function, Object} = require('./natives');
const {error, ERR_OPEN_JS_SCHEME_BLOCKED} = require('./log');
const {proxy, getProxyByWindowProxy} = require('./proxy');

function hook(win, native) {
    return function open() {
        const opener = Function.prototype.apply.call(native, this);
        if (!opener) {
            return null;
        }

        return proxy(opener);
    };
}

function hookOpener(win) {
    const desc = Object.getOwnPropertyDescriptor(win, 'opener');
    const get = desc.get;
    desc.get = hook(win, get);
    Object.defineProperty(win, 'opener', desc);
}

module.exports = hookOpener;