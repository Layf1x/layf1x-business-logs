// ==UserScript==
// @name         forum
// @namespace    http://tampermonkey.net/
// @version      1
// @match        https://forum.arizona-rp.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=arizona-rp.com
// @grant        none
// ==/UserScript==

(function () {
    const now = Date.now() / 1000;

    document.querySelectorAll('.structItem').forEach(item => {
        const timeel = item.querySelector('time[data-timestamp]');
        if (!timeel) return;

        const ts = parseInt(timeel.dataset.timestamp, 10);
        const diffhours = (now - ts) / 3600;

        const authorlink = item.querySelector('.structItem-parts li:first-child a.username');
        if (!authorlink) return;

        const hasspaninside = authorlink.querySelector("span");
        if (hasspaninside) return;

        const prefixel = item.querySelector('.label');
        const prefix = prefixel ? prefixel.textContent.trim().toLowerCase() : "";

        const ignoreprefixes = ["отказано", "рассмотрено"];
        if (ignoreprefixes.some(p => prefix.includes(p))) return;
        if (diffhours >= 24) {
            item.style.background = "rgba(255, 0, 0, 0.18)";
            item.style.borderRadius = "6px";
        }
    });
})();