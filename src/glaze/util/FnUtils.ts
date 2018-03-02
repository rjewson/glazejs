const throttle = function(fn:any, ms:number) {
    let lastCalled = 0;
    return function() {
        const now = Date.now();
        if (now-lastCalled>ms) {
            lastCalled = now;
            fn(...arguments);
        }
    }
}