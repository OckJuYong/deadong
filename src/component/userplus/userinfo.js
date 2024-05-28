import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './userinfo.css';
import './userchoice.css';
import borderBox from '../img/border.png'; // Make sure to provide the correct path to the image

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
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [findUser, setFindUser] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === 'age' ? parseInt(value) : value;
        setMaininfo(prevState => ({
            ...prevState,
            [name]: updatedValue
        }));
    };

    // Handle form submission
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
                setFindUser(updatedMaininfo); // Assuming the response data contains the user info
                setModalIsOpen(true); // Open the modal
            } else {
                console.error('등록에 실패했습니다.');
            }
        } catch (error) {
            if (error.response) {
                const responseData = error.response.data;
                if (responseData.nickname && responseData.nickname.includes("이미 존재합니다.")) {
                    alert("닉네임이 이미 존재합니다.");
                }
                if (responseData.instagram_id && responseData.instagram_id.includes("이미 존재합니다.")) {
                    alert("인스타그램 아이디가 이미 존재합니다.");
                }
            } else {
                console.error("데이터 입력 오류: ", error);
            }
        }
    };

    // Add hobby to the list
    const hobby_plus = () => {
        if (maininfo.hobby_input) {
            setMaininfo(prevState => ({
                ...prevState,
                hobby: [...prevState.hobby, maininfo.hobby_input],
                hobby_input: '' 
            }));
            setHobbyplus(prevState => [...prevState, maininfo.hobby_input]);
        }
    };

    // Close the modal
    const closeModal = () => {
        setModalIsOpen(false);
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
                        <label className='main_hobby'>취미</label>
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
            <div className='modal_main_container'>
                <Modal 
                    isOpen={modalIsOpen} 
                    onRequestClose={closeModal} 
                    contentLabel="Success Modal"
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <img src={borderBox} alt="Computer Logo" className='border_container' />
                    <div className='modal_sub_container'>
                        <button onClick={closeModal} className='close_btn'>X</button>
                        <h2>등록되었습니다!</h2>
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
};

export default Userinfo;
