import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../providers/auth";
import {ip} from "../../utils/ip";

const Follow = ({receiver, active, setFollow}) => {
    const authContext = useContext(AuthContext);
    const handleFollow = async () => {
        await axios.post(`${ip}checkFollower`, {
            user: authContext.fbuser,
            receiver: receiver
        })
        await axios.post(`${ip}addFollower`, {
            date: new Date(),
            user: authContext.fbuser,
            receiver: receiver,
        }, {headers: {
            authorization : `Bearer ${await authContext.getToken()}`
        }}
        );
        setFollow(!active);
    }

    return(
        <div>
            <button onClick = {handleFollow} disabled = {!active}>Follow</button>
        </div>
    );
};

export default Follow