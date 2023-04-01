import video from '../../../source/home/leek3.mp4';
import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import './content.css'
import { getPadTime } from '../../getPadTime';
import reset from '../../../source/home/reset.svg';
import budilnik from '../../../source/home/htc_basic.mp3';
import { PlayerSound } from '../../PlayerSound';
import { IoMdSettings } from 'react-icons/io';
import { SettingsPopUp } from '../../SettingsPopUp';
import { AiOutlineSound, AiFillSound } from 'react-icons/ai';

export const SectionContent = () => {
    const [timerTime, setTimerTime] = useState(25);
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isTimer, setIsTimer] = useState(false);
    const minutes = getPadTime(Math.floor(timeLeft / 60));
    const seconds = getPadTime(timeLeft - minutes * 60);
    const [play, { stop }] = useSound(budilnik);
    const [buttonSound, setButtonSound] = useState(true);
    const [isSettings, setIsSettings] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            isTimer &&
                setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0))
        }, 1000);
        if (timeLeft === 0) {
            setIsTimer(false);
            if(buttonSound === true) {
                play();
            }
            setTimeLeft(25 * 60);
        };
        return () => {
            clearInterval(interval);
        }

    }, [timeLeft, isTimer]);

    const handleStart = () => {
        setIsTimer(true);
    }
    const handleStop = () => {
        setIsTimer(false);
    }
    const handleReset = () => {
        setIsTimer(false);
        setTimeLeft(25 * 60);
    }
    const handlerTimer = (e: any) => {
        setTimerTime(e.target.value)
        console.log(e.target.value)
    }
    const handlerSaveClose = () => {
        setTimerTime(25);
        setIsSettings(!isSettings);
        setTimeLeft(timerTime * 60);
    }
    return (
        <section className="page__content">
            <div className="content__container">
                <div className="content__items">
                    <div className="content__video">
                        <video autoPlay muted loop src={video} typeof="video/mp4" className="content__video-player"></video>
                    </div>
                    <div className="content__player">
                        <PlayerSound />
                    </div>
                    <div className="content__timer">
                        <div className="content-timer__background"></div>
                        <h3 className="timer-content__title">Relax Timer</h3>
                        <div className="content-timer__content">
                            <div className="timer-content__time">
                                <div className="time-content__item">{minutes}</div>
                                <span className='time-content__span'>:</span>
                                <div className="time-content__item">{seconds}</div>
                            </div>
                            <div className="timer-content__button">
                                {isTimer ?
                                    <button className="button-timer__stop btn-timer" onClick={handleStop}>Stop</button>
                                    :
                                    <button className="button-timer__start btn-timer" onClick={handleStart}>Start</button>
                                }
                                <button className="button-timer__reset" onClick={handleReset}><img src={reset} alt="" /></button>
                                {buttonSound ?
                                    <AiFillSound onClick={() => { stop(); setButtonSound(false) }} size="3em" fill='white' />
                                    :
                                    <AiOutlineSound onClick={() =>  setButtonSound(true) } size="3em" fill='white' />
                                }
                                <IoMdSettings fill='white' size="2.4em" onClick={handlerSaveClose} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SettingsPopUp isSettings={isSettings} handlerTimer={handlerTimer} timerTime={timerTime} handlerSaveClose={handlerSaveClose} />
        </section>
    )
}