"use strict";
var express = require('express');
var router = express.Router();
// POSTリクエストを処理するルート
router.post('/', (req, res, next) => {
    try {
        // データを受け取る
        const requestBody = req.body;
        const requestReferer = req.headers.referer || req.headers.referrer;
        console.log("requestBody::" + JSON.stringify(requestBody));
        //requestBodyとrequestRefererをDB登録する呼び出し関数を書く
        if (requestReferer) {
            console.log('Referer:', requestReferer);
        }
        else {
            console.log('Referer information not available.');
        }
        // レスポンスを返す
        res.status(200).json({ message: 'POSTリクエストを受け取りました' });
    }
    catch (error) {
        console.error('エラー:', error);
        res.status(500).json({ error: 'エラーが発生しました' });
    }
});
module.exports = router;
