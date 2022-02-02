const DiaryItem = ({ author, content, emotion, create_date, id }) => {
    return (
        <div className="DiaryItem">
            <div className="info">
                <span>
                    작성자 {author} | 감정점수 : {emotion}
                </span>
                <br />
                <span className="date">{new Date(create_date).toLocaleDateString()}</span>
            </div>
            <div className="content">{content}</div>
        </div>
    );
};

export default DiaryItem;
