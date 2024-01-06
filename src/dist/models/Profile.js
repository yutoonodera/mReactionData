"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const profile_json_1 = __importDefault(require("../assets/data/profile.json"));
class Profile {
    // getGithubNameメソッドの型指定
    getAllProfileData() {
        if (typeof profile_json_1.default === "object" && profile_json_1.default !== null) {
            return profile_json_1.default;
        }
        else {
            return undefined;
        }
    }
}
exports.Profile = Profile;
