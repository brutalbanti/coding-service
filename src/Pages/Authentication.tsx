import { SignIn } from "../Component/Authentication/SignIn"
import React, { useState } from 'react';
import { SignUp } from "../Component/Authentication/SignUp";
export const Authentication = () => {
    const [sign, setSign] = useState(true);
    const handlerSign = (e: React.MouseEventHandler<HTMLButtonElement>) => {
        const nowSign = sign;
        setSign(!nowSign);
    }
    return (
        <>
            {sign ?
                <SignIn handlerSigns={handlerSign}/>
                :
                <SignUp handlerSign={handlerSign}/>
            }
        </>
    )
}