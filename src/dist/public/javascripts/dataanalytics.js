"use strict";
document.addEventListener("DOMContentLoaded", (function () { passed(); buttonPushed(); linkPushed(); documentDownloaded(); selectBoxSelected(); radioButtonSelected(); videoPlayed(); }));
function passed() { const passes = document.querySelectorAll(".passMRD"); const observer = new IntersectionObserver(showElements); passes.forEach((pass => { observer.observe(pass); })); function showElements(entries) { entries.forEach((entry => { if (entry.isIntersecting) {
    const text = entry.target.textContent;
    console.log("テキスト情報:", text);
    fetch("https://beta.mreactiondata.com/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "passed", text: text, hostname: window.location.hostname, path: window.location.href }) }).catch((error => { console.error("エラー:", error); }));
} })); } }
function buttonPushed() { const buttons = document.querySelectorAll(".pushButtonMRD"); buttons.forEach((function (button) { button.addEventListener("click", (function () { const buttonText = this.textContent; fetch("https://beta.mreactiondata.com/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "button push", buttonText: buttonText, hostname: window.location.hostname, path: window.location.href }) }).catch((error => { console.error("エラー:", error); })); })); })); }
function linkPushed() { const linkElements = document.querySelectorAll(".pushLinkMRD"); linkElements.forEach((function (linkElement) { linkElement.addEventListener("click", (function () { const linkText = this.textContent; const linkUrl = this.getAttribute("href"); fetch("https://beta.mreactiondata.com/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "link push", linkText: linkText, linkUrl: linkUrl, hostname: window.location.hostname, path: window.location.href }) }).catch((error => { console.error("エラー:", error); })); })); })); }
function documentDownloaded() { const linkElements = document.querySelectorAll(".downloadLinkMRD"); linkElements.forEach((function (linkElement) { linkElement.addEventListener("click", (function () { const linkText = this.textContent; const linkUrl = this.getAttribute("href"); fetch("https://beta.mreactiondata.com/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "download", linkText: linkText, linkUrl: linkUrl, hostname: window.location.hostname, path: window.location.href }) }).catch((error => { console.error("エラー:", error); })); })); })); }
function selectBoxSelected() { const selectBoxes = document.querySelectorAll(".selectMRD"); selectBoxes.forEach((function (selectBox) { selectBox.addEventListener("mousedown", (function (event) { const clickedSelectBoxId = event.target.id; fetch("https://beta.mreactiondata.com/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "selectboxSelected", selectBoxName: selectBox.name, selectBoxNameId: clickedSelectBoxId, hostname: window.location.hostname, path: window.location.href }) }).catch((error => { console.error("エラー:", error); })); })); })); }
function radioButtonSelected() { const radioButtons = document.querySelectorAll(".radioboxMRD"); radioButtons.forEach((function (radioButton) { radioButton.addEventListener("mousedown", (function (event) { event.stopPropagation(); fetch("https://beta.mreactiondata.com/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "radioButtonSelected", radioButtonName: radioButton.getAttribute("name"), hostname: window.location.hostname, path: window.location.href }) }).catch((error => { console.error("エラー:", error); })); console.log("ラジオボタンがマウスでクリックされました"); const name = radioButton.getAttribute("name"); console.log("ラジオボタンの name 属性:", name); })); const label = radioButton.closest("label"); if (label) {
    label.addEventListener("mousedown", (function () { const labelText = label.textContent.trim(); fetch("https://beta.mreactiondata.com/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "radioLabelSelected", labelText: labelText, hostname: window.location.hostname, path: window.location.href }) }).catch((error => { console.error("エラー:", error); })); console.log("ラベルのテキスト:", labelText); console.log("ラベルがマウスでクリックされました"); }));
} })); }
function videoPlayed() { const videoElements = document.querySelectorAll(".videoElement"); videoElements.forEach(((videoElement, index) => { let startTime = 0; let endTime = 0; videoElement.addEventListener("play", (function () { startTime = (new Date).getTime() / 1e3; })); videoElement.addEventListener("pause", (function () { endTime = (new Date).getTime() / 1e3; const duration = endTime - startTime; const videoSrc = videoElement.querySelector("source").getAttribute("src"); console.log(`動画${index + 1}の再生時間: ${duration.toFixed(2)} 秒`); console.log(`動画${index + 1}のファイル名: ${videoSrc}`); fetch("https://beta.mreactiondata.com/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "video reproduction", text: videoSrc, videoPlayedTime: duration.toFixed(2), hostname: window.location.hostname, path: window.location.href }) }).catch((error => { console.error("エラー:", error); })); })); })); }
