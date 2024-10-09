import React, { Component, MouseEventHandler, RefObject } from 'react'
import '../CSS/Tunes.css'
import hiplife from '../Hiplife.jpg'
import hipop from '../Hipop.jpg'
import pop from '../pop.jpg'
import rock from '../Rock.jpg'
import { Link } from 'react-router-dom'


interface SongListType {
    id: string,
    songName: string,
    singer: string,
    category: string

}

interface Tunestype {

    tunesOpen: boolean,
    handleTunesClose: () => void
    Selected: string;
    SearchSong: string;
    songList: SongListType[];
    handleTunesSelected: (type: string) => void;
}

class Tunes extends React.Component<Tunestype> {

    // category:string [] = ['Pop','Hipop','Hiplife','Rock'];

    category: { type: string, imagesrc: any }[] = [{ type: 'Pop', imagesrc: pop},
    { type: 'Hipop', imagesrc: hipop },
    { type: 'Hiplife', imagesrc: hiplife},
    { type: 'Rock', imagesrc: rock}];

    handleCategoryClick = (type: string) => {
        const { handleTunesSelected, handleTunesClose } = this.props;
        handleTunesSelected(type);
        handleTunesClose();
    }

    render() {
        const { tunesOpen, handleTunesClose, Selected, SearchSong, songList, handleTunesSelected } = this.props

        if (tunesOpen == false) {
            return;
        }


        return (
            <div className='tunesoverlay' onMouseLeave={() => this.props.handleTunesClose()}>

                <div className='tunescontent'>
            
                    <div className='tunesdiv'>

                        {this.category.map((item) => (
                            <div className={item.type}>
                                <div className="categoryType " >
                                    <Link onClick={() => { this.handleCategoryClick(item.type) }} to={`/TunesCategory/${item.type}`} >
                                        <div className='itemtype'>
                                            <p className='item_p'>{item.type}</p>
                                        </div>
                                        <img src={item.imagesrc} width='150' height='150' />
                                    </Link>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

        )
    }
}
export default Tunes