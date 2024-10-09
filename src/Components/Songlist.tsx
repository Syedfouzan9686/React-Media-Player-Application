import React, { Component } from 'react'
import '../CSS/Songlist.css'
import musicimage from '../musicgirl.png';
import menu from '../menu_icon.png'
import star from '../star.png'
import staryellow from '../staryellow.png'
import Card from './Card';



interface SongListType {

    id: string,
    songName: string,
    singer: string,
    category: string
}

interface songType {

    search: string,
    filteredItem: SongListType[],

}

interface SelectedType {   // this is props interface
    Selected: string;
    SearchSong: string;
    addWishList: (song: SongListType) => void;
    wish_list: SongListType[]
    DeleteData: (id: string) => void
    songList: SongListType[]
    displaySongList: () => void
    handleWishList: (id: string, song: SongListType) => void
}

class SongList extends Component<SelectedType, songType> {
    constructor(props: any) {
        super(props);
        this.state = {
            search: '',
            filteredItem: []
        }
        
    }
    filteredItem :SongListType []=[]
    hidden = '';


    render() {
        const { Selected, SearchSong, addWishList, wish_list, songList, displaySongList, handleWishList } = this.props;
         console.log("filterd",this.state.filteredItem)

         let songs=[];

         if(Selected == 'All'){
            const filteredAll = songList.filter(song => song.songName.toLowerCase().includes(SearchSong.toLowerCase()))
                songs = filteredAll;
                          
        }
        else {
            const categotyfilter = songList.filter(song => song.category === this.props.Selected && song.songName.toLowerCase().includes(SearchSong.toLowerCase())) 
            songs = categotyfilter;
            
        }
        if(songs.length == 0){
            this.hidden = "cardsdiv"
        }
        else{
            this.hidden = "hidden"
        }




        return (
            <div className='cardsdiv_oute'>
                {/* {songs.length == 0 ? this.hidden = "cardsdiv": ''} */}
                <div className={this.hidden}>
                    {songs.length == 0 ? <h3>! No Songs Are Available... </h3>:null}
                    <Card songList={songs} handleWishList={handleWishList} wish_list={wish_list} Selected={Selected} SearchSong={SearchSong}/>
                    {/* <Pagination /> */}
                </div>
                
            </div>
        )
    }
}
export default SongList
