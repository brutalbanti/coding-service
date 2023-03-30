import { MainHome } from "../Component/Main/MainHome"
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

export const Home = () => {
    const push = useNavigate();
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                push('/')
            } else {
                push('/authentication')
            }
        })
    }, [])
    return (
        <div>
            <MainHome />
        </div>
    )
}