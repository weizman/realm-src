const {getFramesArray, getDeclarativeShadows} = require('./utils');
const {document, getChildElementCount, setInnerHTML} = require('./natives');
const {error, ERR_DECLARATIVE_SHADOWS_BLOCKED, ERR_HTML_FRAMES_BLOCKED} = require('./log');

function assertHTML(args) {
    for (let i = 0; i < args.length; i++) {
        const template = document.createElement('html');
        setInnerHTML(template, args[i]);
        if (getChildElementCount(template)) {
            if (getFramesArray(template, false).length) {
                throw error(ERR_HTML_FRAMES_BLOCKED, args[i]);
            }
        }
    }
}

module.exports = {assertHTML};