"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAnalyticsPost = void 0;
const DisplayRequestData_1 = require("../models/DisplayRequestData");
const handleAnalyticsPost = (req, res) => {
    try {
        // リクエストデータを受け取る
        const requestBody = req.body;
        const requestReferer = req.headers.referer || req.headers.referrer;
        console.log("requestBody::" + JSON.stringify(requestBody));
        const displayRequest = new DisplayRequestData_1.DisplayRequestData();
        const hashedIp = displayRequest.hashIpAddress(req.ip);
        console.log(`モデル化したHashed IP: ${hashedIp}`);
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
};
exports.handleAnalyticsPost = handleAnalyticsPost;
