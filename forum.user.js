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
        const timeEl = item.querySelector('time[data-timestamp]');
        if (!timeEl) return;

        const ts = parseInt(timeEl.dataset.timestamp, 10);
        const diffHours = (now - ts) / 3600;

        const authorLink = item.querySelector('.structItem-parts li:first-child a.username');
        if (!authorLink) return;

        const hasSpanInside = authorLink.querySelector("span");
        if (hasSpanInside) return;

        const prefixEl = item.querySelector('.label');
        const prefix = prefixEl ? prefixEl.textContent.trim().toLowerCase() : "";

        const ignorePrefixes = ["отказано", "рассмотрено"];
        if (ignorePrefixes.some(p => prefix.includes(p))) return;
        if (diffHours >= 24) {
            item.style.background = "rgba(255, 0, 0, 0.18)";
            item.style.borderRadius = "6px";
        }
    });
})();