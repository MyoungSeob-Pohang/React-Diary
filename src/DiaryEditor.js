// useRef 는 요소를 선택할 수 있는 주소값을 가진다.
// useState는 상태를 관리할 수 있게 해준다.
// 모두 react에 포함되어 있어서 함께 import
import React, { useRef, useState, useEffect } from 'react';

// DiaryEditor 함수는 전체를 감싸는 함수 이다.
// 파일명과 같으며 함수를 실행한다.
// 데이터조작 함수를 받음
const DiaryEditor = ({ onCreate }) => {
    useEffect(() => {
        console.log('에디터 렌더');
    });

    // 작성자 Ref
    const authorInput = useRef();
    // 컨텐츠(일기내용) Ref
    const contentInput = useRef();

    // 전체 상태관리를 위한 state
    // 객체로 한번에 관리할 수 있다.
    // key : value 값으로 관리하며 value는 초기값에 해당한다.
    const [state, setState] = useState({
        author: '',
        content: '',
        emotion: 1,
    });

    // 이벤트 함수
    // 스프레드로 전체 상태값을 받아오고 선택한 태그의 name값을 가져와서 대괄호 표기법으로 접근해서 값을 변경시킨다.
    // name 값은 useState 의 선언된 key값과 동일함으로 접근 가능하다.
    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    // 클릭이벤트 함수
    // 제목의 길이와 컨텐츠의 길이가 일정글자 수 이하이면 focus를 준다.
    const handleSubmit = (e) => {
        if (state.author.length < 1) {
            authorInput.current.focus();
            return;
        }

        if (state.content.length < 5) {
            contentInput.current.focus();
            return;
        }

        // 전달받은 함수를 호출하여 값을 저장시킴
        onCreate(state.author, state.content, state.emotion);
        alert('저장 성공');
        // 저장 후 초기값 세팅
        setState({
            author: '',
            content: '',
            emotion: 1,
        });
    };

    // 렌더링 되는 html
    // state가 객체로 선언되어 있기 때문에 state.key 로 접근이 가능하다.
    return (
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <div>
                <input ref={authorInput} name="author" value={state.author} onChange={handleChangeState} />
            </div>
            <div>
                <textarea ref={contentInput} name="content" value={state.content} onChange={handleChangeState} />
            </div>
            <div>
                <select name="emotion" value={state.emotion} onChange={handleChangeState}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div>
                <button onClick={handleSubmit}>일기 저장하기</button>
            </div>
        </div>
    );
};

// memo로 묶음
export default React.memo(DiaryEditor);
