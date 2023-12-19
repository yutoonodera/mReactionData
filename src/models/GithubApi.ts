import { Profile } from '../models/Profile';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export class GithubApi {
    constructor(private profile: Profile) {}

    /**
     * Github APIからデータを取得する
     * @returns
     */

    async getGithubData() : Promise<any[]> {
        const profileInfo = this.profile.getAllProfileData();
        const cacheDuration = 24 * 60 * 60 * 1000; // キャッシュの有効期限 (24時間)

        const githubDataArray = [];

        for (const key in profileInfo) {

            if (Object.prototype.hasOwnProperty.call(profileInfo, key)) {
                let githubName = profileInfo[key].githubName;
                let dirPath = path.join(__dirname, '..', 'assets', 'data');
                let cacheFilePath = path.join(dirPath, `${githubName}_github_cache.json`);
                try {
                    let cachedData = null;
                    if (fs.existsSync(cacheFilePath)) {
                        cachedData = JSON.parse(fs.readFileSync(cacheFilePath, 'utf-8'));
                    }
                    if (cachedData && cachedData.timestamp && Date.now() - cachedData.timestamp < cacheDuration) {
                        githubDataArray.push(cachedData);
                    } else {
                        let url = `https://api.github.com/users/${githubName}/repos?sort=pushed_at`;
                        let response = await axios.get(url);

                        console.log('生dataを使用');

                        let dataToCache = {
                            data: response.data,
                            timestamp: Date.now(),
                            key:key,
                            technique:profileInfo[key].technique,
                        };
                        fs.writeFileSync(cacheFilePath, JSON.stringify(dataToCache));
                        //githubDataArray.push(response.data);
                        githubDataArray.push(dataToCache);
                    }
                } catch (error) {
                    // エラーハンドリング
                    console.error('GitHub APIエラー:', error);
                    throw error;
                }
            }
        }
        return githubDataArray;
    }
}