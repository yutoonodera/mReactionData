"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Profile_1 = require("../models/Profile");
test('ProfileのgetGithubNameが複数取得できること', () => {
    const profile = new Profile_1.Profile();
    const profileAllData = profile.getAllProfileData();
    if (profileAllData) {
        for (const key in profileAllData) {
            if (Object.prototype.hasOwnProperty.call(profileAllData, key)) {
                const githubName = profileAllData[key].githubName;
                expect(['yutoonodera', 'teamsasaki']).toContain(githubName);
            }
        }
    }
    else {
        console.log('profileInfo が存在しません。');
    }
});
