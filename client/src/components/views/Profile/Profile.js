import React from 'react';
import ProfileWindow from '../../containers/profileWindow/ProfileWindow';
import './profile.css';

const Profile = ({ username, Name, coverPicId }) => {

    return (
        <>
            <div class="profile-container">
                <div class="profile-info">
                    <h2>@{username}</h2>
                    <h2>{Name}</h2>
                    <ProfileWindow></ProfileWindow>
                </div>
                <img src={coverPicId} alt="Profile Picture"></img>
            </div>
        </>
    )
}

export default Profile;