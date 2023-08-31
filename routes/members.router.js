import express from "express";
import Member from "../schemas/members.schemas.js";

const router = express.Router();

/*
전체 구현 요구사항
1. 회원의 전체 목록을 조회하는 API (GET/user)
Request 예시: 없음
Response 예시: 
[{userId: “572bb8222b288919b68abf5b”,
        name: “윤지용”,
        email: “jyyoon@teamsparta.co”,
        pw: “1234”,
},{userId: “572bb8222b288919b68abf5c”,
        name: “손윤주”,
        email: “yjson@teamsparta.co”,
        pw: “3421”,
}]

2. 한 회원의 `userId`를 주었을때 회원 정보를 조회하는 API (GET/user/:userId)
Request 예시: 없음
Response 예시: 
{userId: “572bb8222b288919b68abf5c”,
        name: “손윤주”,
        email: “yjson@teamsparta.co”,
        pw: “3421”,
}

채점 기준
1. “result”:{답}의 형태로 감싸서 리턴하지 마세요. API 명세서대로 리턴해주세요.
2.  조회에 사용되는 HTTP Method는 모두 GET이다. 응답 코드는 모두 200이다.
3.  http만 사용한다. https를 사용하지 않는다.
4. 반환되는 본문의 형식은 모두 JSON이다.
    1. 회원 전체 조회는 JSON Object 배열의 반환이다. 즉, [user, user, user]와 같다. { users: [user, user, …]}등은 허용되지 않는다.
        1. 배열의 모든 요소는 회원 정보이다. 각 회원정보는 중괄호 Key:Value 매핑인 JSON Object이다.
    2. 개인 조회는 JSON Object의 반환이다.
        1. 문제 명시된 필수 요소들을 포함한다.
        2. 필수 요소: User {userId, name, email, pw}
5. 회원 전체는 3명 이상 99명 이하로 DB에 등록되어있어야한다.
6. 회원의 조회는 회원 전체 조회 시 반환된 목록 중 1명을 골라 userId를 획득해 개인 조회한 후, 정보가 일치하는지 검사한다.
    1. 정확히 ‘userId’필드여야 한다. _id, id등으로 지정되어있다면 개인 조회에 사용할 userId가 없으므로 개인조회는 0점으로 처리된다.
*/

// 0 회원 생성
router.post("/user", async (req, res, next) => {
    try {
        let { name, email, ID, pw } = req.body;
        // email에서 @앞의 string을 추출하여 ID로 사용
        ID = email.split("@")[0];
        const member = new Member({ name, email, ID, pw });
        await member.save();
        res.status(200).json({ message: "회원 생성 성공" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error: 회원 성공 실패" });
    }
});


// 1. 회원의 전체 목록을 조회하는 API (GET/user)
router.get("/user", async (req, res, next) => {
    try {
        const members = await Member.find({}).exec();
        // 3명 이상 99명 이하로 DB에 등록되어있어야한다.
        if (members.length < 3 || members.length > 99) {
            res.status(500).json({ message: "멤버 수는 3명 이상, 99명 이하여야 합니다." });
        }
        const memberPrint = members.map((member) => {
            return {
                userId: member._id,
                name: member.name,
                email: member.email,
                pw: member.pw,
            };
        });
        res.status(200).json(memberPrint);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error: 회원 목록 조회 실패" });
    }
});

// 2. 한 회원의 `userId`를 주었을때 회원 정보를 조회하는 API (GET/user/:userId)
router.get("/user/:userId", async (req, res, next) => {
    const { userId } = req.params;
    try {
        const member = await Member.findOne({ _id: userId }).exec();
        const memberPrint = {
            userId: member._id,
            name: member.name,
            email: member.email,
            pw: member.pw,
        };
        res.status(200).json(memberPrint);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error: 회원 조회 실패" });
    }
});

export default router;
