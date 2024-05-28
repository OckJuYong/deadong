import React, { useState } from 'react';
import axios from 'axios';
import './userchoice.css';
import nugeori from '../img/neoguri.png';
import Modal from 'react-modal';

import borderBox from '../img/border.png';

Modal.setAppElement('#root');

const UserChoice = () => {
    const [userData, setUserData] = useState({
        name: "",
        gender: "",
        age: "",
        type: "",
        keyword: ""
    });
    const [errors, setErrors] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [findUser, setFindUser] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // age 필드일 경우에만 문자열을 정수로 변환하여 저장합니다.
        const updatedValue = name === 'age' ? parseInt(value) : value;
        setUserData(prevState => ({
            ...prevState,
            [name]: updatedValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 검증할 때 사용할 필수 항목 목록
            const requiredFields = ["gender", "age", "type", "name"];
            const newErrors = {};

            // 필수 항목이 입력되었는지 확인
            requiredFields.forEach(field => {
                if (!userData[field]) {
                    newErrors[field] = "이 필드는 필수 항목입니다.";
                }
            });

            // 나이가 숫자로 입력되었는지 확인
            if (userData.age && isNaN(userData.age)) {
                newErrors.age = "나이는 숫자로 입력되어야 합니다.";
            }

            // type이 A 또는 O인지 확인
            if (userData.type !== "A" && userData.type !== "O") {
                newErrors.type = "type은 'A' 또는 'O'여야 합니다.";
            }

            // 에러가 없으면 서버에 POST 요청을 보냄
            if (Object.keys(newErrors).length === 0) {
                console.log(userData);
                const response = await axios.post('http://15.164.101.123/find/visitors/', userData);
                console.log(response.data);
                if (response.status === 200) {
                    console.log('정보를 성공적으로 받아왔습니다.');
                    setFindUser(response.data);
                    setModalIsOpen(true);  
                } else {
                    console.error('정보를 받아오지 못했습니다.');
                }
            } else {
                // 에러가 있으면 상태 업데이트
                setErrors(newErrors);
            }
        } catch (error) {
            alert("매칭된 사람이 없습니다...");
            console.error('서버 요청 중 오류가 발생했습니다.', error);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);

        window.location.href = "http://localhost:3000/"
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='choice_input'>
                    <input type="text" name="name" value={userData.name} onChange={handleChange} required />
                    <label className='main'>이름</label>
                </div>
                <div className='choice_input'>
                    <input type="number" name="age" value={userData.age} onChange={handleChange} required />
                    <label className='main'>나이</label>
                </div>
                <div className='choice_input'>
                    <label className='main'>성별</label>
                    <div className='gender_choice'>
                        <div className='M_btn'>
                            <input className="M_button" type='radio' name='gender' value='M' checked={userData.gender === 'M'} onChange={handleChange} />
                            <label htmlFor='M' className='M_title'>Male</label>
                        </div>
                        <div className='F_btn'>
                            <input className="F_button" type='radio' name='gender' value='F' checked={userData.gender === 'F'} onChange={handleChange} />
                            <label htmlFor='F' className='F_title'>Female</label>
                        </div>
                    </div>
                    {errors.gender && <span className="error">{errors.gender}</span>}
                </div>

                <div className='choice_input'>
                    <label className='Type_main'>주민 타입</label>
                    <div className='type_choice'>
                        <div className='A_btn'>
                            <input type='radio' name='type' value='A' checked={userData.type === 'A'} onChange={handleChange} />
                            <label htmlFor='A' className='A_title'>모든사람</label>
                        </div>
                        <div className='O_btn'>
                            <input type='radio' name='type' value='O' checked={userData.type === 'O'} onChange={handleChange} />
                            <label htmlFor='O' className='O_title'>이성만</label>
                        </div>
                    </div>
                </div>
                <div className='choice_input'>
                    <input type="text" name="keyword" value={userData.keyword} onChange={handleChange} />
                    <label className='main_hobby'>취미</label>
                </div>
                <img src={nugeori} alt="Computer Logo" className='neoguri'/>
                <button type="submit" className='cho_btn'>주민 불러오기</button>
            </form>

            <div className='modal_main_container'>
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
                contentLabel="Success Modal"
                className="Modal"
                overlayClassName="Overlay"
            >
                <img src={borderBox} alt="Computer Logo" className='border_container'>
                    
                </img>
                <div className='modal_sub_container'>
                    <button onClick={closeModal} className='close_btn'>X</button>

                    <h2>매칭 되었습니다!</h2>
                    <div>닉네임 : {findUser.nickname}</div>
                    <br/>
                    <div>나이 : {findUser.age}</div>
                    <br/>
                    <div>취미 : {findUser.hobby}</div>
                    <br/>
                    <div>연락처 : {findUser.instagram_id}</div>
                    <br/>
                </div>

            </Modal>
            </div>

        </div>
    );
}

export default UserChoice;
