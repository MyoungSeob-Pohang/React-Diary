// 값을 받아 옴, spread로 펼쳐서 넘겨줬으니 하나하나 다 받음
const DiaryItem = ({ onDelete, author, content, emotion, create_date, id }) => {
    return (
        <div className="DiaryItem">
            <div className="info">
                <span>
                    작성자 {author} | 감정점수 : {emotion}
                </span>
                <br />
                {/* toLocaleDateString : 사용문화권에 맞는 시간표기법으로 객체의 시간을 리턴 / 운영체제에 설정된 시간표기법 */}
                <span className="date">{new Date(create_date).toLocaleDateString()}</span>
            </div>
            <div className="content">{content}</div>
            <button
                onClick={() => {
                    if (window.confirm(`${id}번째 일기를 정말 삭제 하시겠습니까?`)) {
                        onDelete(id);
                    }
                }}
            >
                삭제하기
            </button>
        </div>
    );
};

export default DiaryItem;
