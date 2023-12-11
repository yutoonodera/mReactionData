// 着火点となる要素
const headings = document.querySelectorAll('.heading');
const options = {
  threshold: 1
};

// 実行するよ
const observer = new IntersectionObserver(showElements);

// 各 .heading に到達したら発動。複数あるから forEach 使うよ。
headings.forEach(heading => {
  observer.observe(heading);
});

// 要素が表示されたら実行する動作
function showElements(entries){
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 各 .heading に .active を加える
      entry.target.classList.add('active');
      console.log('発火完了');
      // テキスト情報を取得
      const text = entry.target.textContent;

      const dateData = getTimestamp();
      console.log('テキスト情報:', text);
        // データをサーバーに送信
        fetch('/analytics', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text, ymdDate: dateData.ymdDate, ymdhmsmDate: dateData.ymdhmsmDate }), // テキスト情報を送信
        })
            .then((response) => response.json())
            .then((data) => {
            // サーバーからの応答を処理
            console.log(data);
            })
            .catch((error) => {
            console.error('エラー:', error);
            });
    }
  });
};

function getTimestamp(){
  //日時取得のところ、このjs内で外だしする
  const currentDate = new Date();
  // 年月日時分秒ミリ秒を取得
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');
  const milliseconds = currentDate.getMilliseconds().toString().padStart(3, '0');

  // 指定されたフォーマットで組み合わせて表示
  const ymdhmsmDate = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
  const ymdDate = `${year}${month}${day}`;
  return {ymdhmsmDate, ymdDate};
}