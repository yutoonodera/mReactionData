"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayRequestData = void 0;
const crypto = require('crypto');
class DisplayRequestData {
    hashIpAddress(ipAddress) {
        const hash = crypto.createHash('sha256'); // ハッシュ関数を選択
        hash.update(ipAddress);
        return hash.digest('hex'); // ハッシュ化されたIPアドレスを16進数文字列として取得
    }
}
exports.DisplayRequestData = DisplayRequestData;
