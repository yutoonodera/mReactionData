import { Request, Response } from "express";
import { DisplayRequestData } from "../models/DisplayRequestData";
import { Profile } from "../models/Profile";
import Redis from "ioredis";

// var Redis = require("ioredis");
const port = 3000;

const redisPort = 6379;
// const redis = new Redis(redisPort, "127.0.0.1"); //production
const redis = new Redis(redisPort, "redis"); //local

export const handleAnalyticsPost = (req: Request, res: Response) => {
  try {
    // リクエストデータを受け取る
    const requestBody = req.body;
    const displayRequest = new DisplayRequestData();
    const hashedIp = displayRequest.hashIpAddress(req.ip as string);
    const dateData = displayRequest.getTimestamp();

    //TODO requestBody.pathになっているが、ドメインで判断する。yahoo.co.jpが登録済みならyahoo.co.jp/aaa/もOKとする

    //1.redisにpathが存在するかをチェックする
    //2.1.1がYesの場合、redisの日付を見て、１日以上経過していたらprofile.jsonにデータをとりに行く、pathがprofile.jsonにあればredisのpathデータを削除後に本日日付で登録する、なければそこで処理を終了する
    //2.2 Noの場合,profile.jsonにデータをとりに行き、pathがprofile.jsonにあればredisのpathデータを本日日付で登録する、なければそこで処理を終了する
    //2.1　もしくは2.2で前者の場合はrequestDataをredisに登録する
    console.log('パス名'+requestBody.path)
    console.log("ホスト名"+requestBody.hostname);
    if(!new Profile().containsDomain(requestBody.hostname)){
      return false;
    }
    console.log("ホスト名"+requestBody.hostname);
    redis.get(requestBody.hostname, (err, redisResult: any) => {
      if(redisResult !== null && new Date(redisResult) < new Date()|| redisResult === null){
        redis.set(requestBody.hostname,dateData.ymdDate), (err:any) => {
          if (err) {
            console.error("Redis エラー:", err);
            res.status(500).json({ error: "Redis エラーが発生しました" });
            return false;
          }
        }
      }
      const postData = `アクション: ${requestBody.action},ホスト名: ${requestBody.hostname},パス: ${requestBody.path}, Hash化したIP: ${hashedIp}, テキスト: ${requestBody.text},ボタンテキスト: ${requestBody.buttonText},リンクテキスト: ${requestBody.linkText},
      リンクURL: ${requestBody.linkUrl},セレクトボックス：${requestBody.selectBoxName},セレクトボックスID：${requestBody.selectBoxNameId},
      ラジオボタン名：${requestBody.radioButtonName},ラジオボタンラベル名: ${requestBody.labelText},動画再生時間（秒）:${requestBody.videoPlayedTime},ymd日付: ${dateData.ymdDate}, ymdhmsm日付: ${dateData.ymdhmsmDate}`;
      redis.set(hashedIp+'_'+dateData.ymdhmsmDate, postData);
    });
    // redis.get(requestBody.path, (err, redisResult: any) => {
    //   if (err) {
    //     // Redis 操作中にエラーが発生した場合の処理
    //     console.error("Redis エラー:", err);
    //   } else if (redisResult !== null) {
    //     const postData = `アクション: ${requestBody.action},パス: ${requestBody.path}, Hash化したIP: ${hashedIp}, テキスト: ${requestBody.text},ボタンテキスト: ${requestBody.buttonText},リンクテキスト: ${requestBody.linkText},
    //     リンクURL: ${requestBody.linkUrl},セレクトボックス：${requestBody.selectBoxName},セレクトボックスID：${requestBody.selectBoxNameId},
    //     ラジオボタン名：${requestBody.radioButtonName},ラジオボタンラベル名: ${requestBody.labelText},動画再生時間（秒）:${requestBody.videoPlayedTime},ymd日付: ${dateData.ymdDate}, ymdhmsm日付: ${dateData.ymdhmsmDate}`;

    //     redis.set(hashedIp+'_'+dateData.ymdhmsmDate, postData, (err, reply) => {
    //       if (err) {
    //         console.error("Redis エラー:", err);
    //         res.status(500).json({ error: "Redis エラーが発生しました" });
    //       } else {
    //         console.log("データが Redis に登録されました");
    //         res.status(200).json({ message: "POSTリクエストを受け取りました" });
    //       }
    //     });
    //   } else {
    //     const permissionUrl = new Profile();
    //     const profileData = permissionUrl.getAllProfileData();
    //     if (profileData) {
    //       const profileKeys = Object.keys(profileData);
    //       // 各プロファイルの domains プロパティをチェック
    //       for (const key of profileKeys) {
    //         const domains = profileData[key].domains;
    //         if (domains.includes(requestBody.path)) {
    //           // Redisからデータを取得
    //           redis.get(requestBody.path, (err, existingData) => {
    //             if (err) {
    //               console.error("Redis エラー:", err);
    //               res.status(500).json({ error: "Redis エラーが発生しました" });
    //             } else {
    //               if (existingData) {
    //                 // 既存のデータが存在する場合の処理
    //                 console.log("既存のデータが Redis に存在します:", existingData);
    //                 res.status(409).json({ error: "既存のデータが存在します" });
    //               } else {
    //                 // 既存のデータが存在しない場合、新しいデータを登録
    //                 redis.set(requestBody.path, dateData.ymdDate, (err, reply) => {
    //                   if (err) {
    //                     console.error("Redis エラー:", err);
    //                     res.status(500).json({ error: "Redis エラーが発生しました" });
    //                   } else {
    //                     console.log("データが Redis に登録されました");
    //                     res.status(200).json({ message: "POSTリクエストを受け取りました" });
    //                   }
    //                 });
    //               }
    //             }
    //           });
    //           return false;
    //         } else {
    //           console.log(`プロファイル ${key} は ${domains} を含みません。`);
    //         }
    //       }
    //     } else {
    //       console.log("ProfileData オブジェクトが存在しません。");
    //     }
    //   }
    // });

    console.log(
      `アクション: ${requestBody.action},ホスト名: ${requestBody.hostname},パス: ${requestBody.path}, Hash化したIP: ${hashedIp}, テキスト: ${requestBody.text},ボタンテキスト: ${requestBody.buttonText},リンクテキスト: ${requestBody.linkText},
       リンクURL: ${requestBody.linkUrl},セレクトボックス：${requestBody.selectBoxName},セレクトボックスID：${requestBody.selectBoxNameId},
       ラジオボタン名：${requestBody.radioButtonName},ラジオボタンラベル名: ${requestBody.labelText},動画再生時間（秒）:${requestBody.videoPlayedTime},ymd日付: ${dateData.ymdDate}, ymdhmsm日付: ${dateData.ymdhmsmDate}`
    );
  } catch (error) {
    console.error("エラー:", error);
    res.status(500).json({ error: "エラーが発生しました" });
  }
};
