import React, { Component, RefObject } from 'react'
import '../CSS/ImageSlider.css'
import Slides from './Slides'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'



interface Slide_Type {
    id: string,
    url: string;
    songurl: string
}

interface ImageSlider_Type {
    Slide: Slide_Type[];
    isPlaying: boolean;
    recordRef: HTMLAudioElement;
}
interface Imagesliderprops_Type {
    songhandle:boolean,
}

class ImageSlider extends React.Component<Imagesliderprops_Type, ImageSlider_Type>{

    constructor(props: any) {
        super(props)

        this.state = {
            Slide: [],
            isPlaying: false,
            recordRef: null as unknown as HTMLAudioElement,

        }
    }

    getImageUrl() {
        const rawFile = new XMLHttpRequest();
        rawFile.open('GET', "ImageSlides.json", true);
        rawFile.send();
        rawFile.onload = () => {
            if (rawFile.readyState == 4 && rawFile.status == 200) {
                let responseobj = rawFile.response;
                let parsedData = JSON.parse(responseobj)

                this.setState({ Slide: parsedData.SlidesList });
                console.log(this.state.Slide)
                console.log("status sucess")
            }
        }
    }

    componentDidMount(): void {
        this.getImageUrl();

    }
    SampleNextArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", fontSize: '35px', right: '35px', color: 'white' }}
                onClick={onClick}
            >
                <i className='fas fa-chevron-right' />
            </div>
        );
    }

    SamplePrevArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", fontSize: '35px', left: '10px', color: 'white', zIndex: '500' }}
                onClick={onClick}
            >
                <i className='fas fa-chevron-left' />
            </div >

        );
    }

    settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 2000,
        initialSlide: 0,

        // arrows: true,
        nextArrow: <this.SampleNextArrow />,
        prevArrow: <this.SamplePrevArrow />,
        responsive: [

            {
                breakpoint: 426,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    autoplay: true,
                }
            },
        ]

    };

    handleisPlaying() {
        this.setState({ isPlaying: true })

    }
    handlenotPlaying() {
        this.setState({ isPlaying: false })
    }
    handlerecordRef(audio: HTMLAudioElement) {
        this.setState({ recordRef: audio })
    }

    render() {
        let autoplay = !this.state.isPlaying;

        this.settings.autoplay = autoplay;
        const{songhandle}=this.props;

        return (
            <div>
                <div className='sliderContainer' id='sliderContainer'>
                    <Slider {...this.settings}>
                        {this.state.Slide.map(slide =>
                            <div key={slide.id}>
                                <Slides Slide={slide} isPlaying={this.state.isPlaying} handleisPlaying={this.handleisPlaying.bind(this)}
                                    recordRef={this.state.recordRef} handlerecordRef={this.handlerecordRef.bind(this)}
                                    handlenotPlaying={this.handlenotPlaying.bind(this)} songhandle={songhandle} />
                            </div>
                        )}
                    </Slider>
                </div>
            </div>
        )
    }
}
export default ImageSlider