import React, { useEffect, useState } from "react";
import axios from "axios"; // axios import 합니다.

const App = () => {
    // 새롭게 생성하는 todo를 관리하는 state
    const [todo, setTodo] = useState({
        title: "",
    });
    const [todos, setTodos] = useState(null); //fetching해오는 data를 넣는 곳.

    // axios를 통해서 get 요청을 하는 함수를 생성합니다.
    // 비동기처리를 해야하므로 async/await 구문을 통해서 처리합니다.
    const fetchTodos = async () => {
        const { data } = await axios.get("http://localhost:3004/todos");
        setTodos(data); // 서버로부터 fetching한 데이터를 useState의 state로 set 합니다.
    };
    // console.log(axios.get("http://localhost:3004/todos")); // 이 안에 data가 있군.

    const onSubmitHandler = (todo) => {
        axios.post("http://localhost:3004/todos", todo);
    };

    const onClickDeleteButtonHandler = (todoId) => {
        axios.delete(`http://localhost:3004/todos/${todoId}`);
    };

    // 생성한 함수를 컴포넌트가 mount 됐을 떄 실행하기 위해 useEffect를 사용합니다.
    useEffect(() => {
        // effect 구문에 생성한 함수를 넣어 실행합니다.
        fetchTodos();
    }, []); //[todos]를 넣으면 db에 추가될 때 바로 바로 fetchTodos함수 발현.

    // data fetching이 정상적으로 되었는지 콘솔을 통해 확인합니다.
    // console.log(todos); // App.js:16
    return (
        <>
            <form
                onSubmit={(e) => {
                    // 👇 submit했을 때 브라우저의 새로고침을 방지합니다.
                    e.preventDefault();
                    onSubmitHandler(todo);
                }}
            >
                <input
                    type="text"
                    onChange={(ev) => {
                        const { value } = ev.target;
                        setTodo({
                            ...todo,
                            title: value,
                        });
                    }}
                />
                <button>추가하기</button>
            </form>
            <div>
                {todos?.map((todo) => (
                    <div key={todo.id}>
                        {todo.title}
                        {/*  디자인이 요상하긴 하지만..! 삭제 버튼 추가 */}
                        <button
                            type="button"
                            onClick={() => onClickDeleteButtonHandler(todo.id)}
                        >
                            삭제하기
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default App;
