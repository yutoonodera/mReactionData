"use strict";
document.addEventListener('DOMContentLoaded', function () {
    // 着火点となる要素
    const scrolls = document.querySelectorAll('.scrollMoveeWR');
    const observer = new IntersectionObserver(showElements);
    // 各要素に到達したら発動。複数あるから forEach
    scrolls.forEach(scroll => {
        observer.observe(scroll);
    });
    // 要素が表示されたら実行する動作
    function showElements(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                console.log('テキスト情報:', text);
                // データをサーバーに送信
                fetch('http://localhost:3000/analytics', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ action: 'scroll', text: text }), // テキスト情報を送信
                })
                    .catch((error) => {
                    console.error('エラー:', error);
                });
            }
        });
    }
    ;
    // すべての要素を取得
    const buttons = document.querySelectorAll('.pushButtonMoveeWR');
    // 各要素に対してクリックイベントリスナーを追加
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            // クリック時に実行されるコードをここに記述
            const buttonText = this.textContent;
            // データをサーバーに送信
            fetch('http://localhost:3000/analytics', {
                //fetch('/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'button push', buttonText: buttonText }), // テキスト情報を送信
            })
                .catch((error) => {
                console.error('エラー:', error);
            });
        });
    });
    // すべての要素を取得
    const linkElements = document.querySelectorAll('.pushLinkMoveeWR');
    // 各要素に対してクリックイベントリスナーを追加
    linkElements.forEach(function (linkElement) {
        linkElement.addEventListener('click', function () {
            const linkText = this.textContent;
            const linkUrl = this.getAttribute('href');
            fetch('http://localhost:3000/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'link push', linkText: linkText, linkUrl: linkUrl }), // テキスト情報を送信
            })
                .catch((error) => {
                console.error('エラー:', error);
            });
        });
    });
    //　後でコメントアウト復活してコミットする
    // videoReProduction();
});
//動画再生時間を測定する関数
// function videoReProduction(){
//   const videoElements = document.querySelectorAll('.videoElement');
// videoElements.forEach((videoElement, index) => {
//   let startTime = 0; // 再生開始時間
//   let endTime = 0;   // 再生停止時間
//   // 再生ボタンがクリックされたときに実行
//   videoElement.addEventListener('play', function() {
//     startTime = new Date().getTime() / 1000; // 秒単位で現在時刻を取得
//   });
//   // 停止ボタンがクリックされたときに実行
//   videoElement.addEventListener('pause', function() {
//     endTime = new Date().getTime() / 1000; // 秒単位で現在時刻を取得
//     const duration = endTime - startTime; // 再生時間を計算
//     const videoSrc = videoElement.querySelector('source').getAttribute('src');
//     console.log(`動画${index + 1}の再生時間: ${duration.toFixed(2)} 秒`);
//     console.log(`動画${index + 1}のファイル名: ${videoSrc}`);
//     const dateData = getTimestamp();
//     fetch('http://localhost:3000/analytics', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ action:'video reproduction',text: videoSrc, ymdDate: dateData.ymdDate, ymdhmsmDate: dateData.ymdhmsmDate }), // テキスト情報を送信
//     })
//     .catch((error) => {
//       console.error('エラー:', error);
//     });
//   });
// });
// }
