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
var express = require('express');
var router = express.Router();
const axios = require('axios');
const fs = require('fs');
const cors = require('cors');
// GitHubApi クラスをインポート
const { GithubApi } = require('../models/GithubApi');
const { Profile } = require('../models/Profile');
/* GET home page. */
router.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Profile クラスのインスタンスを作成
            const profile = new Profile( /* ここにプロファイルデータを初期化するコードを追加 */);
            // GithubApi クラスのインスタンスを作成
            const githubApi = new GithubApi(profile);
            // Githubデータを取得
            const githubData = yield githubApi.getGithubData();
            console.log('aaaa');
            // デバッグ情報をコンソールに出力
            console.log('githubData:', githubData);
            // レンダリング時に Github データをテンプレートに渡す
            res.render('index', { title: 'movee', githubData });
        }
        catch (error) {
            // エラーハンドリング
            console.error('エラー:', error);
            next(error);
        }
    });
});
module.exports = router;
