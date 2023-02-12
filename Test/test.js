import { GithubProvider } from 'github-repository-provider';

const config = GithubProvider.optionsFromEnvironment(process.env);
const provider = new GithubProvider(config);
const repository = await provider.repository(`myuser/repo1`);

for async (const entry of repository.entries('\*_/_.md')) {
  console.log(entry.name);
}
