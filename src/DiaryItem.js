import React, { useContext, useRef, useState } from 'react';
import { DiaryDispatchContext } from './App';

// 값을 받아 옴, spread로 펼쳐서 넘겨줬으니 하나하나 다 받음
const DiaryItem = ({ author, content, emotion, create_date, id }) => {
    const { onRemove, onEdit } = useContext(DiaryDispatchContext);

    // 수정 중, 수정 중이 아님의 상태를 저장할 State
    const [isEdit, setIsEdit] = useState(false);
    // toggleIsEdit를 호출하여 isEdit의 값을 반전시킴
    const toggleIsEdit = () => setIsEdit(!isEdit);
    // 수정하기 버튼을 눌렀을 때 나오는 textarea 관리를 위한 State
    const [localContent, setLocalContent] = useState(content);
    // 수정하기 버튼을 눌렀을 때 나오는 textarea의 Ref
    const localContentInput = useRef();

    // 삭제하기 클릭이벤트
    const handleRemove = () => {
        if (window.confirm(`${id}번째 일기를 정말 삭제 하시겠습니까?`)) {
            onRemove(id);
        }
    };

    // textarea수정 중 내용을 작성하다가 취소를 누르면 기존값이 남아있다. 그 기존값 초기화를 위한 함수
    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
    };

    // 수정완료 이벤트 , App에 onEdit을 호출하여 값을 변경시킴
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
                    {/* toggleIsEdit를 호출하여 수정할지 안할지를 결정해야 함으로 수정하기 버튼에 연결 */}
                    <button onClick={toggleIsEdit}>수정</button>
                </>
            )}
        </div>
    );
};

export default React.memo(DiaryItem);
