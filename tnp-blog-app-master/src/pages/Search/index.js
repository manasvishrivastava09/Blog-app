import axios from "axios";
import React, { useState } from "react";
import { ip } from "../../utils/ip";
import {Link} from "react-router-dom";

const SearchScreen = () => {

    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.get(`${ip}search/${query}`);
        setResult(res.data);
    }

    return (
        <div className = "container-fluid text-white ">
            <h1 className="d-flex justify-content-center so "><centre>🔍SEARCH</centre></h1>
            <form onSubmit = {handleSubmit}>
                <div className = "row">
                    <div className = "col d-flex justify-content-center">
                    <input className = "form-control" value = {query} onChange = {(e) => setQuery(e.target.value)}/>
                    </div>
                </div>
                <div className = "row mt-2">
                    <div className = "col d-flex justify-content-center">
                    <button type = "submit" className="btn btn-primary border-3 shadow-lg col-sm-3 w-30 s2">Submit</button>
                    </div>
                </div>
            </form>
            {result.length !== 0 ? <>
            {result.map((post) => {
                return (
                    // Style it as Front Page Box 
                    <div>
                        <Link to = {`/post/${post._id}`}>
                        <h3 className = "text-white">✻{post.title}</h3>
                        </Link>
                        <h6 className = "text-white">🗓{post.date}</h6>
                        <Link to = {`/user/${post.author}`}>
                            <h6 className = "text-white">✏Visit Author</h6>
                        </Link>
                    </div>
                );
            })} </> : <div className = "row text-white"><div className = "col d-flex justify-content-center">No Results</div> </div>}
        </div>
    );
}

export default SearchScreen;