import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';

// Create an AWS Amplify App
const amplifyApp = new aws.amplify.App('myAmplifyApp', {
  name: 'next-trpc-express/front',
  repository: 'https://github.com/dsmurl/your-mono-repo',
  // oauthToken: process.env.GITHUB_OAUTH_TOKEN,
  oauthToken: pulumi.secret('github-repo-access-token'),
  environmentVariables: {
    NODE_ENV: 'dev',
  },
  buildSpec: `version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd packages/front
        - pnpm install
    build:
      commands:
        - pnpm run build
  artifacts:
    baseDirectory: packages/front/out
    files:
      - '**/*'
  cache:
    paths:
      - packages/front/node_modules/**/*`,
});

// Disable auto-deploy on push
const masterBranch = new aws.amplify.Branch('masterBranch', {
  appId: amplifyApp.id,
  branchName: 'master',
  enableAutoBuild: false,
});

// Export the Amplify App ID
export const amplifyAppId = amplifyApp.id;
