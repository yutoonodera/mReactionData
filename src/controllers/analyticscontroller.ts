import { Request, Response } from "express";
import { DisplayRequestData } from "../models/DisplayRequestData";
import { Profile } from "../models/Profile";
import Redis from "ioredis";

// var Redis = require("ioredis");
const port = 3000;

const redisPort = 6379;
const redis = new Redis(redisPort, "redis");

export const handleAnalyticsPost = (req: Request, res: Response) => {
  try {
    // リクエストデータを受け取る
    const requestBody = req.body;
    console.log("requestBodyです"+JSON.stringify(requestBody));
    const displayRequest = new DisplayRequestData();
    const hashedIp = displayRequest.hashIpAddress(req.ip as string);
    const dateData = displayRequest.getTimestamp();
    redis.get(requestBody.path, (err, redisResult: any) => {
      if (err) {
        // Redis 操作中にエラーが発生した場合の処理
        console.error("Redis エラー:", err);
      } else if (redisResult !== null) {

        console.log("true"); // Redis キーが存在する場合は true を出力
        const postData = `アクション: ${requestBody.action},パス: ${requestBody.path}, Hash化したIP: ${hashedIp}, テキスト: ${requestBody.text},ボタンテキスト: ${requestBody.buttonText},リンクテキスト: ${requestBody.linkText},
        リンクURL: ${requestBody.linkUrl},セレクトボックス：${requestBody.selectBoxName},セレクトボックスID：${requestBody.selectBoxNameId},
        ラジオボタン名：${requestBody.radioButtonName},ラジオボタンラベル名: ${requestBody.labelText},動画再生時間（秒）:${requestBody.videoPlayedTime},ymd日付: ${dateData.ymdDate}, ymdhmsm日付: ${dateData.ymdhmsmDate}`;

        redis.set(hashedIp+'_'+dateData.ymdhmsmDate, postData, (err, reply) => {
          if (err) {
            console.error("Redis エラー:", err);
            res.status(500).json({ error: "Redis エラーが発生しました" });
          } else {
            console.log("データが Redis に登録されました");
            res.status(200).json({ message: "POSTリクエストを受け取りました" });
          }
        });
      } else {
        console.log("false");
        const permissionUrl = new Profile();
        console.log(permissionUrl.getAllProfileData());
        // ProfileData チェック
        const profileData = permissionUrl.getAllProfileData();
        if (profileData) {
          // ProfileData オブジェクトが存在する場合の処理
          const profileKeys = Object.keys(profileData);
          // 各プロファイルの domains プロパティをチェック
          for (const key of profileKeys) {
            const domains = profileData[key].domains;
            console.log(`${requestBody.path} が対象パスです。`);
            // "example.com" を含む場合
            if (domains.includes(requestBody.path)) {
              console.log(`プロファイル ${key} は ${domains} を含みます。`);
            // Redisからデータを取得
              redis.get(requestBody.path, (err, existingData) => {
                if (err) {
                  console.error("Redis エラー:", err);
                  res.status(500).json({ error: "Redis エラーが発生しました" });
                } else {
                  if (existingData) {
                    // 既存のデータが存在する場合の処理
                    console.log("既存のデータが Redis に存在します:", existingData);
                    res.status(409).json({ error: "既存のデータが存在します" });
                  } else {
                    // 既存のデータが存在しない場合、新しいデータを登録
                    redis.set(requestBody.path, dateData.ymdDate, (err, reply) => {
                      if (err) {
                        console.error("Redis エラー:", err);
                        res.status(500).json({ error: "Redis エラーが発生しました" });
                      } else {
                        console.log("データが Redis に登録されました");
                        res.status(200).json({ message: "POSTリクエストを受け取りました" });
                      }
                    });
                  }
                }
              });
              return false;
            } else {
              console.log(`プロファイル ${key} は ${domains} を含みません。`);
            }
          }
        } else {
          console.log("ProfileData オブジェクトが存在しません。");
        }
      }
    });

    console.log(
      `アクション: ${requestBody.action},パス: ${requestBody.path}, Hash化したIP: ${hashedIp}, テキスト: ${requestBody.text},ボタンテキスト: ${requestBody.buttonText},リンクテキスト: ${requestBody.linkText},
       リンクURL: ${requestBody.linkUrl},セレクトボックス：${requestBody.selectBoxName},セレクトボックスID：${requestBody.selectBoxNameId},
       ラジオボタン名：${requestBody.radioButtonName},ラジオボタンラベル名: ${requestBody.labelText},動画再生時間（秒）:${requestBody.videoPlayedTime},ymd日付: ${dateData.ymdDate}, ymdhmsm日付: ${dateData.ymdhmsmDate}`
    );
  } catch (error) {
    console.error("エラー:", error);
    res.status(500).json({ error: "エラーが発生しました" });
  }
};
