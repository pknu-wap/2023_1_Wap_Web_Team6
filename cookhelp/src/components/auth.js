import React from 'react';
import { auth } from '../config/firebase';
import { createUser } from "firebase/uth";
import { useState } from 'react';

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        await createUser(auth, email, password);
    };

    return (
        <div>
            <input 
                placeholder="Email..." 
                onChange={(e)=>setEmail(e.target.value)}/>
            <input placeholder="Password..."
                onChange={(e)=>setPassword(e.target.value)}/>
            <button>sign in</button>
        </div>
    );
};