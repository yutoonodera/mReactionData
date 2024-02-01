"use strict";
//const apiUrl = "https://beta.mreactiondata.com"; // production
const apiUrl = "http://localhost:3000"; // local
document.addEventListener("DOMContentLoaded", function () {
    passed();
    buttonPushed();
    linkPushed();
    documentDownloaded();
    selectBoxSelected();
    radioButtonSelected();
    videoPlayed();
});
function passed() {
    // 着火点となる要素
    const passes = document.querySelectorAll(".passMRD");
    const observer = new IntersectionObserver(showElements);
    // 各要素に到達したら発動。複数あるから forEach
    passes.forEach((pass) => {
        observer.observe(pass);
    });
    // 要素が表示されたら実行する動作
    function showElements(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                console.log("テキスト情報:", text);
                // データをサーバーに送信
                fetch(apiUrl + "/analytics", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        action: "passed",
                        text: text,
                        hostname: window.location.hostname,
                        path: window.location.href
                    }),
                }).catch((error) => {
                    console.error("エラー:", error);
                });
            }
        });
    }
}
function buttonPushed() {
    const buttons = document.querySelectorAll(".pushButtonMRD");
    // 各要素に対してクリックイベントリスナーを追加
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            // クリック時に実行されるコードをここに記述
            const buttonText = this.textContent;
            fetch(apiUrl + "/analytics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "button push",
                    buttonText: buttonText,
                    hostname: window.location.hostname,
                    path: window.location.href
                }),
            }).catch((error) => {
                console.error("エラー:", error);
            });
        });
    });
}
function linkPushed() {
    const linkElements = document.querySelectorAll(".pushLinkMRD");
    // 各要素に対してクリックイベントリスナーを追加
    linkElements.forEach(function (linkElement) {
        linkElement.addEventListener("click", function () {
            const linkText = this.textContent;
            const linkUrl = this.getAttribute("href");
            fetch(apiUrl + "/analytics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "link push",
                    linkText: linkText,
                    linkUrl: linkUrl,
                    hostname: window.location.hostname,
                    path: window.location.href
                }),
            }).catch((error) => {
                console.error("エラー:", error);
            });
        });
    });
}
/**
 * download有無はユーザーのchrome設定次第で資料をダウンロードする、or 資料を開くになる
 */
function documentDownloaded() {
    const linkElements = document.querySelectorAll(".downloadLinkMRD");
    // 各要素に対してクリックイベントリスナーを追加
    linkElements.forEach(function (linkElement) {
        linkElement.addEventListener("click", function () {
            const linkText = this.textContent;
            const linkUrl = this.getAttribute("href");
            fetch(apiUrl + "/analytics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "download",
                    linkText: linkText,
                    linkUrl: linkUrl,
                    hostname: window.location.hostname,
                    path: window.location.href
                }),
            }).catch((error) => {
                console.error("エラー:", error);
            });
        });
    });
}
function selectBoxSelected() {
    const selectBoxes = document.querySelectorAll(".selectMRD");
    // 各セレクトボックスに対してクリックイベントリスナーを追加
    selectBoxes.forEach(function (selectBox) {
        selectBox.addEventListener("mousedown", function (event) {
            // クリックされたセレクトボックスのID情報を取得
            const clickedSelectBoxId = event.target.id;
            fetch(apiUrl + "/analytics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "selectboxSelected",
                    selectBoxName: selectBox.name,
                    selectBoxNameId: clickedSelectBoxId,
                    hostname: window.location.hostname,
                    path: window.location.href
                }),
            }).catch((error) => {
                console.error("エラー:", error);
            });
        });
    });
}
function radioButtonSelected() {
    const radioButtons = document.querySelectorAll(".radioboxMRD");
    // 各ラジオボタンに対してクリックイベントリスナーを追加
    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener("mousedown", function (event) {
            // ラジオボタンをクリックした場合、ラベルのクリックイベントを停止させる
            event.stopPropagation();
            fetch(apiUrl + "/analytics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "radioButtonSelected",
                    radioButtonName: radioButton.getAttribute("name"),
                    hostname: window.location.hostname,
                    path: window.location.href
                }),
            }).catch((error) => {
                console.error("エラー:", error);
            });
            console.log("ラジオボタンがマウスでクリックされました");
            const name = radioButton.getAttribute("name");
            console.log("ラジオボタンの name 属性:", name);
        });
        // ラベルを取得し、ラベルに対して mousedown イベントリスナーを追加
        const label = radioButton.closest("label");
        if (label) {
            label.addEventListener("mousedown", function () {
                const labelText = label.textContent.trim();
                fetch(apiUrl + "/analytics", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        action: "radioLabelSelected",
                        labelText: labelText,
                        hostname: window.location.hostname,
                        path: window.location.href
                    }), // テキスト情報を送信
                }).catch((error) => {
                    console.error("エラー:", error);
                });
                console.log("ラベルのテキスト:", labelText);
                console.log("ラベルがマウスでクリックされました");
            });
        }
    });
}
//動画再生時間を測定する関数
function videoPlayed() {
    const videoElements = document.querySelectorAll(".videoElement");
    videoElements.forEach((videoElement, index) => {
        let startTime = 0; // 再生開始時間
        let endTime = 0; // 再生停止時間
        // 再生ボタンがクリックされたときに実行
        videoElement.addEventListener("play", function () {
            startTime = new Date().getTime() / 1000; // 秒単位で現在時刻を取得
        });
        // 停止ボタンがクリックされたときに実行
        videoElement.addEventListener("pause", function () {
            endTime = new Date().getTime() / 1000; // 秒単位で現在時刻を取得
            const duration = endTime - startTime; // 再生時間を計算
            const videoSrc = videoElement.querySelector("source").getAttribute("src");
            console.log(`動画${index + 1}の再生時間: ${duration.toFixed(2)} 秒`);
            console.log(`動画${index + 1}のファイル名: ${videoSrc}`);
            fetch(apiUrl + "/analytics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "video reproduction",
                    text: videoSrc,
                    videoPlayedTime: duration.toFixed(2),
                    hostname: window.location.hostname,
                    path: window.location.href
                }),
            }).catch((error) => {
                console.error("エラー:", error);
            });
        });
    });
}
