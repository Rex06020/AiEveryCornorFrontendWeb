import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from './context';
import axios from 'axios';
import Intro from './intro';
import Recentmedia from './recentmedia';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Avatar from './avatar';
import Cover from './cover';
import Follow from './follow';
import MiniPhoto from './miniphoto';

function About() {

    const { setAvatar } = useContext(UserContext);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const urlUserId = params.get('userId'); // userId from query parameters
    const storedUserId = localStorage.getItem('userId');
    const userId = urlUserId || storedUserId; // 使用 URL 或 localStorage 中的 userId
    const [formData, setFormData] = useState({
        nickName: '',
        username: ''
    });
    const [isCurrentUser, setIsCurrentUser] = useState(false); 

    // 狀態管理個人資料和是否處於編輯模式
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        work: "曾在XX地工作",
        school: "就讀於AI大學",
        location: "現居XX市",
        fromLocation: "來自XX市",
        relationship: "單身",
        phone: "0900 000 000",
    });

    useEffect(() => {
        console.log('Fetched userId:', userId);

        // 從後端獲取用戶資料
        const token = localStorage.getItem('token'); // 假設 token 已存儲在 localStorage 中
        const currentUserId = localStorage.getItem('userId');
        setIsCurrentUser(userId === currentUserId);

        
        axios.get(`http://localhost:8080/api/auth/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}` // 設置 Authorization 標頭
            }
        })
            .then(response => {
                const userData = response.data;
                setFormData({
                    nickName: userData.nickName,  // 假設後端返回的資料包含 nickName 和 username
                    username: userData.username
                });
            })
            .catch(error => {
                console.error("獲取用戶資料時發生錯誤:", error);
            });
    }, [userId]);

    // 切換編輯模式
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    // 處理表單數據變更
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // 處理表單提交
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsEditing(false); // 提交後關閉編輯模式
    };

    return (
        <div className="Profile">
            <>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <link rel="icon" type="image/png" href="assets/images/logo-16x16.png" />
                {/* The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags */}
                <title>Argon - Social Network</title>
                {/* Fonts */}
                <link
                    href="https://fonts.googleapis.com/css?family=Major+Mono+Display"
                    rel="stylesheet"
                />
                <link
                    href="https://cdn.jsdelivr.net/npm/boxicons@1.9.2/css/boxicons.min.css"
                    rel="stylesheet"
                />
                {/* Styles */}
                <link href="assets/css/bootstrap/bootstrap.min.css" rel="stylesheet" />
                <link href="assets/css/style.css" rel="stylesheet" />
                <link href="assets/css/components.css" rel="stylesheet" />
                <link href="assets/css/profile.css" rel="stylesheet" />
                <link href="assets/css/media.css" rel="stylesheet" />
                <div className="container-fluid " id="wrapper">
                    <div className="row newsfeed-size">
                        <div className="col-md-12 p-0">
                            <div className="row profile-right-side-content">
                                <div className="user-profile">
                                <Cover />
                                    <div className="row profile-rows">
                                        <div className="col-md-3">
                                            <div className="profile-info-left">
                                                <div className="text-center">
                                                    <div className="profile-img w-shadow">
                                                    <Avatar /> 
                                                    </div>
                                                    <p className="profile-fullname mt-3">{formData.nickName || 'Your Nickname'}</p>
                                                    <p className="profile-username mb-3 text-muted">
                                                        @{formData.username || 'username'}
                                                    </p>
                                                </div>
                                                <Follow />
                                                <div className="intro-item d-flex justify-content-between align-items-center">
                                                    <h3 className="intro-about">Intro</h3>
                                                </div>
                                                <div>
                                                    <Intro
                                                        userInfo={userInfo}
                                                        isEditing={isEditing}
                                                        toggleEditMode={toggleEditMode}
                                                        handleInputChange={handleInputChange}
                                                        handleSubmit={handleSubmit} />
                                                </div>
                                                <MiniPhoto />
                                            </div>
                                        </div>
                                        <div className="col-md-9 p-0">
                                            <div className="profile-info-right">
                                                {/* Posts section */}
                                                <div className="row">
                                                    <div className="col-md-9 profile-center">
                                                        <ul className="list-inline profile-links d-flex justify-content-between w-shadow rounded">
                                                            <li className="list-inline-item ">
                                                                <a href={`/profile?userId=${userId}`}>Timeline</a>
                                                            </li>
                                                            <li className="list-inline-item profile-active">
                                                                <a href={`/about?userId=${userId}`}>About</a>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <a href={`/friends?userId=${userId}`}>Friends</a>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <a href={`/photo?userId=${userId}`}>Photos</a>
                                                            </li>
                                                            <li className="list-inline-item dropdown">
                                                                <a
                                                                    href="#"
                                                                    data-toggle="dropdown"
                                                                    aria-haspopup="true"
                                                                    aria-expanded="false"
                                                                >
                                                                    <i className="bx bx-dots-vertical-rounded" />
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-right profile-ql-dropdown">
                                                                    <a href="#" className="dropdown-item">
                                                                        Activity Log
                                                                    </a>
                                                                    <a href="#" className="dropdown-item">
                                                                        Videos
                                                                    </a>
                                                                    <a href="#" className="dropdown-item">
                                                                        Check-Ins
                                                                    </a>
                                                                    <a href="#" className="dropdown-item">
                                                                        Events
                                                                    </a>
                                                                    <a href="#" className="dropdown-item">
                                                                        Likes
                                                                    </a>
                                                                </div>
                                                            </li>
                                                        </ul>

                                                        <div className="bg-white profile-posts-options mt-5 mb-4 py-3 d-flex justify-content-between shadow-sm">
                                                            <div className="col-md-3 col-sm-12">
                                                                <h6 className="timeline-title">About</h6>
                                                            </div>
                                                            <div className="col-md-9 col-sm-12">
                                                                <div className="timeline-manage">
                                                                    {/* Check if the userId from localStorage matches the one from the query parameters */}
                                                                    
                                                                    {isCurrentUser && (
                                                                        <button className="btn btn-manage" onClick={toggleEditMode}>
                                                                            {isEditing ? "Cancel" : "Manage About"}
                                                                        </button>
                                                                    ) }
                                                                </div>
                                                                {/* 如果處於編輯模式，顯示編輯表單 */}
                                                                {isEditing ? (
                                                                    <form onSubmit={handleSubmit}>
                                                                        <label>work：</label>
                                                                        <input type="text" name="work" value={userInfo.work} onChange={handleInputChange} placeholder="Work" className="form-control" />
                                                                        <label>school：</label>
                                                                        <input type="text" name="school" value={userInfo.school} onChange={handleInputChange} placeholder="School" className="form-control" />
                                                                        <label>location：</label>
                                                                        <input type="text" name="location" value={userInfo.location} onChange={handleInputChange} placeholder="Location" className="form-control" />
                                                                        <label>fromLocation：</label>
                                                                        <input type="text" name="fromLocation" value={userInfo.fromLocation} onChange={handleInputChange} placeholder="From Location" className="form-control" />
                                                                        <label>relationship：</label>
                                                                        <input type="text" name="relationship" value={userInfo.relationship} onChange={handleInputChange} placeholder="Relationship" className="form-control" />
                                                                        <label>phone：</label>
                                                                        <input type="text" name="phone" value={userInfo.phone} onChange={handleInputChange} placeholder="Phone" className="form-control" />
                                                                        <button type="submit">Save</button>
                                                                    </form>
                                                                ) : (
                                                                    <div>
                                                                        <p>work：{userInfo.work}</p>
                                                                        <p>school：{userInfo.school}</p>
                                                                        <p>location：{userInfo.location}</p>
                                                                        <p>fromLocation：{userInfo.fromLocation}</p>
                                                                        <p>relationship：{userInfo.relationship}</p>
                                                                        <p>phone：{userInfo.phone}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <Recentmedia />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* New message modal */}
                <div
                    className="modal fade"
                    id="newMessageModal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="newMessageModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header new-msg-header">
                                <h5 className="modal-title" id="newMessageModalLabel">
                                    Start new conversation
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body new-msg-body">
                                <form action="" method="" className="new-msg-form">
                                    <div className="form-group">
                                        <label htmlFor="message-text" className="col-form-label">
                                            Message:
                                        </label>
                                        <textarea
                                            className="form-control search-input"
                                            rows={5}
                                            id="message-text"
                                            placeholder="Type a message..."
                                            defaultValue={""}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer new-msg-footer">
                                <button type="button" className="btn btn-primary btn-sm">
                                    Send message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Core */}
                {/* Optional */}
            </>

        </div>
    );
}

export default About;