import { Context } from 'aws-lambda';
import * as AWS from 'aws-sdk';

AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3();

// Change this value to adjust the signed URL's expiration
const URL_EXPIRATION_SECONDS = 300;

// Main Lambda entry point
exports.handler = async (event, context: Context) => {
  return await getUploadURL(event, context);
};

const getUploadURL = async function (event, context: Context) {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);

  const randomID = parseInt(`${Math.random() * 10000000}`);
  const Key = `${randomID}.jpg`;

  // Get signed URL from S3
  const s3Params = {
    Bucket: process.env.UPLOAD_BUCKET,
    Key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: 'image/jpeg',

    // This ACL makes the uploaded object publicly readable. You must also uncomment
    // the extra permission for the Lambda function in the SAM template.

    // ACL: 'public-read'
  };

  console.log('Params: ', s3Params);
  const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);

  return JSON.stringify({
    uploadURL: uploadURL,
    Key,
  });
};
