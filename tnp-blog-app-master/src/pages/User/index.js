import "./index.scss"
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
// import Follow from "../../components/follow";
import { AuthContext } from "../../providers/auth";
import { ip } from "../../utils/ip";


const User = () => {

    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const authContext = useContext(AuthContext);
    // const [follow, setFollow] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${ip}user/${id}`);
            setUser(res.data.user);
            setUserPosts(res.data.userPosts);
            // if (authContext.fbuser) {
                // const followCheck = await axios.post("http://localhost:4000/checkFollower", {
                //     user: authContext.fbuser.uid,
                //     receiver: res.data.user.uid,
                // });
                // if (followCheck) {
                //     setFollow(true);
                // }
                // else {
                //     setFollow(false);
                // }
            // }
            setLoading(false);
        };
        fetchData();
    }, [id, authContext.fbuser])

    return (
        <div className="container-fluid bg-background">
            {loading ? <div>
                loading
            </div> : <div className="text-white">
                    <h1>{user.name}</h1>
                    <img className="s1" src = {user?.photoURL} alt = "profile" />
                    <h2>⚝Some of the work of the author are: </h2>
                    {userPosts.map((post, i) => {
                        return (
                            <div key={i}>
                                <Link to={`/post/${post._id}`} className="text-white fs-3">✻{post.title}_</Link>
                                <div fs-7>
                                &nbsp;&emsp;views
                                👁{post.hits}
                                </div>
                            </div>
                        );
                    })}
                    {/* {authContext.fbuser ? <Follow receiver={user._id} active = {follow}/> : []} */}
                </div>}
        </div>
    );
}


export default User;
