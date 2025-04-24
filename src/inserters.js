const {error, ERR_NON_TOP_DOCUMENT_WRITE_BLOCKED, ERR_HTML_FRAMES_BLOCKED} = require('./log');
const {slice, Object, Function} = require('./natives');
const {assertHTML} = require('./html');
const {getFramesArray, isTagFramable} = require("./utils");

const map = {
    Range: ['insertNode'],
    DocumentFragment: ['replaceChildren', 'append', 'prepend'],
    Document: ['replaceChildren', 'append', 'prepend', 'write', 'writeln'],
    Node: ['appendChild', 'insertBefore', 'replaceChild'],
    Element: ['innerHTML', 'outerHTML', 'insertAdjacentHTML', 'replaceWith', 'insertAdjacentElement', 'append', 'before', 'prepend', 'after', 'replaceChildren'],
    ShadowRoot: ['innerHTML'],
    HTMLIFrameElement: ['srcdoc'],
};

const protos = Object.getOwnPropertyNames(map);

function getHook(native, isRange, isWrite) {
    return function() {
        if (isWrite && this !== top.document) {
            throw error(ERR_NON_TOP_DOCUMENT_WRITE_BLOCKED, this);
        }
        const args = slice(arguments);
        assertHTML(args);
        args.forEach(f => {
            if (isTagFramable(f)) {
                throw error(ERR_HTML_FRAMES_BLOCKED, f);
            }
            if (getFramesArray(f, false).length) {
                throw error(ERR_HTML_FRAMES_BLOCKED, f);
            }
        });
        return Function.prototype.apply.call(native, this, args);
    };
}

function hookDOMInserters(win) {
    for (let i = 0; i < protos.length; i++) {
        const proto = protos[i];
        const funcs = map[proto];
        for (let i = 0; i < funcs.length; i++) {
            const func = funcs[i];
            const desc = Object.getOwnPropertyDescriptor(win[proto].prototype, func);
            if (!desc) continue;
            const prop = desc.set ? 'set' : 'value';
            const
                isRange = proto === 'Range',
                isWrite = func === 'write' || func === 'writeln';
            desc[prop] = getHook(desc[prop], isRange, isWrite);
            desc.configurable = true;
            if (prop === 'value') {
                desc.writable = true;
            }
            Object.defineProperty(win[proto].prototype, func, desc);
        }
    }
}

module.exports = hookDOMInserters;