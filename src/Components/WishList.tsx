import React, { Component } from 'react'
import '../CSS/WishList.css'
import Card from './Card';

interface SongListType {
    id: string,
    songName: string,
    singer: string,
    category: string

}


type Homeprops = {
    DeleteData: (id: string) => void
    isFetchingData: boolean
    wish_list: SongListType[]
    displayWishList: () => void
}

interface WishListType {
    menuDisplay: { [key: string]: boolean }


}

class WishList extends Component<Homeprops, WishListType>{

    constructor(props: Homeprops) {
        super(props);
        this.state = {
            menuDisplay: {},

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
        console.log("menu clicked", this.state.menuDisplay);
    }
    componentDidMount(): void {
        const { displayWishList } = this.props
        displayWishList();
        document.addEventListener('mousedown', this.handleOutsideClick);
    }
    handleOutsideClick(event: MouseEvent) {
        const clickedInsideMenu = (event.target as HTMLElement).closest('.menudiv');
        if (!clickedInsideMenu) {
            // Close all menu items
            this.setState({ menuDisplay: {} });
        }
    }


    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick);
    }

    hidden = '';


    render() {
        const { wish_list, DeleteData, isFetchingData, displayWishList } = this.props

        if(wish_list.length == 0){
            this.hidden = "cardsdiv_wishlist"
        }
        else{
            this.hidden = "hidden"
        }
        return (
            <div className='wishlistouter'>
            <div className={this.hidden}>
                {wish_list.length == 0 && <h3>! No Songs in WishList...</h3> }
                <Card songList ={wish_list} wish_list={wish_list} DeleteData={DeleteData} />
        
            </div>
            </div>
        )
    }
}
export default WishList