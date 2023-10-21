"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Profile_1 = require("../models/Profile");
test('ProfileのgetGithubNameが取得できること', () => {
    const profile = new Profile_1.Profile();
    const profileAllData = profile.getAllProfileData();
    const onodyData = profileAllData && profileAllData.onody;
    expect(onodyData && onodyData.githubName).toBe('yutoonodera');
    const halfData = profileAllData && profileAllData.half;
    expect(halfData && halfData.githubName).toBe('halfempty');
});
test('ProfileのgetGithubNameが複数取得できること', () => {
    const profile = new Profile_1.Profile();
    const profileAllData = profile.getAllProfileData();
    if (profileAllData) {
        for (const key in profileAllData) {
            if (Object.prototype.hasOwnProperty.call(profileAllData, key)) {
                const githubName = profileAllData[key].githubName;
                expect(['yutoonodera', 'halfempty']).toContain(githubName);
            }
        }
    }
    else {
        console.log('profileInfo が存在しません。');
    }
});
