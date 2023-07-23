import React from 'react';
import ProfileWindow from '../../containers/profileWindow/ProfileWindow';
import './profile.css';

const Profile = ({ username, firstName, lastName, coverPicId }) => {
    return (
        <div class="profile-container">
            <img src={coverPicId} alt="Profile Pictute">
            </img>
            <h2>@{username}</h2>
            <h2>{firstName} {lastName}</h2>
            <ProfileWindow></ProfileWindow>
        </div>
    )
}

export default Profile;