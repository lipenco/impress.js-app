function automatedPresentation() {
    document.addEventListener("impress:stepenter", function (e) {
        var duration = e.target.dataset.duration;
        if (!duration) {
            duration = 3000;
        }
        var timing = setTimeout(function() {
        api.next()
        }, duration);
    }, false);
    if (typeof timing !== "undefined") {
        clearTimeout(timing);
    }
}