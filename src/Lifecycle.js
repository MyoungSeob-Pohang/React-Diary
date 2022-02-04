import React, { useEffect, useState } from 'react';

const Lifecycle = () => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    const [isVisible, setisVisible] = useState(false);
    const toggle = () => setisVisible(!isVisible);

    // 탄생
    useEffect(() => {
        console.log('Mount!');
    }, []);

    // 업데이트

    // 전체 감지
    // useEffect(() => {
    //     console.log('Update!');
    // });

    // count만 감지
    useEffect(() => {
        console.log(`count is update : ${count}`);
        if (count > 5) {
            alert('Count Over!!!');
            setCount(1);
        }
    }, [count]);

    // text만 감지
    useEffect(() => {
        console.log(`text is update : ${text}`);
    }, [text]);

    // 죽음
    const UnmountTest = () => {
        useEffect(() => {
            console.log('Mount!');

            // unMount 시점에 실햄하게됨
            return () => {
                console.log('Unmount!');
            };
        }, []);

        return <div>Unmount Testing Component</div>;
    };

    return (
        <div style={{ padding: 20 }}>
            <div>
                {count}
                <button
                    onClick={() => {
                        setCount(count + 1);
                    }}
                >
                    +
                </button>
            </div>
            <div>
                <input value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div>
                <button onClick={toggle}>ON/OFF</button>
                {isVisible && <UnmountTest />}
            </div>
        </div>
    );
};

export default Lifecycle;
