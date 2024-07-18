let userUsername = '';
let userAvatar = '';
let userDescription = '';

export const setDetails = (username, avatar, description) => {
    userUsername = username;
    userAvatar = avatar;
    userDescription = description;
};

export { userUsername, userAvatar, userDescription };
