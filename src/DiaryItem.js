import { useRef, useState } from 'react';

// 값을 받아 옴, spread로 펼쳐서 넘겨줬으니 하나하나 다 받음
const DiaryItem = ({ onEdit, onRemove, author, content, emotion, create_date, id }) => {
    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit(!isEdit);

    const [localContent, setLocalContent] = useState(content);

    const localContentInput = useRef();

    const handleRemove = () => {
        if (window.confirm(`${id}번째 일기를 정말 삭제 하시겠습니까?`)) {
            onRemove(id);
        }
    };

    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
    };

    const handleEdit = () => {
        if (localContent.length < 5) {
            localContentInput.current.focus();
            return;
        }
        if (window.confirm(`${id}번째 일기를 수정하시겠습니까 ?`)) {
            onEdit(id, localContent);
            toggleIsEdit();
        }
    };

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
            <div className="content">
                {isEdit ? (
                    <>
                        <textarea ref={localContentInput} value={localContent} onChange={(e) => setLocalContent(e.target.value)}></textarea>
                    </>
                ) : (
                    <>{content}</>
                )}
            </div>
            {isEdit ? (
                <>
                    <button onClick={handleEdit}>완료</button>
                    <button onClick={handleQuitEdit}>취소</button>
                </>
            ) : (
                <>
                    <button onClick={handleRemove}>삭제</button>
                    <button onClick={toggleIsEdit}>수정</button>
                </>
            )}
        </div>
    );
};

export default DiaryItem;
