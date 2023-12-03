import React from "react";
import {Switch, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Editor from "./pages/Editor";
import Reigster from "./pages/Register";
import Post from "./pages/Post";
import User from "./pages/User";
import About from "./pages/about";
import SearchScreen from "./pages/Search";

const Routes = () => {
    return (
            <Switch>
                <Route exact path = "/">
                    <LandingPage />
                </Route>
                <Route exact path = "/editor">
                    <Editor />
                </Route>
                <Route exact path = "/register">
                    <Reigster />
                </Route>
                <Route exact path = "/post/:id">
                    <Post />
                </Route>
                <Route exact path = "/user/:id">
                    <User />
                </Route>
                <Route exact path = "/about">
                    <About />
                </Route>
                <Route exact path = "/search">
                    <SearchScreen />
                </Route>
                <Route exact path = "/post/:id/update">
                    <Post />
                </Route>
            </Switch>
    );
}

export default Routes;