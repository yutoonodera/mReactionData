import request from 'supertest';
const app = require('../../app');

test('特定のURLへのHTTP GETリクエストのレスポンスコードが200であることを確認', async () => {
    // テスト対象のURLを指定
    const url = '/';

    // HTTP GETリクエストを送信し、レスポンスを受け取る
    const response = await request(app).get(url);

    // レスポンスのステータスコードが200であることを確認
    expect(response.status).toBe(200);
});