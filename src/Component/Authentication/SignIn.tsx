import { Box, Button } from "@material-ui/core";
import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import './sign.css';
import { useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';

interface sign {
    handlerSigns: any
}

export const SignIn = ({ handlerSigns }: sign) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const push = useNavigate();


    const handleSubmit = () => {
        if (!email || !password) {
            setError('Fill in the fields')
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    push('/')
                })
                .catch((err) => {
                    if (err.message === 'Firebase: Error (auth/invalid-email).') {
                        setError('Invalid email');
                    } else if (err.message === `Firebase: Error (auth/wrong-password).` || `Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).`) {
                        setError('Invalid password or User not found');
                    }
                    console.log(err.message)
                })
        }
    }

    return (
        <main className="page">
            <section className="page__sign">
                <div className="sign__container">
                    <h1 className="sign__title">SIGN IN</h1>
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
                        <p className="sign-change">Not account? <button onClick={handlerSigns}>Sign Up</button></p>
                    </Box>
                </div>
            </section>
        </main>
    )
}