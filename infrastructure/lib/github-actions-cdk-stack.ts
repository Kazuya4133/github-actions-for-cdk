import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { RemovalPolicy } from 'aws-cdk-lib';

export class GithubActionsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda Layerの作成
    const lambdaLayer = new lambda.LayerVersion(this, 'MyLayer', {
      code: lambda.Code.fromAsset('../lambda/lambda-layer/layer.zip'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_20_X],
    });

    // Lambda関数の作成
    const myFunction = new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('../lambda/src/Test-JSC-lambda01'),
      handler: 'index.handler',
      layers: [lambdaLayer],
    });


    // const idProvider = new CfnOIDCProvider(this, 'MyOIDCProvider', {
    //   url: 'https://token.actions.githubusercontent.com',
    //   clientIdList: ['sts.amazonaws.com'],
    //   thumbprintList: ['0123456789012345678901234567890123456789'],
    // });
    //   const githubActionsRole = new iam.Role(this, 'GitHubActionsRole', {
    //     roleName: `GitHubActionsRole`,
    //     maxSessionDuration: cdk.Duration.hours(2),
    //     assumedBy: new iam.WebIdentityPrincipal(idProvider.attrArn, {
    //       StringEquals: {
    //         ['token.actions.githubusercontent.com:aud']: 'sts.amazonaws.com',
    //       },
    //       StringLike: {
    //         ['token.actions.githubusercontent.com:sub']: 'repo:Kazuya4133/github-actions-for-cdk:*',
    //       },
    //     }),
    //   });
    //   githubActionsRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'));
  }
}
