import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import React, { useState, useRef, useEffect } from 'react';
import repeatOnec from '../source/home/repeat-once.svg'
import repeat from '../source/home/repeat.svg'
const audio = [
    { name: 'Trance', author: 'Metro Boomin, Travis Scott, Young Thug', url: 'https://mp3uk.net/mp3/files/metro-boomin-travis-scott-young-thug-trance-mp3.mp3' },
    { name: 'Let Me Down Slowly', author: 'Alec Benjamin', url: 'https://dilozor.com/uploads/music/2022/08/pesnya-let-me-down-slowly-mp3.mp3' },
    { name: '7 Years', author: 'Lukas Graham', url: 'https://muzon-club.net/uploads/files/2022-08/lukas-graham-7-years_456289194.mp3' },
    { name: "I don't wanna know", author: 'Mario Winans', url: 'https://minty.club/artist/mario-winans/i-dont-wanna-know-feat-puff-diddy-and-enya/mario-winans-i-dont-wanna-know-feat-puff-diddy-and-enya.mp3' },
    { name: "ChillHop", author: 'Lo Fi Hip Hop', url: 'https://now.morsmusic.org/load/1360783713/Lo_Fi_Hip_Hop_-_ChillHop_(musmore.com).mp3' },
    { name: "Spirit Blossom", author: 'RomanBelov', url: 'https://cdn.pixabay.com/download/audio/2022/01/21/audio_31743c58bd.mp3?filename=spirit-blossom-15285.mp3' },
    { name: "Lofi Vintage", author: 'FASSounds', url: 'https://cdn.pixabay.com/download/audio/2023/02/28/audio_71fcd6def3.mp3?filename=lofi-vintage-140859.mp3' },
    { name: "Changing Pictures", author: 'Chillmore', url: 'https://cdn.pixabay.com/download/audio/2023/03/14/audio_1ae18b8298.mp3?filename=changing-pictures-142580.mp3' },
    { name: "We Relax", author: 'Chillmore', url: 'https://cdn.pixabay.com/download/audio/2022/08/03/audio_b334a8a284.mp3?filename=we-relax-116238.mp3' },
    { name: "Relaxing Beats", author: 'Chillmore', url: 'https://cdn.pixabay.com/download/audio/2022/06/18/audio_beb31dadd1.mp3?filename=relaxing-beats-113556.mp3' },
    { name: "LoFi Hip Hop Chill", author: 'Vladislav Kurnikov', url: 'https://cdn.pixabay.com/download/audio/2022/05/31/audio_7ce80932aa.mp3?filename=lofi-hip-hop-chill-112368.mp3' },
    { name: "The Feelings Lo Fi", author: 'Diamond Tunes', url: 'https://cdn.pixabay.com/download/audio/2022/02/11/audio_9733a69f44.mp3?filename=the-feelings-lo-fi-20700.mp3' },
    { name: "Moody Lofi Song", author: 'Virtuosound', url: 'https://cdn.pixabay.com/download/audio/2021/09/17/audio_632058ff5b.mp3?filename=moody-lofi-song-8445.mp3' },
    { name: "6:32am", author: 'Magiksolo', url: 'https://cdn.pixabay.com/download/audio/2022/11/15/audio_0799ab7080.mp3?filename=632am-125999.mp3' },
    { name: "Be", author: 'Magiksolo', url: 'https://cdn.pixabay.com/download/audio/2022/10/16/audio_73bdcd8075.mp3?filename=be-123122.mp3' },
    { name: "Lonely Night", author: 'Magiksolo', url: 'https://cdn.pixabay.com/download/audio/2022/11/21/audio_277f63db4f.mp3?filename=lonely-night-126676.mp3' },
    { name: "Lofi Chill Vlog", author: 'OYStudio', url: 'https://cdn.pixabay.com/download/audio/2023/01/09/audio_fc6fbbaa2c.mp3?filename=lofi-chill-vlog-132712.mp3' },
    { name: "Inspiring LoFi Beat", author: 'Penguinmusic', url: 'https://cdn.pixabay.com/download/audio/2022/12/16/audio_55e7a8329d.mp3?filename=inspiring-lofi-beat-129545.mp3' },
    { name: "Bellyache", author: 'Billie Eilish', url: 'https://deliciouspeaches.com/get/music/20170830/muzlome_Billie_Eilish_-_bellyache_47841904.mp3' },
    { name: "Lost On You", author: 'LP', url: 'https://dl.muzoff.net/uploads/files/2019-03/1552082103_lp-lost-on-you.mp3' },
]
interface sound {
    name?: string,
    author?: string,
    url?: string
}

export const PlayerSound = ({ name, author, }: sound) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [nowPlay, setNowPlay] = useState({ url: audio[0].url, name: audio[0].name, author: audio[0].author });
    const [repeatHandler, setRepeatHandler] = useState(false);

    const audioPlayer: any = useRef(); // reference our audio component
    const progressBar: any = useRef(); // reference our progress bar
    const animationRef: any = useRef(); // reference the animation
    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration)
        setDuration(seconds);
        progressBar.current.max = seconds;

    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])
    const calculateTime = (secs: number) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`
    }

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrenTime()
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrenTime()
    }

    const changePlayerCurrenTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`);
        setCurrentTime(progressBar.current.value);
    }

    const handlerChangeMusic = (url: string, name: string, author: string, index: number) => {
        const newSound = { url: url, name: name, author: author };
        setNowPlay(newSound)
        audioPlayer.current.src = url;
        audioPlayer.current.pause()
        autoPlayNextSound();
        cancelAnimationFrame(animationRef.current);
        setTimeout(function () {
            animationRef.current = requestAnimationFrame(whilePlaying);
        }, 150)
    }

    const handlerEnded = () => {
        togglePlayPause();
        const index = audio.findIndex(x => x.name === nowPlay.name);
        if (index === audio.length - 1) {
            setNowPlay(audio[0]);
            audioPlayer.current.src = audio[index + 1].url;
            audioPlayer.current.pause();
            autoPlayNextSound();
        }
        else {
            setNowPlay(audio[index + 1]);
            audioPlayer.current.src = audio[index + 1].url;
            audioPlayer.current.pause();
            autoPlayNextSound();
        }
    }

    const autoPlayNextSound = () => {
        setTimeout(function () {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
            setIsPlaying(true)
        }, 150);
    }

    return (
        <>
            <div className="sound__item now">
                <div className="sound__item-now__information">
                    <h3 className="sound-item-now__title">Now Playing</h3>
                    <div className="sound-item-now__name">{nowPlay.name}</div>
                    <div className="sound-item-now__author">{nowPlay.author}</div>
                </div>
                <div className="sound-item__sound">
                    {repeatHandler ?
                        <audio ref={audioPlayer} src={nowPlay.url} preload='metadata' loop></audio>
                        :
                        <audio ref={audioPlayer} src={nowPlay.url} preload='metadata' onEnded={handlerEnded}></audio>

                    }
                    <button onClick={togglePlayPause} className="playPause">
                        {isPlaying ? <FaPause /> : <FaPlay className='play' />}
                    </button>
                    <div className='currentTime'>{calculateTime(currentTime)}</div>
                    <div>
                        <input type="range" className='progressBar' defaultValue="0" ref={progressBar} onChange={changeRange} />
                    </div>
                    <div className='duration'>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
                    {repeatHandler ?
                        <img src={repeatOnec} alt="" onClick={() => setRepeatHandler(false)} className="repeat-btn" />
                        :
                        <img src={repeat} alt="" onClick={() => setRepeatHandler(true)} className="repeat-btn" />
                    }
                </div>
            </div>
            <div className="sound-items__content">
                {audio.map((item, index) => (
                    <div className="sound__item select" key={index}>
                        <div className="sound-item__sound">
                            <button onClick={() => handlerChangeMusic(item.url, item.name, item.author, index)} className="playPause select">
                                <FaPlay className='play' />
                            </button>
                        </div>
                        <div className="sound-item__information">
                            <div className="sound-information__name">{item.name}</div>
                            <div className="sound-information__author">{item.author}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}