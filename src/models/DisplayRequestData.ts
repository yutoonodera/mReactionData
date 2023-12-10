const crypto = require('crypto');

export class DisplayRequestData{

    public hashIpAddress(ipAddress:string) {
        const hash = crypto.createHash('sha256'); // ハッシュ関数を選択
        hash.update(ipAddress);
        return hash.digest('hex'); // ハッシュ化されたIPアドレスを16進数文字列として取得
    }
}