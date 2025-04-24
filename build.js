import main from "./src/index";

(function(win) {
    Object.defineProperty(win, 'SNOW', {
        value: function(w) {
            func(w || win);
        }
    });

    let func = main;
    if (win !== top) {
        func = top.SNOW;
        win.SNOW(() => {}, win);
    }
}(window));