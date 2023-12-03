import axios from "axios";
import { convertToRaw, EditorState } from "draft-js";
import { Editor as PEditor } from "react-draft-wysiwyg";
import React, { useContext, useEffect, useState } from "react";
import "draft-js/dist/Draft.css";
import { useHistory } from "react-router";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { AuthContext } from "../../providers/auth";
import "./index.scss";
import { ip } from "../../utils/ip";

const Editor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(() => EditorState.createEmpty());
  const [cover, setCover] = useState("");
  const history = useHistory();
  const [categories, setCategories] = useState("Entertainment");
  const [showPopUp, setShowPopUp] = useState(false);
  const authContext = useContext(AuthContext);
  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    if (!authContext.fbuser) {
      return history.push("/");
    }
  }, [authContext.fbuser, history]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const getCurrentData = content.getCurrentContent();
      const rawContent = JSON.stringify(convertToRaw(getCurrentData));
      const data = new FormData();
      data.append("title", title);
      data.append("content", rawContent);
      data.append("date", new Date().toLocaleDateString());
      data.append("author", authContext.fbuser.uid);
      data.append("categories", categories);
      data.append("cover", cover);
      await axios.post(`${ip}addPost`, data, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${await authContext.getToken()}`,
        },
      });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const handleTitleInput = (e) => {
    setTitle(e.target.value);
  };
  const handleCategoriesInput = (e) => {
    setCategories(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row">
            <div className="col">
              <label className="form-label text-white mt-3">
                <h4>Enter Title</h4>
              </label>
            </div>
            <div className="col">
              <label className="form-label text-white mt-3">
                <h4>Select Category</h4>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={handleTitleInput}
              />
            </div>
            <div className="col">
              <select
                className="form-select"
                value={categories}
                onChange={handleCategoriesInput}
              >
                <option value="Entertainment">Entertainment</option>
                <option value="Education">Education</option>
                <option value="News">News</option>
                <option value="Art">Art</option>
                <option value="Technology">Technology</option>
                <option value="History">History</option>
                <option value="Health">Health</option>
                <option value="Food">Food</option>
                <option value="Fashion">Fashion</option>
                <option value="Others">Others</option>
                {/* <option value="Others">Others</option>
                <option value="Others">Others</option>
                <option value="Others">Others</option> */}
                {/* Naam and Value change karo */}
              </select>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <label className="form-label text-white">
                <h4>Enter Content</h4>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <PEditor
                editorState={content}
                onEditorStateChange={setContent}
                toolbarClassName="toolbarClassName"
                wrapperClassName="bg-white"
                editorClassName=""
              />
            </div>
          </div>
          <div className="row p-2">
            <div className="col-sm-4">
              <label className="form-label text-white">📖 Cover Picture</label>
            </div>
            <div className="col-sm-8">
              <input
                className="form-control"
                type="file"
                required
                name="profilePicture"
                onChange={(e) => setCover(e.target.files[0])}
              />
            </div>
          </div>
          <div className="row">
            <img
              src={cover ? URL.createObjectURL(cover) : null}
              alt={cover ? cover.name : null}
              style={{ maxHeight: 200, maxWidth: 200 }}
            />
          </div>
          <div className="row mt-5">
            <div className="col">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
        <div className="row mt-3">
          <div className="col">
            <button className="btn btn-primary" onClick={() => goBack()}>
              Go Back
            </button>
          </div>
        </div>
        {showPopUp ? (
          <div className="modal" tabIndex="-1" id="myModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Post Added</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          []
        )}
      </div>
    </div>
  );
};

export default Editor;
