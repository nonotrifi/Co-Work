import { config as configAWS, S3 } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

class S3Util {
  s3: S3;
  constructor() {
    configAWS.update({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_KEY!,
      },
      region: process.env.AWS_REGION,
    });
    this.s3 = new S3();
  }
  upload = async (file: Express.Multer.File) => {
    console.log("uploading image S3");

    const path = file.path;
    console.log("path S3: " + path);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: uuidv4() + "." + file.mimetype.split("/")[1],
      Body: fs.readFileSync(path),
      ContentType: file.mimetype,
    };
    const data = await this.s3.upload(params).promise();
    console.log("data uploaded S3", data);

    return data;
  };
  get = async (key: string) => {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    };
    const imageUrl = await this.s3.getSignedUrl("getObject", params);
    return imageUrl;
  };
  delete = async (key: string) => {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    };
    const data = await this.s3.deleteObject(params).promise();
    return data;
  };
}

export default S3Util;
