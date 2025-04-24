const {Object, Proxy, Reflect, Map} = require('./natives');
const {error, ERR_OPENED_PROP_ACCESS_BLOCKED} = require('./log');

const openeds = new Map();

function getProxyByWindowProxy(wp) {
    return openeds.get(wp);
}

function proxy(wp) {
    const target = Object.create(null);

    Object.defineProperty(target, 'closed', {
        get: function () {
            return wp.closed;
        }
    });
    Object.defineProperty(target, 'close', {
        value: function () {
            return wp.close();
        }
    });
    Object.defineProperty(target, 'focus', {
        value: function () {
            return wp.focus();
        }
    });
    Object.defineProperty(target, 'postMessage', {
        value: function (message, targetOrigin, transfer) {
            return wp.postMessage(message, targetOrigin, transfer);
        }
    });

    if (!openeds.has(wp)) {
        const p = new Proxy(target, {
            get: function (target, property) {
                let ret = Reflect.get(target, property);
                if (Reflect.has(target, property)) {
                    return ret;
                }
                if (Reflect.has(wp, property)) {
                    throw error(ERR_OPENED_PROP_ACCESS_BLOCKED, property, wp);
                }
                return ret;
            },
            set: function () {},
        });
        openeds.set(wp, p);
    }

    return getProxyByWindowProxy(wp);
}

module.exports = {proxy, getProxyByWindowProxy};