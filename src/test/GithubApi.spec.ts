import request from 'supertest';
import { GithubApi } from '../models/GithubApi';
import { Profile } from '../models/Profile';

test('ProfileのgetGithubRepositoryの概要', async () => {
 const githubData = new GithubApi(new Profile);
 //console.log(await githubData.getGithubData());
});