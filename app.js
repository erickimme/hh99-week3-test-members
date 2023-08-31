import express from "express";
import connect from "./schemas/index.js";
import { membersRouter } from "./routes/index.js";

const app = express();
const PORT = 3000;
connect();

// Express에서 req.body에 접근하여 body 데이터를 사용할 수 있도록 설정합니다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

// Router 미들웨어 설정
app.use("/", [router, membersRouter]);

// 서버 에러 처리 미들웨어
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Server Error");
});

// 404 처리 미들웨어
app.use((req, res, next) => {
    res.status(404).send("Not Found");
});

app.listen(PORT, () => {            // 서버가 실행되면 콘솔창에 포트번호 출력
    console.log(`Server listening on port ${PORT}`);
});  