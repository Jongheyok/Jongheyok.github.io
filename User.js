const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  // 추가 필드를 여기에 정의할 수 있습니다.
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
