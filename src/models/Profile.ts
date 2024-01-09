type ProfileData = {
  // すべてのキーが string であり、値が { githubName: string } であることを指定
  [key: string]: { domains: string };
};

import profileData from "../assets/data/profile.json";

export class Profile {
  // getGithubNameメソッドの型指定
  public getAllProfileData(): ProfileData | undefined {
    if (typeof profileData === "object" && profileData !== null) {
      return profileData as ProfileData;
    } else {
      return undefined;
    }
  }
  public containsDomain(domainToFind: string): boolean {
    const profileData = this.getAllProfileData();
    if (profileData) {
      const profiles = Object.values(profileData);
      return profiles.some(profile => profile.domains === domainToFind);
    }
    return false;
  }
}
