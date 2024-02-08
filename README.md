# ローカル立ち上げ

docker-compose up
ローカル環境構築はこちらを参考にした

https://qiita.com/tanakaPH/items/84aedaad8c0f5958a5f0
https://qiita.com/cedrictarou/items/ad7fab32a47d620045a0

# ts のコンパイル

npx tsc

# node 立ち上げ

npm run start

# テスト

yarn jest
テストは jest を使っている
https://typescriptbook.jp/tutorials/jest

#　サーバの構築
https://movee.esa.io/posts/38

# mainブランチで修正して他のリリースブランチに適用。ただし、共通項目の改修に限る
ex.mainブランチの修正をfeature/betaに適用するとき

1.mainブランでdataanalytics.jsをコピー
2.git checkout feature/beta
3.https://localhost:3000を https://beta.mreactiondata.comに変更,const redis = new Redis(redisPort, "redis")をconst redis = new Redis(redisPort, "127.0.0.1");を変更
4.npx terser src/public/javascripts/dataanalytics.js -o src/public/javascripts/dataanalytics.js
5.npx tsc;
6.アド、コミット、プッシュ