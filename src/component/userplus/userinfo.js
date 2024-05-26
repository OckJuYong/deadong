import React, { useState } from 'react';
import axios from 'axios';
import './userinfo.css';
import './userchoice.css';

const Userinfo = () => {
    const [maininfo, setMaininfo] = useState({
        nickname: "",
        name: "",
        age: "",
        instagram_id: "",
        hobby: [],
        hobby_input: "",
        gender: ""
    });
    const address = "http://15.164.101.123/";

    const [hobbyplus, setHobbyplus] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === 'age' ? parseInt(value) : value;
        setMaininfo(prevState => ({
            ...prevState,
            [name]: updatedValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const hobbyString = maininfo.hobby.join(", ");
            const { hobby_input, ...updatedMaininfo } = { ...maininfo, hobby: hobbyString };
            console.log(updatedMaininfo);
            const response = await axios.post(`${address}register/users/`, updatedMaininfo, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 201) {
                console.log('등록이 완료되었습니다.');
                alert("등록 완료")
                window.location.href = "http://localhost:3000/";
            } else {
                console.error('등록에 실패했습니다.');
            }
        } catch (error) {
            if (error.response) {
                const responseData = error.response.data;
                if(responseData.nickname && responseData.nickname.includes("이미 존재합니다.")) {
                    alert("닉네임이 이미 존재합니다.")
                }
                if(responseData.instagram_id && responseData.instagram_id.includes("이미 존재합니다.")) {
                    alert("인스타그램 아이디가 이미 존재합니다.")
                } 
            } else {
                console.error("데이터 입력 오류 : ", error);
            }
        }
    };

    const hobby_plus = () => {
        if (maininfo.hobby_input) {
            setMaininfo(prevState => ({
                ...prevState,
                hobby: [...prevState.hobby, maininfo.hobby_input],
                hobby_input: ''  // 취미 입력 필드를 초기화합니다.
            }));
            setHobbyplus(prevState => [...prevState, maininfo.hobby_input]);
        }
    };

    return (
        <div className='main_container'>
            <form onSubmit={handleSubmit}>
                <div className='infoData_container'>
                    <div className='ddd'>
                        <input type='text' className='nickname_input' name='nickname' value={maininfo.nickname} onChange={handleChange} required />
                        <label className='main'>별명</label>
                    </div>
                    <div className='ddd'>
                        <input type='text' className='nickname_input' name='name' value={maininfo.name} onChange={handleChange} required />
                        <label className='main'>이름</label>
                    </div>
                    <div className='ddd'>
                        <input type='number' className='age_input' name='age' value={maininfo.age} onChange={handleChange} required />
                        <label className='main'>나이</label>
                    </div>
                    <div className='ddd'>
                        <input type='text' className='call_input' name='instagram_id' value={maininfo.instagram_id} onChange={handleChange} required />
                        <label className='main'>인스타 & 휴대폰 번호</label>
                    </div>
                    <div className='sex'>
                        <div className='gender_radio'>
                            <span className='gender_name'>성별</span>
                            <div className='M_btn'>
                                <input type='radio' name='gender' value='M' checked={maininfo.gender === 'M'} onChange={handleChange} />
                                <label htmlFor='male' className='M_title'>Male</label>
                            </div>
                            <div className='F_btn'>
                                <input type='radio' name='gender' value='F' checked={maininfo.gender === 'F'} onChange={handleChange} />
                                <label htmlFor='female' className='F_title'>Female</label>
                            </div>
                        </div>
                    </div>

                    <div className='hobbyMain'>
                        <input type='text' className='call_input' name='hobby_input' value={maininfo.hobby_input} onChange={handleChange} />
                        <label className='main'>취미</label>
                        <button type="button" onClick={hobby_plus} className='plus_button'>추가하기</button>
                    </div>
                    <div className='hobby_title_name'>추가한 취미!!!</div>
                    {hobbyplus.map((hobby, index) => (
                        <div className="hobby" key={index}>
                            <div className={`hobby_${index}`}> - {hobby}</div>
                        </div>
                    ))}
                </div>
                <button type='submit' className='submit_btn'>등록하기</button>
            </form>
        </div>
    );
};

export default Userinfo;
