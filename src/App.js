import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList = [
    {
        id: 1,
        author: 'moonsbi',
        content: 'Hello World! - 1',
        emotion: 1,
        create_date: new Date().getTime(),
    },
    {
        id: 2,
        author: '홍길동',
        content: 'Hello World! - 2',
        emotion: 2,
        create_date: new Date().getTime(),
    },
    {
        id: 3,
        author: '뮨스비',
        content: 'Hello World! - 3',
        emotion: 3,
        create_date: new Date().getTime(),
    },
];

const App = () => {
    return (
        <div className="App">
            <DiaryEditor />
            <DiaryList diaryList={dummyList} />
        </div>
    );
};

export default App;
