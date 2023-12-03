import "./index.scss";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../providers/auth";

const Reigster = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const history = useHistory();

  const authContext = useContext(AuthContext);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await authContext.register({
        email: email,
        password: password,
        name: name,
        age: age,
        gender: gender,
        bio: bio,
        phoneNo: phoneNo,
        profilePicture: profilePicture
      });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container-fluid">
      <div className = "container-xl d-flex justify-content-center flex-column bg-secondary-background  border rounded shadow-risen border-alpha-10">
      <div className="row">
        <div className="col w-100 d-flex justify-content-center">
          <label className="text-white fs-1 fw-bold p-5 ">REGISTER 📝</label>
        </div>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row p-2">
          <div className="col-sm-4">
            <label className="form-label text-white">💌 Email id</label>
          </div>
          <div className="col-sm-8">
            <input
              required = {true}
              type="text"
              className="form-control"
              value={email}
              placeholder="xyz@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="row p-2">
          <div className="col-sm-4">
            <label className="form-label text-white">🔒 Password</label>
          </div>
          <div className="col-sm-8">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div className="row p-2">
          <div className="col-sm-4">
            <label className="form-label text-white">📞 Phone No</label>
          </div>
          <div className="col-sm-8">
            <input
              type="number"
              value={phoneNo}
              placeholder="ex +91 999999999"
              onChange={(e) => setPhoneNo(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div className="row p-2">
          <div className="col-sm-4">
            <label className="form-label text-white">👤 Name</label>
          </div>
          <div className="col-sm-8">
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div className="row p-2">
          <div className="col-sm-4">
            <label className="form-label text-white">⚤ Gender</label>
          </div>
          <div className="col-sm-8">
            <select
              value={gender}
              className="form-select"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value={" "} hidden>
                Selct an option
              </option>
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
              <option value={"Other"}>Other</option>
            </select>
          </div>
        </div>
        <div className="row p-2">
          <div className="col-sm-4">
            <label className="form-label text-white">⭐ Age</label>
          </div>
          <div className="col-sm-8">
            <input
              type="number"
              value={age}
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div className="row p-2">
          <div className="col-sm-4">
            <label className="form-label text-white">📖 Bio</label>
          </div>
          <div className="col-sm-8">
            <textarea
              type="text"
              value={bio}
              placeholder={"Tell us something about yourself"}
              onChange={(e) => setBio(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div className="row p-2">
          <div className="col-sm-4">
            <label className="form-label text-white">📖 Profile Picture</label>
          </div>
          <div className="col-sm-8">
            <input
            className = "form-control"
              type="file"
              name="profilePicture"
              onChange={(e) => setProfilePicture(e.target.files[0])}
            />
          </div>
        </div>
        <div className = "row">
        <img src={profilePicture? URL.createObjectURL(profilePicture) : null} alt={profilePicture? profilePicture.name : null}/>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center mt-5">
            <button
              type="submit"
              className="btn btn-primary border-3 shadow-lg col-sm-12 w-50"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Reigster;
