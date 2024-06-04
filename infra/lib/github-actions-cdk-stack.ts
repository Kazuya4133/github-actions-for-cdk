import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import { CfnOIDCProvider } from 'aws-cdk-lib/aws-iam';

export class GithubActionsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const idProvider = new CfnOIDCProvider(this, 'MyOIDCProvider', {
      url: 'https://token.actions.githubusercontent.com',
      clientIdList: ['sts.amazonaws.com'],
      thumbprintList: ['0123456789012345678901234567890123456789'],
    });
    const githubActionsRole = new iam.Role(this, 'GitHubActionsRole', {
      roleName: `GitHubActionsRole`,
      maxSessionDuration: cdk.Duration.hours(2),
      assumedBy: new iam.WebIdentityPrincipal(idProvider.attrArn, {
        StringEquals: {
          ['token.actions.githubusercontent.com:aud']: 'sts.amazonaws.com',
        },
        StringLike: {
          ['token.actions.githubusercontent.com:sub']: 'repo:Kazuya4133/github-actions-for-cdk:*',
        },
      }),
    });
    githubActionsRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'));
  }
}
