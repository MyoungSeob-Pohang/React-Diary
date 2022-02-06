import React, { useRef, useEffect, useMemo, useCallback, useReducer } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const reducer = (state, action) => {
    switch (action.type) {
        case 'init': {
            return action.data;
        }
        case 'create': {
            const create_date = new Date().getTime();
            const newItem = {
                ...action.data,
                create_date,
            };
            return [newItem, ...state];
        }
        case 'remove': {
            return state.filter((it) => it.id !== action.targetId);
        }
        case 'edit': {
            return state.map((it) => (it.id === action.targetId ? { ...it, content: action.newContent } : it));
        }
        default:
            return state;
    }
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
    // DiaryEditor에서 setData를 사용하여 조작할 수 있는 함수를 props로 넘기고
    // DiaryList에서는 data그대로 넘겨준다.
    // 리액트는 단반향 데이터이고 같은레벨 끼리는 데이터를 전달할 수 없다. 그래서 이벤트를 끌어올리고 데이터는 내려주는 즉 app에서 데이터를 내려주고 조작하는것을 하면 app 아래 같은 레벨끼리 데이터 송수신이 가능하다.

    // 새로운 상태변화 배열 선언
    // const [data, setData] = useState([]);
    // state에서 useReducer로 업그레이드
    const [data, dispatch] = useReducer(reducer, []);

    // useRef를 사용하여 1씩증가하는 값을 만듬
    const dataId = useRef(0);

    // API 호출 함수
    const getData = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());

        // 20개 잘라내기
        const initData = res.slice(0, 20).map((it) => {
            return {
                author: it.email,
                content: it.body,
                emotion: Math.floor(Math.random() * 5) + 1,
                create_date: new Date().getTime(),
                id: dataId.current++,
            };
        });

        dispatch({ type: 'init', data: initData });
    };

    // Mount 시점에 API 호출
    useEffect(() => {
        getData();
    }, []);

    // 작성자 내용 감정을 전달받아 새로운 객체로 만들어서 setData를 조작
    const onCreate = useCallback((author, content, emotion) => {
        dispatch({ type: 'create', data: { author, content, emotion, id: dataId.current } });
        dataId.current += 1;
    }, []);

    // 삭제 기능
    const onRemove = useCallback((targetId) => {
        dispatch({ type: 'remove', targetId });
    }, []);

    // 수정기능
    const onEdit = useCallback((targetId, newContent) => {
        dispatch({ type: 'edit', targetId, newContent });
    }, []);

    const getDiaryAnalysis = useMemo(() => {
        const goodCount = data.filter((it) => it.emotion >= 3).length;
        const badCount = data.length - goodCount;
        const goodRatio = (goodCount / data.length) * 100;
        return { goodCount, badCount, goodRatio };
    }, [data.length]);

    const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

    const memoizedDispatches = useMemo(() => {
        return { onCreate, onRemove, onEdit };
    }, []);

    return (
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider value={memoizedDispatches}>
                <div className="App">
                    <DiaryEditor />

                    <div>전체 일기 : {data.length} 개</div>
                    <div>좋은 일기 : {goodCount} 개</div>
                    <div>나쁜 일기 : {badCount} 개</div>
                    <div>좋은 일기 비율 : {goodRatio}% </div>

                    <DiaryList />
                </div>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
}

export default App;
