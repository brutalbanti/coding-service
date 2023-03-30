import { Box, Button } from "@material-ui/core";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

import './sign.css'

interface sign {
    handlerSign: any
}

export const SignUp = ({ handlerSign }: sign) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const push = useNavigate();


    const handleSubmit = async () => {
        if (!email || !password) {
            setError('Fill in the fields')
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then(({ user }) => {
                    push('/');
                })
                .catch((err) => {
                    if (err.message === 'Firebase: Error (auth/invalid-email).') {
                        setError('Invalid email');
                    } else if (err.message === `Firebase: Error (auth/wrong-password).` || `Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).`) {
                        setError('Invalid password. Min 6 characters');
                    }
                    console.log(err.message)
                })
        }
    }

    return (
        <main className="page">
            <section className="page__sign">
                <div className="sign__container">
                    <h1 className="sign__title">SIGN UP</h1>
                    <Box
                        p={3}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                            width: "400px"
                        }}
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="sign__input"
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="sign__input"
                            placeholder="Password"
                        />
                        {error !== '' &&
                            <p className="err-message">{error}</p>
                        }
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleSubmit}
                            style={{ backgroundColor: "#EEBC1D", color: "white" }}
                        >
                            Sign In
                        </Button>
                        <p className="sign-change">Have account? <button onClick={handlerSign}>Sign In</button></p>
                    </Box>
                </div>
            </section>
        </main>
    )
}