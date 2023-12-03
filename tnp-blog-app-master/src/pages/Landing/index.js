import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/auth";
import { ip } from "../../utils/ip";
import "./index.scss";

const LandingPage = () => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [indData, setIndData] = useState([]);
  const [postLoading, setPostLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${ip}`);
      setPosts(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  useEffect(() => {
    const getData = async () => {
      await fetchData();
      if (authContext.fbuser) {
        const userRes = await axios.get(`${ip}user/${authContext.fbuser.uid}`);
        setIndData(userRes.data.userPosts);
        setPostLoading(false);
      }
    };
    getData();
  }, [authContext]);

  const handleSubmit = async (e) => {
    try {
      setPostLoading(true);
      e.preventDefault();
      await authContext.login({ email: email, password: password });
      console.log("loggedIN");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center">
      {/* {error ? <div>Somethig Went Wrong Please Try again</div> : []} */}
      <div className="row w-100">
        <div className="col-sm">
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center spinner-border text-white"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <>
              <div className="row pt-2">
                <div className="col">
                  <h1 className="text-white">Top Reads</h1>
                </div>
              </div>
              <div className="row">
                <div className="col w-100 overflow-auto d-flex flex-column content-wrapper">
                  {posts.map((post, i) => {
                    return (
                      <div key={i} className="row custom w-100 mt-2 rounded">
                        <div className="wrapper rounded">
                          <img
                            src={post.cover}
                            className="custom_img"
                            alt="cover"
                          />
                          <div className="backdrop" />
                          <Link
                            to={`/post/${post._id}`}
                            className="row text-white text-capitalize"
                          >
                            <div className="col">
                              <h3 className="title">{post.title}</h3>
                            </div>
                            <div className="col d-flex justify-content-end">
                              Views: {post.hits} 👁
                            </div>
                          </Link>
                          <Link to={`/user/${post.author}`} className="row">
                            <button className="btn btn-outline-secondary text-white authorButton">
                              Visit Author
                            </button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
        {authContext.fbuser ? (
          <div className="col d-flex flex-column">
            {postLoading ? (
              <div
                className="d-flex justify-content-center align-items-center spinner-border text-white"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                <div className="row pt-2">
                  <div className="col text-white">
                    <h1>My Posts</h1>
                  </div>
                </div>
                <div className="row">
                <div className="col w-100 overflow-auto d-flex flex-column content-wrapper">
                    {indData.map((post, i) => {
                      return (
                        <div key={i} className="row custom w-100 mt-2 rounded">
                        <div className="wrapper rounded">
                          <img
                            src={post.cover}
                            className="custom_img"
                            alt="cover"
                          />
                          <div className="backdrop" />
                          <Link
                            to={`/post/${post._id}`}
                            className="row text-white text-capitalize"
                          >
                            <div className="col">
                              <h3 className="title">{post.title}</h3>
                            </div>
                            <div className="col d-flex justify-content-end">
                              Views: {post.hits}👁
                            </div>
                          </Link>
                          <Link to={`/user/${post.author}`} className="row">
                            <button className="btn btn-outline-secondary text-white mt-4 mt-5 authorButton">
                              Visit Author
                            </button>
                          </Link>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </div>
                <div className="col w-100 d-flex mt-5 align-items-center justify-content-center">
                  <Link
                    to="/editor"
                    className="col-12 w-50 d-flex justify-content-center"
                  >
                    <button className="w-100 btn btn-primary">New Post</button>
                  </Link>
                </div>
                <div className="row">
                  <div className="col w-100 d-flex justify-content-center">
                    <button
                      className="btn btn-primary w-50 mt-5"
                      onClick={async () => await authContext.logout()}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
            :
          </div>
        ) : (
          <div className="col-sm-6">
            <div className="row">
              <div className="col w-100 d-flex justify-content-center mt-2">
                <h1 className="text-white">Login</h1>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="col w-100 d-flex justify-content-evenly flex-column"
            >
              <div className="row d-flex justify-content-center">
                <div className="col-sm-6">
                  <label className="form-label text-white">💌 Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                  />
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-sm-6">
                  <label className="form-label text-white">🔒 Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                  />
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-sm-6 d-flex justify-content-center mt-5">
                  <button
                    type="submit"
                    className="btn btn-primary text-text w-100"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>

            <div className="row hr">
              <div className="circle">OR</div>
            </div>
            <div className="row">
              <Link
                to="/register"
                className="col-sm- d-flex justify-content-center"
              >
                <button className="btn btn-primary w-50">Register 📝</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
