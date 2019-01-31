const mongoose = require('../database');

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

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
