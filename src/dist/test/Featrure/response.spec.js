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
const supertest_1 = __importDefault(require("supertest"));
const app = require('../../app');
test('特定のURLへのHTTP GETリクエストのレスポンスコードが200であることを確認', () => __awaiter(void 0, void 0, void 0, function* () {
    // テスト対象のURLを指定
    const url = '/';
    // HTTP GETリクエストを送信し、レスポンスを受け取る
    const response = yield (0, supertest_1.default)(app).get(url);
    // レスポンスのステータスコードが200であることを確認
    expect(response.status).toBe(200);
}));
