const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 8080;


// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MongoDB 연결
mongoose.connect('mongodb://localhost:27017/my_database', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB에 연결되었습니다.'))
    .catch(err => console.error('MongoDB 연결 오류:', err));

//사용자 생성 라우트
app.post('/api/users', async (req, res) => {
    try {
        const {username, password, email } = req.body;
        const user = new UserActivation({ username, password, email });
        await user.save ();
        res.status(201).json(user);
    } catch (err) {
        console.error('사용자 생성 오류: ', err);
        res.status(500).json({ message: '사용자 생성 중 오류가 발생했습니다.'});
    }
});

// 기본 라우트
app.get('/', (req, res) => {
  res.send('서버가 정상적으로 실행 중입니다.');
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
