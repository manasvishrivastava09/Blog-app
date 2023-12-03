import React, { createContext, useState } from "react";
import firebase from "../utils/firebase";
import 'firebase/auth';
import axios from "axios";
import { ip } from "../utils/ip";

export const AuthContext = createContext();

const useAuth = () => {
    const [fbuser, setFbUser] = useState(null);

    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            setFbUser(user);
        }
    });

    const getToken = async () => {
        if (!fbuser) {
            return null;
        }
        const token = await firebase.auth().currentUser.getIdToken();
        return token;
    }

    const login = async ({ email, password }) => {
        const credential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = credential.user;
        setFbUser(user);
    }

    const register = async ({ email, password, name, age, gender, phoneNo, bio, profilePicture }) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        setFbUser(firebase.auth().currentUser);
        const data = new FormData();
        data.append('profilePicture', profilePicture)
        data.append('_id', firebase.auth().currentUser.uid)
        data.append('name', name)
        data.append('email', email)
        data.append('age', age)
        data.append('phoneNo', phoneNo)
        data.append('gender', gender)
        data.append('bio', bio)
        await axios.post(`${ip}addUser`, data);
    }

    const logout = async () => {
        await firebase.auth().signOut();
        setFbUser(null);
    }

    return {
        getToken,
        register,
        login,
        logout,
        fbuser,
        setFbUser,
    }
}

export const AuthProvider = ({ children }) => {
    const auth = useAuth();
    return (
        <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
    );
}