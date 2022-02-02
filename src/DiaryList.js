import DiaryItem from './DiaryItem';

const DiaryList = ({ diaryList }) => {
    console.log(diaryList);
    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {/* 아이디가 없으면 it뒤 두번쨰 인자로 idx를 받아 그대로 키에 사용가능하다. 하지만 추가하거나 삭제해서 idx가 바뀔 경우 문제가 생길 수 있음.*/}
                {diaryList.map((it) => (
                    <DiaryItem key={it.id} {...it} />
                ))}
            </div>
        </div>
    );
};

// 기본 값 설정
DiaryList.defaultProps = {
    diaryList: [],
};

export default DiaryList;
