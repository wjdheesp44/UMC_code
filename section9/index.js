
// const result = [];

// fetch("https://jsonplaceholder.typicode.com/users")
// .then(response => response.json())
// .then(data => data.map(item => result.push(item)))  // 이름만 넣고 싶으면 result.push(item.name)
// .catch(error => console.log(error))


// console.log(result)


// result는 빈배열, 그 안에 또 배열 들어감
//[[{user1}, {user2}]] => [{user1}, {user2}] 이렇게 바꾸고 싶음
// 따라서 data 배열을 한꺼번에 result에 넣지 않고 result.map해줌   result.push(data) -> data.map(item => result.push(item))


// const dataFetch = async() => {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users")  // await을 안 쓰면 fetch가 pormise가 들어감(콘솔에 promise 찍힘)
//     const data = await response.json();

//     return data
// }

// const dataResult = dataFetch();


axios.get("https://jsonplaceholder.typicode.com/users")
.then(response => console.log(response.data))     // 자동적으로 json형식으로 변환 가능

// 변수에 저장

const dataFetch = async() => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users").data;  // await을 안 쓰면 fetch가 pormise가 들어감(콘솔에 promise 찍힘)

    return response
}

const dataResult = dataFetch();

console.log(dataResult)

