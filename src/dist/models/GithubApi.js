"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubApi = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class GithubApi {
    constructor(profile) {
        this.profile = profile;
    }
    /**
     * Github APIからデータを取得する
     * @returns
     */
    //見通しが悪いのでキャッシュの有効期限チェックを外出しにする
    //見通しが悪いのでファイル存在チェックを外出しにする
    //見通しが悪いのでgetGithubRepositoryにしてfunctionを外出しする
    //エラーコード用のテストを書いてcatch(error)でコードに応じたメッセージを分ける
    getGithubData() {
        return __awaiter(this, void 0, void 0, function* () {
            const profileInfo = this.profile.getAllProfileData();
            const cacheDuration = 24 * 60 * 60 * 1000; // キャッシュの有効期限 (24時間)
            const githubDataArray = [];
            for (const key in profileInfo) {
                console.log('key:' + key);
                if (Object.prototype.hasOwnProperty.call(profileInfo, key)) {
                    let githubName = profileInfo[key].githubName;
                    let dirPath = path_1.default.join(__dirname, '..', 'assets', 'data');
                    let cacheFilePath = path_1.default.join(dirPath, `${githubName}_github_cache.json`);
                    try {
                        let cachedData = null;
                        if (fs_1.default.existsSync(cacheFilePath)) {
                            cachedData = JSON.parse(fs_1.default.readFileSync(cacheFilePath, 'utf-8'));
                        }
                        if (cachedData && cachedData.timestamp && Date.now() - cachedData.timestamp < cacheDuration) {
                            //githubDataArray.push(cachedData.data);
                            githubDataArray.push(cachedData);
                        }
                        else {
                            console.log('5:');
                            let url = `https://api.github.com/users/${githubName}/repos?sort=pushed_at`;
                            let response = yield axios_1.default.get(url);
                            console.log('生dataを使用');
                            let dataToCache = {
                                data: response.data,
                                timestamp: Date.now(),
                                key: key,
                                technique: profileInfo[key].technique,
                            };
                            fs_1.default.writeFileSync(cacheFilePath, JSON.stringify(dataToCache));
                            //githubDataArray.push(response.data);
                            githubDataArray.push(dataToCache);
                        }
                        console.log('6:');
                    }
                    catch (error) {
                        console.log('7:');
                        // エラーハンドリング
                        console.error('GitHub APIエラー:', error);
                        throw error;
                    }
                }
            }
            return githubDataArray;
        });
    }
}
exports.GithubApi = GithubApi;
