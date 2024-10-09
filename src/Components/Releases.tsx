import React, { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react'
import '../CSS/Releases.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

type ReleasesProps = {
    id: string,
    imageurl: string,
    songurl: string,
    category: string,
    songname: string,
    singer: string
}

type Release_Type = {
    release: ReleasesProps;
    pausePrevious: HTMLAudioElement | undefined;
    pausing_previous: (current: HTMLAudioElement) => void
}

export default function Releases({ release, pausePrevious, pausing_previous }: Release_Type) {

    const [playSong, setplaySong] = useState(false);
    const songRef = useRef<HTMLAudioElement>(null);

    function PlaySong() {
        const song_status = songRef.current;

        setplaySong(!playSong);
        if (playSong) {
            song_status?.pause();
        }
        else {
            if(pausePrevious && pausePrevious!==song_status){
                pausePrevious.pause();
                pausePrevious.currentTime =0;
            }

            if (song_status) {
                pausing_previous(song_status);
            }
            song_status?.play();
        }
    }
    function handleClick(event:any){
        const playRecord = document.getElementById('icon')
        const song_status = songRef.current;
        if(song_status && playRecord && !song_status.contains(event.target) && !playRecord.contains(event.target)){

            song_status.pause();
            song_status.currentTime = 0;
            
        }
    }
    useEffect(()=>
    document.addEventListener('click',handleClick),[])

    return (

        <div>
            <div className='cardouter'>
                <div className='image_div'>
                    <img className='image' src={release.imageurl} ></img>
                    <i id='icon' className={!playSong ? 'fa fa-play play_button' : 'fa fa-pause play_button'} onClick={PlaySong} />
                    <audio ref={songRef} src={release.songurl} onEnded={()=>setplaySong(false)}onPause={()=>setplaySong(false)} ></audio>
                </div>
                <div className='cardinner'>
                    <h4>{release.songname}</h4>
                    <p>{release.singer}</p>
                </div>
            </div>
        </div>
    )
}
