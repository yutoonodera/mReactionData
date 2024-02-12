"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAnalyticsPost = void 0;
const DisplayRequestData_1 = require("../models/DisplayRequestData");
const Profile_1 = require("../models/Profile");
const ioredis_1 = __importDefault(require("ioredis"));
// var Redis = require("ioredis");
const port = 3000;
const redisPort = 6379;
const redis = new ioredis_1.default(redisPort, "127.0.0.1"); //production
//const redis = new Redis(redisPort, "redis"); //local
const { v4: uuidv4 } = require('uuid');
const uniqueId = uuidv4();
const handleAnalyticsPost = (req, res) => {
    try {
        // リクエストデータを受け取る
        const requestBody = req.body;
        const displayRequest = new DisplayRequestData_1.DisplayRequestData();
        const hashedIp = displayRequest.hashIpAddress(req.ip);
        const dateData = displayRequest.getTimestamp();
        console.log('パス名' + requestBody.path);
        console.log("ホスト名" + requestBody.hostname);
        //if(!new Profile().containsDomain(requestBody.path)){ //local
        if (!new Profile_1.Profile().containsDomain(requestBody.hostname)) {
            return false;
        }
        console.log("ホスト名" + requestBody.hostname);
        //redis.get(requestBody.path, (err, redisResult: any) => { //local
        redis.get(requestBody.hostname, (err, redisResult) => {
            if (redisResult !== null && new Date(redisResult) < new Date() || redisResult === null) {
                //redis.set(requestBody.path,dateData.ymdDate), (err:any) => { //local
                redis.set(requestBody.hostname, dateData.ymdDate), (err) => {
                    if (err) {
                        console.error("Redis エラー:", err);
                        res.status(500).json({ error: "Redis エラーが発生しました" });
                        return false;
                    }
                };
            }
            //ホスト名、パス名、行動、Hash化したIP,テキスト,ボタンテキスト,リンクテキスト,リンクURL,セレクトボックス,セレクトボックスID,ラジオボタン名,ラジオボタンラベル名,動画再生時間（秒）,年月日,年月日分秒ミリ秒;
            //CSV出力かつ、DBテーブルに入れるので順番は大事
            const postData = `${requestBody.hostname},${requestBody.path},${requestBody.action},${hashedIp},${requestBody.text},${requestBody.buttonText}, ${requestBody.linkText},${requestBody.linkUrl},${requestBody.selectBoxName},${requestBody.selectBoxNameId},${requestBody.radioButtonName},${requestBody.labelText},${requestBody.videoPlayedTime},${dateData.ymdDate},${dateData.ymdhmsmDate}`;
            redis.set(requestBody.hostname + '_' + requestBody.path + '_' + requestBody.action + '_' + uniqueId + '((' + dateData.ymdhmsmDate + '))', postData);
        });
        console.log(`アクション: ${requestBody.action},ホスト名: ${requestBody.hostname},パス: ${requestBody.path}, Hash化したIP: ${hashedIp}, テキスト: ${requestBody.text},ボタンテキスト: ${requestBody.buttonText},リンクテキスト: ${requestBody.linkText},
       リンクURL: ${requestBody.linkUrl},セレクトボックス：${requestBody.selectBoxName},セレクトボックスID：${requestBody.selectBoxNameId},
       ラジオボタン名：${requestBody.radioButtonName},ラジオボタンラベル名: ${requestBody.labelText},動画再生時間（秒）:${requestBody.videoPlayedTime},ymd日付: ${dateData.ymdDate}, ymdhmsm日付: ${dateData.ymdhmsmDate}`);
    }
    catch (error) {
        console.error("エラー:", error);
        res.status(500).json({ error: "エラーが発生しました" });
    }
};
exports.handleAnalyticsPost = handleAnalyticsPost;
