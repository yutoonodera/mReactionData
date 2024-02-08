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
const handleAnalyticsPost = (req, res) => {
    try {
        // リクエストデータを受け取る
        const requestBody = req.body;
        const displayRequest = new DisplayRequestData_1.DisplayRequestData();
        const hashedIp = displayRequest.hashIpAddress(req.ip);
        const dateData = displayRequest.getTimestamp();
        //TODO requestBody.pathになっているが、ドメインで判断する。yahoo.co.jpが登録済みならyahoo.co.jp/aaa/もOKとする
        //1.redisにpathが存在するかをチェックする
        //2.1.1がYesの場合、redisの日付を見て、１日以上経過していたらprofile.jsonにデータをとりに行く、pathがprofile.jsonにあればredisのpathデータを削除後に本日日付で登録する、なければそこで処理を終了する
        //2.2 Noの場合,profile.jsonにデータをとりに行き、pathがprofile.jsonにあればredisのpathデータを本日日付で登録する、なければそこで処理を終了する
        //2.1　もしくは2.2で前者の場合はrequestDataをredisに登録する
        console.log('パス名' + requestBody.path);
        console.log("ホスト名" + requestBody.hostname);
        if (!new Profile_1.Profile().containsDomain(requestBody.hostname)) {
            return false;
        }
        console.log("ホスト名" + requestBody.hostname);
        redis.get(requestBody.hostname, (err, redisResult) => {
            if (redisResult !== null && new Date(redisResult) < new Date() || redisResult === null) {
                redis.set(requestBody.hostname, dateData.ymdDate), (err) => {
                    if (err) {
                        console.error("Redis エラー:", err);
                        res.status(500).json({ error: "Redis エラーが発生しました" });
                        return false;
                    }
                };
            }
            const postData = `Hash化したIP: ${hashedIp}, テキスト: ${requestBody.text},ボタンテキスト: ${requestBody.buttonText},リンクテキスト: ${requestBody.linkText},
      リンクURL: ${requestBody.linkUrl},セレクトボックス：${requestBody.selectBoxName},セレクトボックスID：${requestBody.selectBoxNameId},
      ラジオボタン名：${requestBody.radioButtonName},ラジオボタンラベル名: ${requestBody.labelText},動画再生時間（秒）:${requestBody.videoPlayedTime}`;
            redis.set(requestBody.hostname + '_' + requestBody.path + '_' + requestBody.action + '_' + hashedIp + '((' + dateData.ymdhmsmDate + '))', postData);
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
