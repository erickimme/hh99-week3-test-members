import mongoose from "mongoose";

/*
회원정보 DB
- `_id` (Object Id) : 회원 번호 (몽고디비 인덱스)
- `name` (String) : 회원 이름
- `email`
- `ID` (String) : 회원 아이디
- `pw` (String) : 회원 비밀번호 
*/

// 스키마를 정의합니다.
const memberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        ID: {
            type: String,
            required: true,
        },
        pw: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// 스키마를 모델로 변환하여, 내보냅니다.
export default mongoose.model('Member', memberSchema);