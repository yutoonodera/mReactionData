"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayRequestData = void 0;
const crypto = require('crypto');
class DisplayRequestData {
    constructor() {
        // コンストラクタ内で日時を取得
        this.currentDate = new Date();
        // タイムゾーンを日本時間 (JST) に設定
        this.currentDate.setUTCHours(this.currentDate.getUTCHours() + 9);
    }
    hashIpAddress(ipAddress) {
        const hash = crypto.createHash('sha256'); // ハッシュ関数を選択
        hash.update(ipAddress);
        return hash.digest('hex'); // ハッシュ化されたIPアドレスを16進数文字列として取得
    }
    getTimestamp() {
        // //日時取得のところ、このjs内で外だしする
        // const currentDate = new Date();
        // 年月日時分秒ミリ秒を取得
        const year = this.currentDate.getFullYear().toString();
        const month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = this.currentDate.getDate().toString().padStart(2, '0');
        const hours = this.currentDate.getHours().toString().padStart(2, '0');
        const minutes = this.currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = this.currentDate.getSeconds().toString().padStart(2, '0');
        const milliseconds = this.currentDate.getMilliseconds().toString().padStart(3, '0');
        // 指定されたフォーマットで組み合わせて表示
        const ymdhmsmDate = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
        const ymdDate = `${year}/${month}/${day}`;
        return { ymdhmsmDate, ymdDate };
    }
}
exports.DisplayRequestData = DisplayRequestData;
