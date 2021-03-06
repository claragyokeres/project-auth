import React, { useState, useEffect } from 'react'

const URL = 'https://harry-potter-auth.herokuapp.com/users'

// Include loggedInUser as a parameter to PRofile
export const Profile = (loggedInUser) => {
    const [userId, setUserId] = useState(0)
    const [accessToken, setAccessToken] = useState('')

    const changeName = (userObject) => {
        document.getElementById("name").innerHTML = userObject.name;
    }

    useEffect(() => {
        console.log(loggedInUser)

        setUserId(loggedInUser._id);
        setAccessToken(loggedInUser.accessToken);
        // Include userId in the path
        fetch(`${URL}/${userId}`, {
            method: 'GET',
            // Include the accessToken to get the protected endpoint
            headers: { 'Authorization': accessToken }
        })
            .then(res => res.json())
            // SUCCESS: Do something with the information we got back
            .then(json => changeName(json))
            .catch(err => console.log('error:', err)) //401
    });

    return (
        <div>
            Profile <div id="name"></div>
        </div>
    )
}
export default Profile