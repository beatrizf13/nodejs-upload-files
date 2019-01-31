const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const mongoose = require('../database');

const s3 = new aws.S3();

const PostSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// eslint-disable-next-line func-names
PostSchema.pre('save', function () {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

// eslint-disable-next-line func-names
PostSchema.pre('remove', function () {
  if (process.env.STORAGE_TYPE === 's3') {
    return s3
      .deleteObject({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: this.key,
      })
      .promise();
  }
  return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key));
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
