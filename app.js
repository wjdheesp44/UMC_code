const express = require('express')
const app = express()       // app이 express를 사용한다
const port = 5500   // localhost에 찍히는 번호, port 번호에 따라 여러 앱을 한꺼번에 실행시킬 수 있음

app.use(express.json());

const users = [
  {
    id: 1,
    name: "james",
    username: "joker",
    email: "james101@gmail.com",
    phonenumber: "123-456-7979",
  },
  {
    id: 2,
    name: "christine",
    username: "crystal",
    email: "christine101@gmail.com",
    phonenumber: "453-326-1299",
  },
  {
    id: 3,
    name: "jammie",
    username: "jam",
    email: "jammie101@gmail.com",
    phonenumber: "963-332-3719",
  },
];

app.get("/", (req, res) => { // '/' -> 주소 '/'는 홈
  res.send("Welcome!!")  // 
})

app.get("/users", (req, res) => { // '/users' 주소
    res.json(users)  // users 배열 넣어줌, json 형식으로 
})


// 아이디에 해당하는 유저를 배열에서 골라서 보내줌 -> find 메소드 씀
app.get("/users/:userId", (req, res) => { // 동적으로 입력되는 주소는 앞에 :을 붙임
    const user = users.find((user) => user.id === parseInt(req.params.userId));   

    if (!user) {    // 해당하는 유저 아이디가 없으면 false, !로 false를 true로 바꿈
        res.status(404).send('요청한 userId를 찾을 수 없습니다')
    }

    res.status(200).json(user); // 상태 코드
})

app.post("/users", (req,res) => {
    const newUser = req.body;    // req.body로 받아온 것을 newUser에 받아옴
    
    if (Object.keys(newUser).length === 0) {
      res.status(400).send('user에 관한 정보를 입력해주세요')
    } else if (Object.keys(newUser).length < 4) {
      res.status(400).send('user를 추가하기 위해 필요한 정보를 모두 입력해주세요')  
    } else {
      users.push({
        id : users[users.length-1].id + 1,  // 동적으로 생산, 
        ...newUser // 안에 있는 내용물을 하나하나 복사해서 새로운 객체 안에 집어넣음
    });
    }

  

    res.json(users)     // users에 잘 추가되었는지 확인, 원래는 새로 추가한 유저만 보내주는 것이 좋음

    
})

app.put("/users/:userId", (req, res) => {
  const id = users.findIndex(user => user.id === parseInt(req.params.userId))
  
  if (id === -1){
    res.status(404).send('요청한 id를 찾을 수 없습니다.');
  }

  users[id] = {
    ...users[id],
    ...req.body
  }

  res.status(200).json(users);
})

app.delete("/users/:userId", (req, res) => {
  const id = users.findIndex(
    user => user.id === parseInt(req.params.userId))
  
  if (id === -1){
    res.status(404).send('요청한 id를 찾을 수 없습니다.');
  }
  
  users.splice(id, 1);

  res.status(200).json(users);

})



app.listen(port, () => {
  console.log(`서버 실행중...`)
})