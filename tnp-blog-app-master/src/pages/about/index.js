import React from "react";
import "./index.scss";
import sanic from "./sanic.png"
const About = () => {
    return (
        <div className = "container-fluid ">
            <div className="row">
                <div className="col text-white d-flex justify-content-center">
                    <h1><centre>About</centre></h1>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 text-center">
                    <img src={sanic} className="rounded mx-auto d-block ro" alt="Manasvi Shrivastava"></img>
                </div>
                <div className="col d-flex justify-content-center">
                    <h5 className = "text-white d-flex flex-column h-100 justify-content-center ">Blogging application with free editor providing a great platform for expressing views, spreading and gaining knowledge, enhancing writing skills and keeping ourselves updated.
                        <p>
                        <ul className="list-group text-white ">
                        <li>View/Add Comment</li>
                        <li>Rich Editor to edit your Posts</li>
                        <li>Add Images</li>
                        <li>Check Views</li>
                        <li>Editor to edit your Posts</li>
                        <li>Based on MERN Stack</li>
                        </ul>
                        </p></h5>

                </div>
            </div>
            
        </div>
            
        


        
    );
}

export default About;