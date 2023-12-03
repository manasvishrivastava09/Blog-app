import "./index.scss";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { AuthContext } from "../../providers/auth";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import Follow from "../../components/follow";
import { ip } from "../../utils/ip";
import { Link } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${ip}post/${id}`);
        const resComments = await axios.get(`${ip}post/${id}/getComments`);
        setPost(res.data);
        setComments(resComments.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError(true);
      }
    };
    getData();
  }, [id]);

  const refreshComments = async () => {
    try {
      const resComments = await axios.get(`${ip}post/${id}/getComments`);
      setComments(resComments.data);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    await axios.post(
      `${ip}post/${id}/addComment`,
      {
        comment: comment,
        user: authContext.fbuser,
        postID: id,
        date: new Date(),
      },
      {
        headers: {
          authorization: `Bearer ${await authContext.getToken()}`,
        },
      }
    );
    await refreshComments();
  };

  const deletePost = async () => {
    await axios.post(
      `${ip}post/delete`,
      {
        id: post._id,
        uid: authContext.fbuser.uid,
      },
      {
        headers: {
          authorization: `Bearer ${await authContext.getToken()}`,
        },
      }
    );
    history.push("/");
  };

  return (
    <div className="container-fluid text-white ">
      {loading ? (
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="row">
          <div className="col">
            <div className="d-flex flex-column ">
              <h1 class="col-xs-1 center-block text-center">{post.title}</h1>
              {authContext.fbuser ? (
                <>
                  {authContext.fbuser.uid === post.author ? (
                    <div className="row">
                      <div className="col-sm-12 col-lg-4 offset-lg-4">
                        <button
                          className="btn btn-primary w-100"
                          onClick={async () => await deletePost()}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    []
                  )}
                </>
              ) : (
                []
              )}

              <h6>🗓{post.date}</h6>
              <h6>Category: {post.categories}</h6>
              <img className="sad" src={post.cover} alt="cover" />
              <Link to={`/user/${post.author}`}>
                <h5 className="text-white"> Visit Author«</h5>
              </Link>
              <hr></hr>
            </div>
            <Editor
              editorState={EditorState.createWithContent(
                convertFromRaw(JSON.parse(post.content))
              )}
              readOnly={true}
            />
          </div>
        </div>
      )}
      <hr></hr>
      {comments.map((comment, i) => {
        return (
          <div className="row" key={i}>
            <div className="col">{comment.comment}</div>
          </div>
        );
      })}
      {authContext.fbuser ? (
        <div className="row">
          <div className="col">
            <form onSubmit={(e) => handleComment(e)}>
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button type="submit"className="btn btn-primary border-1 shadow-lg w-2 col-sm-2 offset-lg-1">Submit Comment</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col">Login to Comment</div>
        </div>
      )}
      {error ? <div>Somethig Went Wrong Please Try again</div> : []}
    </div>
  );
};

export default Post;
