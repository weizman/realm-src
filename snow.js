(function(){
"use strict";
if (typeof SNOW === "function") return;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 49:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  getFramesArray,
  getDeclarativeShadows
} = __webpack_require__(347);
const {
  document,
  getChildElementCount,
  setInnerHTML
} = __webpack_require__(922);
const {
  error,
  ERR_DECLARATIVE_SHADOWS_BLOCKED,
  ERR_HTML_FRAMES_BLOCKED
} = __webpack_require__(144);
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
module.exports = {
  assertHTML
};

/***/ }),

/***/ 85:
/***/ ((module) => {

const getLength = Object.getOwnPropertyDescriptor(window, 'length').get;
const getLengthTop = getLength.bind(window);
const createElement = Object.getOwnPropertyDescriptor(Document.prototype, 'createElement').value.bind(document);
const appendChild = Object.getOwnPropertyDescriptor(Node.prototype, 'appendChild').value.bind(document.documentElement);
const removeChild = Object.getOwnPropertyDescriptor(Node.prototype, 'removeChild').value.bind(document.documentElement);
function runInNewRealm(cb) {
  const length = getLengthTop();
  const ifr = createElement('IFRAME');
  appendChild(ifr);
  const ret = cb(window[length]);
  removeChild(ifr);
  return ret;
}
module.exports = {
  getLength,
  runInNewRealm
};

/***/ }),

/***/ 144:
/***/ ((module) => {

const ERR_MARK_NEW_WINDOW_FAILED = 1;
const ERR_CB_MUST_BE_FUNCTION = 2;
const ERR_OPEN_JS_SCHEME_BLOCKED = 3;
const ERR_OPENED_PROP_ACCESS_BLOCKED = 4;
const ERR_DECLARATIVE_SHADOWS_BLOCKED = 5;
const ERR_EXTENDING_FRAMABLES_BLOCKED = 6;
const ERR_BLOB_TYPE_BLOCKED = 7;
const ERR_HTML_FRAMES_BLOCKED = 8;
const ERR_NON_TOP_DOCUMENT_WRITE_BLOCKED = 9;
const {
  Error
} = globalThis;
const {
  from
} = Array;
const error = Function.prototype.apply.bind(console.error, console);
function err(code) {
  const args = from(arguments);
  error(args);
  return new Error(code);
}
function generateErrorMessage(code) {
  return `SNOW ERROR (CODE:${code}):`;
}
function e(msg, a, b, c) {
  switch (msg) {
    case ERR_BLOB_TYPE_BLOCKED:
      const object = a,
        kind = b,
        type = c;
      return err(generateErrorMessage(ERR_BLOB_TYPE_BLOCKED), `blocking ${kind} object:`, object, `of type "${type}" (not in allow list)`, '.', 'if this prevents your application from running correctly, please visit/report at', 'https://github.com/LavaMoat/snow/issues/87#issuecomment-1586868353', '.');
    case ERR_EXTENDING_FRAMABLES_BLOCKED:
      const name = a,
        options = b;
      return err(generateErrorMessage(ERR_EXTENDING_FRAMABLES_BLOCKED), `blocking extension attempt ("${name}") of framable elements such as provided`, options, '.', 'if this prevents your application from running correctly, please visit/report at', 'https://github.com/LavaMoat/snow/issues/56#issuecomment-1374899809', '.');
    case ERR_MARK_NEW_WINDOW_FAILED:
      const win = a,
        exception = b;
      return err(generateErrorMessage(ERR_MARK_NEW_WINDOW_FAILED), 'failed to mark new window:', win, '.', 'if this prevents your application from running correctly, please visit/report at', 'https://github.com/LavaMoat/snow/issues/33#issuecomment-1239280063', '.', 'in order to maintain a bulletproof defense mechanism, failing to mark a new window typically causes an infinite loop', '.', 'error caught:', exception);
    case ERR_CB_MUST_BE_FUNCTION:
      const cb = a;
      return err(generateErrorMessage(ERR_CB_MUST_BE_FUNCTION), 'first argument must be of type "function", instead got:', cb, '.', 'therefore, snow bailed and is not applied to the page until this is fixed.');
    case ERR_OPEN_JS_SCHEME_BLOCKED:
      const url = a,
        win2 = b;
      return err(generateErrorMessage(ERR_OPEN_JS_SCHEME_BLOCKED), 'blocking open attempt to "javascript:" url:', url, 'by window: ', win2, '.', 'if this prevents your application from running correctly, please visit/report at', 'https://github.com/LavaMoat/snow/issues/44#issuecomment-1369687802', '.');
    case ERR_OPENED_PROP_ACCESS_BLOCKED:
      const property = a,
        win3 = b;
      return err(generateErrorMessage(ERR_OPENED_PROP_ACCESS_BLOCKED), 'blocking access to property:', `"${property}"`, 'of opened window: ', win3, '.', 'if this prevents your application from running correctly, please visit/report at', 'https://github.com/LavaMoat/snow/issues/2#issuecomment-1239264255', '.');
    case ERR_DECLARATIVE_SHADOWS_BLOCKED:
      const html = a;
      return err(generateErrorMessage(ERR_DECLARATIVE_SHADOWS_BLOCKED), 'blocking html string that includes a representation of a declarative shadow:', `"${html}"`, '.', 'if this prevents your application from running correctly, please visit/report at', 'https://github.com/LavaMoat/snow/issues/32#issuecomment-1239273328', '.');
    case ERR_HTML_FRAMES_BLOCKED:
      const html2 = a;
      return err(generateErrorMessage(ERR_HTML_FRAMES_BLOCKED), 'blocking html string that includes a representation of a framable element with the "srcdoc" attribute:', `"${html2}"`, '.', 'if this prevents your application from running correctly, please visit/report at', 'https://github.com/LavaMoat/snow/issues/???', '.');
    case ERR_NON_TOP_DOCUMENT_WRITE_BLOCKED:
      const document = a;
      return err(generateErrorMessage(ERR_NON_TOP_DOCUMENT_WRITE_BLOCKED), 'blocking document.write\\ln action on a document that is not the top most document:', document, '.', 'if this prevents your application from running correctly, please visit/report at', 'https://github.com/LavaMoat/snow/issues/???', '.');
  }
}
module.exports = {
  error: e,
  generateErrorMessage,
  ERR_MARK_NEW_WINDOW_FAILED,
  ERR_OPENED_PROP_ACCESS_BLOCKED,
  ERR_OPEN_JS_SCHEME_BLOCKED,
  ERR_CB_MUST_BE_FUNCTION,
  ERR_DECLARATIVE_SHADOWS_BLOCKED,
  ERR_EXTENDING_FRAMABLES_BLOCKED,
  ERR_BLOB_TYPE_BLOCKED,
  ERR_HTML_FRAMES_BLOCKED,
  ERR_NON_TOP_DOCUMENT_WRITE_BLOCKED
};

/***/ }),

/***/ 210:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  Object,
  Function
} = __webpack_require__(922);
const {
  isTagFramable
} = __webpack_require__(347);
const {
  error,
  ERR_EXTENDING_FRAMABLES_BLOCKED
} = __webpack_require__(144);
function getHook(win, native) {
  return function (name, constructor, options) {
    let opts = options;
    if (options) {
      const extend = options.extends;
      if (isTagFramable(extend + '')) {
        throw error(ERR_EXTENDING_FRAMABLES_BLOCKED, name, options);
      }
    }
    return Function.prototype.call.call(native, this, name, constructor, opts);
  };
}
function hookCustoms(win) {
  const desc = Object.getOwnPropertyDescriptor(win.CustomElementRegistry.prototype, 'define');
  desc.configurable = desc.writable = true;
  const val = desc.value;
  desc.value = getHook(win, val);
  Object.defineProperty(win.CustomElementRegistry.prototype, 'define', desc);
}
module.exports = hookCustoms;

/***/ }),

/***/ 347:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  tagName,
  nodeType,
  slice,
  Array,
  parse,
  stringify,
  Node,
  Document,
  DocumentFragment,
  Element,
  ShadowRoot,
  getContentWindow,
  getDefaultView,
  getOwnerDocument,
  stringToLowerCase,
  Object
} = __webpack_require__(922);
const shadows = new Array(),
  trustedHTMLs = new Array();
function isShadow(node) {
  return shadows.includes(node);
}
function isTrustedHTML(node) {
  return trustedHTMLs.includes(node);
}
function makeDescriptorSetter(prop, val) {
  const desc = Object.create(null);
  desc.value = val;
  return function (obj) {
    if (!Object.getOwnPropertyDescriptor(obj, prop)) {
      Object.defineProperty(obj, prop, desc);
    }
  };
}
function getPrototype(node) {
  if (isShadow(node)) {
    return ShadowRoot;
  }
  switch (nodeType(node)) {
    case Node.prototype.DOCUMENT_NODE:
      return Document;
    case Node.prototype.DOCUMENT_FRAGMENT_NODE:
      return DocumentFragment;
    default:
      return Element;
  }
}
function isTagFramable(t) {
  const tag = stringToLowerCase(t);
  return tag === 'iframe' || tag === 'frame' || tag === 'object' || tag === 'embed';
}
function getFrameTag(element) {
  if (!element || typeof element !== 'object') {
    return null;
  }
  if (nodeType(element) !== Element.prototype.ELEMENT_NODE) {
    return null;
  }
  if (isShadow(element)) {
    return null;
  }
  const tag = tagName(element);
  if (!isTagFramable(tag)) {
    return null;
  }
  return tag;
}
function toArray(item) {
  if (!Array.isArray(item)) {
    item = new Array(item);
  }
  return item;
}
function getContentWindowOfFrame(iframe) {
  return getContentWindow(iframe, getFrameTag(iframe));
}
function getOwnerWindowOfNode(iframe) {
  return getDefaultView(getOwnerDocument(iframe));
}
function canNodeRunQuerySelector(node) {
  if (isShadow(node)) {
    return true;
  }
  const type = nodeType(node);
  return type === Element.prototype.ELEMENT_NODE || type === Element.prototype.DOCUMENT_FRAGMENT_NODE || type === Element.prototype.DOCUMENT_NODE;
}
function getDeclarativeShadows(element) {
  const querySelectorAll = getPrototype(element).prototype.querySelectorAll;
  return querySelectorAll.call(element, 'template[shadowroot]');
}
function getFramesArray(element, includingParent) {
  const frames = new Array();
  if (null === element || typeof element !== 'object') {
    return frames;
  }
  if (isTrustedHTML(element) || !canNodeRunQuerySelector(element)) {
    return frames;
  }
  const querySelectorAll = getPrototype(element).prototype.querySelectorAll;
  const list = querySelectorAll.call(element, 'iframe,frame,object,embed');
  fillArrayUniques(frames, slice(list));
  if (includingParent) {
    fillArrayUniques(frames, toArray(element));
  }
  return frames;
}
function fillArrayUniques(arr, items) {
  let isArrUpdated = false;
  for (let i = 0; i < items.length; i++) {
    if (!arr.includes(items[i])) {
      arr.push(items[i]);
      isArrUpdated = true;
    }
  }
  return isArrUpdated;
}
module.exports = {
  getDeclarativeShadows,
  makeDescriptorSetter,
  toArray,
  isTagFramable,
  getOwnerWindowOfNode,
  getContentWindowOfFrame,
  getFramesArray,
  getFrameTag,
  shadows,
  trustedHTMLs
};

/***/ }),

/***/ 354:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  Map,
  toString,
  stringStartsWith,
  Blob
} = __webpack_require__(922);
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

/***/ }),

/***/ 465:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  Object,
  slice,
  Function
} = __webpack_require__(922);
const {
  proxy
} = __webpack_require__(926);
function hookDocumentPictureInPicture(win, prop) {
  const desc = Object.getOwnPropertyDescriptor(win[prop].prototype, 'window');
  const get = desc.get;
  desc.get = function () {
    return proxy(get.call(this));
  };
  Object.defineProperty(win[prop].prototype, 'window', desc);
}
function hook(win, native, cb) {
  cb(win, 'DocumentPictureInPictureEvent');
  cb(win, 'DocumentPictureInPicture');
  return async function open() {
    const args = slice(arguments);
    const opened = await Function.prototype.apply.call(native, this, args);
    if (!opened) {
      return null;
    }
    return proxy(opened);
  };
}
function hookRequestWindow(win) {
  if (!win?.documentPictureInPicture?.requestWindow) {
    return;
  }
  win.documentPictureInPicture.requestWindow = hook(win, win.documentPictureInPicture.requestWindow, hookDocumentPictureInPicture);
}
module.exports = hookRequestWindow;

/***/ }),

/***/ 675:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  stringToLowerCase,
  stringStartsWith,
  slice,
  Function,
  Object
} = __webpack_require__(922);
const {
  error,
  ERR_OPEN_JS_SCHEME_BLOCKED
} = __webpack_require__(144);
const {
  proxy,
  getProxyByWindowProxy
} = __webpack_require__(926);
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

/***/ }),

/***/ 922:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  runInNewRealm
} = __webpack_require__(85);
function natives(win) {
  const {
    EventTarget
  } = win; // PR#62
  return runInNewRealm(function (win) {
    const {
      URL,
      Proxy,
      JSON,
      Attr,
      String,
      Function,
      Map,
      Node,
      Document,
      DocumentFragment,
      Blob,
      ShadowRoot,
      Object,
      Reflect,
      Array,
      Element,
      HTMLElement,
      Range,
      HTMLIFrameElement,
      HTMLFrameElement,
      HTMLObjectElement
    } = win;
    const bag = {
      URL,
      Proxy,
      JSON,
      Attr,
      String,
      Function,
      Map,
      Node,
      Document,
      DocumentFragment,
      Blob,
      ShadowRoot,
      Object,
      Reflect,
      Array,
      Element,
      HTMLElement,
      Range,
      EventTarget,
      HTMLIFrameElement,
      HTMLFrameElement,
      HTMLObjectElement
    };
    bag.document = {
      createElement: win.document.createElement.bind(win.document)
    };
    return bag;
  });
}
function setup(win) {
  const bag = natives(win);
  const {
    document,
    Proxy,
    Function,
    String,
    Map,
    Node,
    Document,
    DocumentFragment,
    Blob,
    ShadowRoot,
    Object,
    Reflect,
    Array,
    Element,
    HTMLElement,
    Range,
    EventTarget,
    HTMLIFrameElement,
    HTMLFrameElement,
    HTMLObjectElement
  } = bag;
  Object.assign(bag, {
    iframeContentWindow: Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'contentWindow').get,
    frameContentWindow: Object.getOwnPropertyDescriptor(HTMLFrameElement.prototype, 'contentWindow').get,
    objectContentWindow: Object.getOwnPropertyDescriptor(HTMLObjectElement.prototype, 'contentWindow').get,
    createElement: Object.getOwnPropertyDescriptor(Document.prototype, 'createElement').value,
    slice: Object.getOwnPropertyDescriptor(Array.prototype, 'slice').value,
    push: Object.getOwnPropertyDescriptor(Array.prototype, 'push').value,
    split: Object.getOwnPropertyDescriptor(String.prototype, 'split').value,
    nodeType: Object.getOwnPropertyDescriptor(Node.prototype, 'nodeType').get,
    isConnected: Object.getOwnPropertyDescriptor(Node.prototype, 'isConnected').get,
    tagName: Object.getOwnPropertyDescriptor(Element.prototype, 'tagName').get,
    getInnerHTML: Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML').get,
    setInnerHTML: Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML').set,
    toString: Object.getOwnPropertyDescriptor(Object.prototype, 'toString').value,
    getOnload: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onload').get,
    setOnload: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onload').set,
    getAttribute: Object.getOwnPropertyDescriptor(Element.prototype, 'getAttribute').value,
    setAttribute: Object.getOwnPropertyDescriptor(Element.prototype, 'setAttribute').value,
    removeAttribute: Object.getOwnPropertyDescriptor(Element.prototype, 'removeAttribute').value,
    remove: Object.getOwnPropertyDescriptor(Element.prototype, 'remove').value,
    addEventListener: Object.getOwnPropertyDescriptor(EventTarget.prototype, 'addEventListener').value,
    removeEventListener: Object.getOwnPropertyDescriptor(EventTarget.prototype, 'removeEventListener').value,
    getChildElementCount: Object.getOwnPropertyDescriptor(Element.prototype, 'childElementCount').get,
    getFrameElement: Object.getOwnPropertyDescriptor(win, 'frameElement').get,
    getParentElement: Object.getOwnPropertyDescriptor(Node.prototype, 'parentElement').get,
    getOwnerDocument: Object.getOwnPropertyDescriptor(Node.prototype, 'ownerDocument').get,
    getDefaultView: Object.getOwnPropertyDescriptor(Document.prototype, 'defaultView').get,
    getBlobFileType: Object.getOwnPropertyDescriptor(Blob.prototype, 'type').get,
    getPreviousElementSibling: Object.getOwnPropertyDescriptor(Element.prototype, 'previousElementSibling').get,
    getCommonAncestorContainer: Object.getOwnPropertyDescriptor(Range.prototype, 'commonAncestorContainer').get
  });
  return {
    document,
    Proxy,
    Object,
    Reflect,
    Function,
    Node,
    Element,
    Document,
    DocumentFragment,
    Blob,
    ShadowRoot,
    Array,
    Map,
    getContentWindow,
    stringToLowerCase,
    stringStartsWith,
    parse,
    stringify,
    slice,
    push,
    split,
    nodeType,
    isConnected,
    tagName,
    toString,
    getOnload,
    setOnload,
    remove,
    removeAttribute,
    getAttribute,
    setAttribute,
    addEventListener,
    removeEventListener,
    createElement,
    getInnerHTML,
    setInnerHTML,
    getChildElementCount,
    getFrameElement,
    getParentElement,
    getOwnerDocument,
    getDefaultView,
    getBlobFileType,
    getPreviousElementSibling,
    getCommonAncestorContainer
  };
  function getContentWindow(element, tag) {
    switch (tag) {
      case 'IFRAME':
        return bag.iframeContentWindow.call(element);
      case 'FRAME':
        return bag.frameContentWindow.call(element);
      case 'OBJECT':
        return bag.objectContentWindow.call(element);
      case 'EMBED':
        return null;
      default:
        return null;
    }
  }
  function stringToLowerCase(string) {
    return bag.String.prototype.toLowerCase.call(string);
  }
  function stringStartsWith(string, find) {
    return bag.String.prototype.startsWith.call(string, find);
  }
  function parse(text, reviver) {
    return bag.JSON.parse(text, reviver);
  }
  function stringify(value, replacer, space) {
    return bag.JSON.stringify(value, replacer, space);
  }
  function slice(arr, start, end) {
    return bag.slice.call(arr, start, end);
  }
  function push(arr, item) {
    return bag.push.call(arr, item);
  }
  function split(string, delimiter) {
    return bag.split.call(string, delimiter);
  }
  function nodeType(node) {
    return bag.nodeType.call(node);
  }
  function isConnected(node) {
    return bag.isConnected.call(node);
  }
  function tagName(element) {
    return bag.tagName.call(element);
  }
  function toString(object) {
    return bag.toString.call(object);
  }
  function getOnload(element) {
    return bag.getOnload.call(element);
  }
  function setOnload(element, onload) {
    return bag.setOnload.call(element, onload);
  }
  function remove(element) {
    return bag.remove.call(element);
  }
  function removeAttribute(element, attribute) {
    return bag.removeAttribute.call(element, attribute);
  }
  function getAttribute(element, attribute) {
    return bag.getAttribute.call(element, attribute);
  }
  function setAttribute(element, attribute, value) {
    return bag.setAttribute.call(element, attribute, value);
  }
  function addEventListener(element, event, listener, options) {
    return bag.Function.prototype.call.call(bag.addEventListener, element, event, listener, options);
  }
  function removeEventListener(element, event, listener, options) {
    return bag.Function.prototype.call.call(bag.removeEventListener, element, event, listener, options);
  }
  function createElement(document, tagName, options) {
    return bag.createElement.call(document, tagName, options);
  }
  function getInnerHTML(element) {
    return bag.getInnerHTML.call(element);
  }
  function setInnerHTML(element, html) {
    return bag.setInnerHTML.call(element, html);
  }
  function getChildElementCount(element) {
    return bag.getChildElementCount.call(element);
  }
  function getFrameElement(win) {
    return bag.Function.prototype.call.call(bag.getFrameElement, win);
  }
  function getParentElement(element) {
    return bag.getParentElement.call(element);
  }
  function getOwnerDocument(node) {
    return bag.getOwnerDocument.call(node);
  }
  function getDefaultView(document) {
    return bag.getDefaultView.call(document);
  }
  function getBlobFileType(blob) {
    return bag.getBlobFileType.call(blob);
  }
  function getPreviousElementSibling(node) {
    return bag.getPreviousElementSibling.call(node);
  }
  function getCommonAncestorContainer(range) {
    return bag.getCommonAncestorContainer.call(range);
  }
}
module.exports = setup(top);

/***/ }),

/***/ 926:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  Object,
  Proxy,
  Reflect,
  Map
} = __webpack_require__(922);
const {
  error,
  ERR_OPENED_PROP_ACCESS_BLOCKED
} = __webpack_require__(144);
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
      set: function () {}
    });
    openeds.set(wp, p);
  }
  return getProxyByWindowProxy(wp);
}
module.exports = {
  proxy,
  getProxyByWindowProxy
};

/***/ }),

/***/ 954:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const hookCustoms = __webpack_require__(210);
const hookOpen = __webpack_require__(988);
const hookRequestWindow = __webpack_require__(465);
const hookDOMInserters = __webpack_require__(997);
const hookWorker = __webpack_require__(354);
const hookOpener = __webpack_require__(675);
function main(win) {
  hookCustoms(win);
  hookOpen(win);
  hookRequestWindow(win);
  hookDOMInserters(win);
  hookWorker(win);
  hookOpener(win);
}
module.exports = main;

/***/ }),

/***/ 988:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  stringToLowerCase,
  stringStartsWith,
  slice,
  Function,
  Object
} = __webpack_require__(922);
const {
  error,
  ERR_OPEN_JS_SCHEME_BLOCKED
} = __webpack_require__(144);
const {
  proxy,
  getProxyByWindowProxy
} = __webpack_require__(926);
function hookMessageEvent(win) {
  const desc = Object.getOwnPropertyDescriptor(win.MessageEvent.prototype, 'source');
  const get = desc.get;
  desc.get = function () {
    const source = get.call(this);
    return getProxyByWindowProxy(source) || source;
  };
  Object.defineProperty(win.MessageEvent.prototype, 'source', desc);
}
function hook(win, native, cb, isWindowProxy) {
  cb(win);
  return function open() {
    const args = slice(arguments);
    const url = args[0];
    if (stringStartsWith(stringToLowerCase(url + ''), 'javascript')) {
      throw error(ERR_OPEN_JS_SCHEME_BLOCKED, url + '', win);
    }
    if (stringStartsWith(stringToLowerCase(url + ''), 'blob')) {
      throw error(ERR_OPEN_JS_SCHEME_BLOCKED, url + '', win);
    }
    const opened = Function.prototype.apply.call(native, this, args);
    if (!opened) {
      return null;
    }
    if (!isWindowProxy && args.length < 3) {
      return opened;
    }
    return proxy(opened);
  };
}
function hookOpen(win) {
  Object.defineProperty(win, 'open', {
    value: hook(win, win.open, hookMessageEvent, true)
  });
  Object.defineProperty(win.Document.prototype, 'open', {
    value: hook(win, win.document.open, hookMessageEvent, false)
  });
}
module.exports = hookOpen;

/***/ }),

/***/ 997:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  error,
  ERR_NON_TOP_DOCUMENT_WRITE_BLOCKED,
  ERR_HTML_FRAMES_BLOCKED
} = __webpack_require__(144);
const {
  slice,
  Object,
  Function
} = __webpack_require__(922);
const {
  assertHTML
} = __webpack_require__(49);
const {
  getFramesArray,
  isTagFramable
} = __webpack_require__(347);
const map = {
  Range: ['insertNode'],
  DocumentFragment: ['replaceChildren', 'append', 'prepend'],
  Document: ['replaceChildren', 'append', 'prepend', 'write', 'writeln'],
  Node: ['appendChild', 'insertBefore', 'replaceChild'],
  Element: ['innerHTML', 'outerHTML', 'insertAdjacentHTML', 'replaceWith', 'insertAdjacentElement', 'append', 'before', 'prepend', 'after', 'replaceChildren'],
  ShadowRoot: ['innerHTML'],
  HTMLIFrameElement: ['srcdoc']
};
const protos = Object.getOwnPropertyNames(map);
function getHook(native, isRange, isWrite) {
  return function () {
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
      const isRange = proto === 'Range',
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(954);
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_index__WEBPACK_IMPORTED_MODULE_0__);

(function (win) {
  Object.defineProperty(win, 'SNOW', {
    value: function (w) {
      func(w || win);
    }
  });
  let func = (_src_index__WEBPACK_IMPORTED_MODULE_0___default());
  if (win !== top) {
    func = top.SNOW;
    win.SNOW(() => {}, win);
  }
})(window);
})();

/******/ })()
;
}())