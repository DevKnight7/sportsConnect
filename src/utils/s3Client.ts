import S3 from 'react-aws-s3-typescript';


const config = {
    bucketName: process.env.REACT_APP_bucketName || '',
    dirName: process.env.REACT_APP_dirName || '', /* optional */
    region: process.env.REACT_APP_region || '',
    accessKeyId: process.env.REACT_APP_bucketAccessKeyId || '',
    secretAccessKey: process.env.REACT_APP_bucketSecretAccessKey || ''
    // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
}

const ReactS3Client = new S3(config);

export default ReactS3Client;