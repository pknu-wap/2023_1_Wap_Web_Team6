import React from 'react';
// import { auth } from '../config/firebase';
// import { createUser } from "firebase/Auth";
// import { useState } from 'react';

export const Auth = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    // const signIn = async () => {
    //     await createUser(auth, email, password);
    // };

    return (
        <div>
            <input 
                placeholder="Email..." />
            <input placeholder="Password..."/>
            <button>sign in</button>
        </div>
    );
};