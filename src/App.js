import { useRef, useState } from 'react/cjs/react.development';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
    // DiaryEditor에서 setData를 사용하여 조작할 수 있는 함수를 props로 넘기고
    // DiaryList에서는 data그대로 넘겨준다.
    // 리액트는 단반향 데이터이고 같은레벨 끼리는 데이터를 전달할 수 없다. 그래서 이벤트를 끌어올리고 데이터는 내려주는 즉 app에서 데이터를 내려주고 조작하는것을 하면 app 아래 같은 레벨끼리 데이터 송수신이 가능하다.

    // 새로운 상태변화 배열 선언
    const [data, setData] = useState([]);
    // useRef를 사용하여 1씩증가하는 값을 만듬
    const dataId = useRef(0);

    // 작성자 내용 감정을 전달받아 새로운 객체로 만들어서 setData를 조작
    const onCreate = (author, content, emotion) => {
        const create_date = new Date().getTime();

        const newItem = {
            author,
            content,
            emotion,
            create_date,
            id: dataId.current,
        };
        dataId.current += 1;
        setData([newItem, ...data]);
    };

    const onDelete = (targetId) => {
        const newDiaryList = data.filter((it) => it.id !== targetId);
        setData(newDiaryList);
    };

    return (
        <div className="App">
            {/* 조작 함수를 내려 줌 */}
            <DiaryEditor onCreate={onCreate} />
            {/* 데이터만 내려 줌 */}
            <DiaryList onDelete={onDelete} diaryList={data} />
        </div>
    );
}

export default App;
