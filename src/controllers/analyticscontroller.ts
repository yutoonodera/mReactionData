import { Request, Response } from 'express';
import { DisplayRequestData } from '../models/DisplayRequestData';


export const handleAnalyticsPost = (req: Request, res: Response) => {
  try {
    // リクエストデータを受け取る
    const requestBody = req.body;
    const displayRequest = new DisplayRequestData();
    const hashedIp = displayRequest.hashIpAddress(req.ip as string);
    const dateData = displayRequest.getTimestamp();
    console.log(`アクション: ${requestBody.action},text: ${requestBody.text},buttonText: ${requestBody.buttonText},linkText: ${requestBody.linkText}, linkUrl: ${requestBody.linkUrl},モデル化したHashed IP: ${hashedIp}, パス: ${requestBody.path}, ymdDate: ${dateData.ymdDate}, ymdhmsmDate: ${dateData.ymdhmsmDate}`);

    // レスポンスを返す
    res.status(200).json({ message: 'POSTリクエストを受け取りました' });
  } catch (error) {
    console.error('エラー:', error);
    res.status(500).json({ error: 'エラーが発生しました' });
  }
};