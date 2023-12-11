import { Request, Response } from 'express';
import { DisplayRequestData } from '../models/DisplayRequestData';


export const handleAnalyticsPost = (req: Request, res: Response) => {
  try {
    // リクエストデータを受け取る
    const requestBody = req.body;
    const requestReferer = req.headers.referer || req.headers.referrer;
    console.log("requestBody::"+JSON.stringify(requestBody));
    const displayRequest = new DisplayRequestData();
    const hashedIp = displayRequest.hashIpAddress(req.ip as string);
    console.log(`モデル化したHashed IP: ${hashedIp}`);
    if (requestReferer) {
      console.log('Referer:', requestReferer);
    } else {
      console.log('Referer information not available.');
    }

    // レスポンスを返す
    res.status(200).json({ message: 'POSTリクエストを受け取りました' });
  } catch (error) {
    console.error('エラー:', error);
    res.status(500).json({ error: 'エラーが発生しました' });
  }
};