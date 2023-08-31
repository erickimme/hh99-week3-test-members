import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

// MongoDB 연결 함수입니다.
const connect = () => {
    mongoose
        .connect(
            `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.2f3ytju.mongodb.net/?retryWrites=true&w=majority`,
            {
                dbName: 'members_db', //members_db를 데이터베이스명으로 사용합니다.
            },
        )
        .then(() => console.log("MongoDB 연결에 성공하였습니다."))
        .catch((err) => console.log(`MongoDB 연결에 실패하였습니다. ${err}`));
};

// MongoDB 연결에 실패하였을 때, 에러를 기록합니다.
mongoose.connection.on("error", (err) => {
    console.error("MongoDB 연결 에러", err);
});

export default connect;