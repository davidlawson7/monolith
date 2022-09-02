import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { aws_s3 as s3, RemovalPolicy } from 'aws-cdk-lib';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as path from 'path';

export class IBSStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Management bucket
    const managerBucket = new s3.Bucket(this, 'IbsManagerBucket', {
      versioned: true,
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY, // NOT recommended for production code
      autoDeleteObjects: true,
      websiteIndexDocument: 'index.html',
    });

    // CDN bucket
    const filesBucket = new s3.Bucket(this, 'IbsFilesBucket', {
      versioned: true,
    });

    // Upload Lambda service
    const uploadService = new lambda.Function(this, 'UploadService', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset(
        path.join(__dirname, '../../../dist/apps/uploader-service')
      ),
      handler: 'main.handler',
      environment: {
        UPLOAD_BUCKET: 'IbsFilesBucket',
      },
    });

    // Deployments
    new s3deploy.BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [s3deploy.Source.asset('../../dist/apps/ibs-cmi')],
      destinationBucket: managerBucket,
    });
  }
}
