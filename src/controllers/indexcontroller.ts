import { Request, Response } from 'express';

export const handleIndexGet = async (req: Request, res: Response) => {
// GitHubApi クラスをインポート
const { GithubApi } = require('../models/GithubApi');
const { Profile } = require('../models/Profile');
console.log("indexページですよ");
    try {
        // Profile クラスのインスタンスを作成
        const profile = new Profile(/* ここにプロファイルデータを初期化するコードを追加 */);

        // GithubApi クラスのインスタンスを作成
        const githubApi = new GithubApi(profile);

        // Githubデータを取得
        const githubData = await githubApi.getGithubData();
        // デバッグ情報をコンソールに出力
        // レンダリング時に Github データをテンプレートに渡す
        res.render('index', { title: 'movee', githubData });
    } catch (error) {
        // エラーハンドリング
        console.error('エラー:', error);
    }
}