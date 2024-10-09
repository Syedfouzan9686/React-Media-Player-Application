import React, { Component, MouseEventHandler } from 'react'
import musicimage from '../musicgirl.png';
import menu from '../menu_icon.png'
import star from '../star.png'
import staryellow from '../staryellow.png'
import '../CSS/Card.css'
import WishList from './WishList';
import Pagination from './Pagination';


interface SongListType {

    id: string,
    songName: string,
    singer: string,
    category: string
}

interface songType {
    menuDisplay: { [key: string]: boolean },
    currentPage: number;
    songsperPage: number;
    minimumPagelimit: number,
    maximumPagelimit: number
    // totalPages:number;

}
interface SelectedType {   // this is props interface
    songList?: SongListType[];
    handleWishList?: (id: string, song: SongListType) => void
    wish_list: SongListType[]
    DeleteData?: (id: string) => void
    Selected?: string,
    SearchSong?: string,

}

class Card extends Component<SelectedType, songType>{

    constructor(props: any) {
        super(props);
        this.state = {
            menuDisplay: {},
            currentPage: 1,
            songsperPage: 10,
            minimumPagelimit: 0,
            maximumPagelimit: 4,
            // totalPages:0,

        }
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    handleMenu(songId: string) {
        this.setState(prevState => ({
            menuDisplay: {
                // ...prevState.menuDisplay,
                [songId]: !prevState.menuDisplay[songId]
            }
        }));
        // console.log("menu clicked", this.state.menuDisplay);
    }

    handleOutsideClick(event: MouseEvent) {
        const clickedInsideMenu = (event.target as HTMLElement).closest('.menudiv');
        if (!clickedInsideMenu) {
            // Close all menu items
            this.setState({ menuDisplay: {} });
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick);
    }

    handlePage(number: number) {
        this.setState({ currentPage: number },
            () => {
                console.log("this is handle page ", this.state.currentPage, number);
            })
    }

    componentDidUpdate(prevProps: any): void {
        const { Selected, SearchSong } = this.props;

        if (Selected != prevProps.Selected || SearchSong != prevProps.SearchSong) {
            this.setState({ currentPage: 1 })
            this.handlePrevious();
        }
    }

    handlePrevious() {
        this.setState({ minimumPagelimit: this.state.minimumPagelimit - this.state.minimumPagelimit,maximumPagelimit: this.state.maximumPagelimit - this.state.minimumPagelimit,currentPage:this.state.minimumPagelimit   })
    }
    handleNext() {
        this.setState({ minimumPagelimit: this.state.minimumPagelimit + this.state.maximumPagelimit, maximumPagelimit: this.state.maximumPagelimit + this.state.maximumPagelimit,currentPage:this.state.maximumPagelimit +1})
     

    }

    toggle = '';

    render() {

        const { songList, wish_list, handleWishList, DeleteData, Selected, SearchSong } = this.props;

        console.log(Selected, SearchSong, "this is selected search song");


        if (!DeleteData) {
            this.toggle = 'Wishlist'
        }
        else {
            this.toggle = 'Remove'
        }
        ////////////////////////////////////////////////////////
        let totalPages;
        if (songList) {
            let resultPages = songList?.length / this.state.songsperPage
            totalPages = Math.ceil(resultPages);
            // console.log(totalPages);
        }


        const startIndex = (this.state.currentPage - 1) * this.state.songsperPage;
        const lastIndex = startIndex + this.state.songsperPage;
        const records = songList?.slice(startIndex, lastIndex)


        return (
            <div className='cardsdiv_outer '>
                <div className='cardsdivs'>
                    {records?.map(song => (<div className='cardss'>
                        <img src={musicimage} className='image1' width='250' height='150'></img>

                        <img src={menu} className='image2' onClick={() => this.handleMenu(song.id)} width='30' height='30'></img>

                        <div key={song.id}>
                            {this.state.menuDisplay[song.id] &&

                                <div className='menudiv' onClick={() => handleWishList?.(song.id, song)}>
                                    {Array.isArray(wish_list) && wish_list.some(item => item.id === song.id) ?
                                        <img src={staryellow} width='20' height='20'></img>
                                        :
                                        <img src={star} width='18' height='18'></img>
                                    }
                                    <a onClick={() => DeleteData?.(song.id)} >{this.toggle}</a>

                                </div>}
                        </div>
                        <div className='h3_p'>
                            <h3>{song.songName}</h3>
                            <p>{song.singer}</p>
                        </div>
                    </div>))}

                </div>
                <div>
                    <Pagination totalPages={totalPages} handlePage={this.handlePage.bind(this)} minimumPagelimit={this.state.minimumPagelimit}
                        maximumPagelimit={this.state.maximumPagelimit} handlePrevious={this.handlePrevious.bind(this)}
                        handleNext={this.handleNext.bind(this)} currentPage={this.state.currentPage} />
                </div>
            </div>
        )
    }
}
export default Card 