import React, { Component, RefObject } from 'react'
import '../CSS/Slides.css'



interface Slide_Type {
    id: string,
    url: string;
    songurl: string
}

interface ImageSlider_Type {
    Slide: Slide_Type;
    isPlaying: Boolean;
    handleisPlaying: () => void;
    handlenotPlaying:()=>void
    recordRef: HTMLAudioElement;
    handlerecordRef: (audio: HTMLAudioElement) => void
    songhandle:boolean,
    // handlePlaySide:()=>void
}

interface Slides_Type {
    // audio:HTMLAudioElement
    isPlay: boolean;
    // recordRef: HTMLAudioElement;
}

class Slides extends Component<ImageSlider_Type, Slides_Type>{
    audioRef: RefObject<HTMLAudioElement>;
    constructor(props: any) {
        super(props)
        this.state = {

            isPlay: false,
            // recordRef: null as unknown as HTMLAudioElement,

        }
        this.audioRef = React.createRef<HTMLAudioElement>();
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }


    playSong() {
        const audio = this.audioRef.current;
        const { id, url, songurl } = this.props.Slide
        const { handleisPlaying,handlenotPlaying, isPlaying, recordRef, handlerecordRef } = this.props
        
        this.setState({ isPlay: !this.state.isPlay });

        console.log("audio Current ref", audio);
        // console.log("audio track", id, url, songurl)
        
        if (this.state.isPlay) {
            audio?.pause();
            handlenotPlaying();
        }
        else {
            if (recordRef && recordRef !== audio) {
                recordRef.pause(); // Pause the previously playing audio
                recordRef.currentTime = 0;
                // handlenotPlaying();
            }
            audio?.play();
            handleisPlaying();
            if (audio) {
                handlerecordRef(audio); // Update recordRef to the currently playing audio
            }
        }

    }

    
      componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick);
      }
    
      componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
      }
    
    //   handleDocumentClick(event:any) {
    //     const audio = this.audioRef.current;
    //     // Check if the click event occurred outside of the audio element
    //     if (audio && !audio.contains(event.target)) {
    //       // Pause the audio if it's playing
    //       if (!audio.paused) {
    //         audio.pause();
    //       }
    //     }
    //   }
      handleDocumentClick(event: any) {
        const audio = this.audioRef.current;
        const playButton = document.querySelector('play_btn');

        // Check if the click event occurred outside of the audio element and play button
        if (audio && playButton && !audio.contains(event.target) && !playButton.contains(event.target)) {
            // Pause the audio if it's playing
            if (!audio.paused) {
                audio.pause();
                this.setState({ isPlay: false });
            }
        }
    }



    render() {
        const { id, url, songurl } = this.props.Slide;
        const { handleisPlaying,handlenotPlaying} = this.props;
        
        return (
            <div key={id} className='slidesContainer'>
                <img src={url} />
                <div className='play_div' >
                    <i className={this.state.isPlay ? 'fa fa-pause play_btn' : 'fa fa-play pause_btn'} onClick={() => this.playSong()} />
                    <audio src={songurl} ref={this.audioRef} onEnded={() => this.setState({ isPlay: false })} onPause={()=>this.setState({isPlay:false})} > </audio>

                </div>
            </div>
        )
    }
}
export default Slides