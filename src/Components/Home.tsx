
import React, { Component, MouseEventHandler } from 'react';
import '../CSS/Home.css'
import Search from './Search';
import Category from './Category';
import SongList from './Songlist';
import Tunes from './Tunes';
import ImageSlider from './ImageSlider';
import Topreleases from './Topreleases';

interface SongListType {
    id:string,
    songName:string,
    singer:string,
    category:string

}

// interface HomeType {
//     Selected : string;
//     SearchSong : string;
// }

type Homeprops =  {
    
    addWishlist:(song:SongListType)=> void
    wish_list:SongListType[]
    DeleteData:(id:string)=>void
    songList:SongListType[]
    displaySongList:()=>void
    handleWishList:(id:string,song:SongListType)=>void
    Selected:string;
    SearchSong:string;
    handleonSelected:MouseEventHandler<HTMLInputElement>;
    handleonSearch:(event:React.ChangeEvent<HTMLInputElement>)=> void;
    songhandle:boolean,
}


class Home extends Component<Homeprops> {

    render() {
    
        const {addWishlist,wish_list,DeleteData,songList,displaySongList,handleWishList}:Homeprops = this.props;
        const{Selected,SearchSong,handleonSelected,handleonSearch,songhandle} = this.props

        return (
            <>
            <div>
                <ImageSlider songhandle={songhandle}/>
            </div>
            <div>
                <Topreleases/>
            </div>
                <div className='Searchdiv'>
                    <Search SearchSong={SearchSong} handleSearch={handleonSearch} />
                    <div className='CategoryDiv'>
                    <Category handleSelected={handleonSelected} Selected = {Selected}/>
                </div>
                </div>
                <div className='songListdiv'>
                    <SongList handleWishList={handleWishList} songList={songList} displaySongList={displaySongList} DeleteData={DeleteData} wish_list={wish_list}  addWishList={addWishlist}
                     SearchSong={SearchSong} Selected={Selected}/>
                </div>
                
            </>
        )
    }
}
export default Home;