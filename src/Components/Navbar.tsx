
import React, { Component, RefObject } from 'react';
import mtnlogo from '../mtn_logo.png'
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css'
import dropdown from '../dropdown.png'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Tunes from './Tunes';

interface SongListType {
    id: string,
    songName: string,
    singer: string,
    category: string

}

interface Navprops {
    handleTunesOpen: () => void;
    handleLogin_open: () => void;
    handleTunesSelected: (type: string) => void,
    tunesOpen: boolean,
    handleTunesClose: () => void,
    Selected: string,
    SearchSong: string,
    songList: SongListType[];
}
interface Navbar_Type {
    toggleRef: RefObject<HTMLDivElement>
    toggleNav: boolean,
    toggleCategory: boolean,

}


class Navbar extends Component<Navprops, Navbar_Type> {

    constructor(props: any) {
        super(props)
        this.state = {
            toggleRef: React.createRef(),
            toggleNav: false,
            toggleCategory: false,
        }

    }

    category: { type: string }[] = [{ type: 'Pop' },
    { type: 'Hipop' },
    { type: 'Hiplife' },
    { type: 'Rock' }];

    handleNavbar() {
        this.setState({ toggleNav: !this.state.toggleNav },
            () => console.log('navopen', this.state.toggleNav))

    }

    handleCloseNavbar() {
        this.setState({ toggleNav: false })

    }
    componentDidUpdate(prevProps: any): void {
        if (window.innerWidth > 426)
            console.log("component update")
    }

    handleTunesClick() {
        const { handleTunesOpen } = this.props;
        let screen_width = window.innerWidth;


        console.log(screen_width);
        if (screen_width > 426) {
            handleTunesOpen();
            this.setState({ toggleNav: false })
        }
        else {
            this.setState({ toggleCategory: !this.state.toggleCategory })

        }
    }

    handleCategoryClick(type: string) {
        const { handleTunesSelected } = this.props;
        handleTunesSelected(type);
        this.setState({ toggleNav: false })
    }
    // <Link onClick={() => { this.handleCategoryClick(item.type) }} to={`/TunesCategory/${item.type}`} >


    render() {
        const { handleTunesOpen, handleLogin_open,handleTunesSelected,songList,Selected,SearchSong,tunesOpen,handleTunesClose } = this.props;

        // console.log(window.innerWidth);

        return (
            <div>
                <div>
                    <Tunes handleTunesSelected={handleTunesSelected} songList={songList} Selected={Selected}
                        SearchSong={SearchSong} tunesOpen={tunesOpen} handleTunesClose={handleTunesClose} />

                </div>
                <nav>
                    <div className='navbar-innercontent'>
                        <div> <img src={mtnlogo} width="60" height="30" className='logo' ></img></div>
                        <div className='bars_icon' onClick={this.handleNavbar.bind(this)} >
                            {this.state.toggleNav ? <i className='fa fa-close ' /> : <i className='fa fa-bars' />}
                        </div>
                        <div className={this.state.toggleNav ? 'navbar navbar-open' : 'navbar navbar-close'} ref={this.state.toggleRef} >
                            <li><Link onClick={this.handleCloseNavbar.bind(this)} className='routes' to='/'>Home</Link></li>
                            <li ><Link onClick={this.handleCloseNavbar.bind(this)} className='routes' to='/WishList'> WishList </Link></li>
                            <li className='routes' onClick={this.handleTunesClick.bind(this)}><div className='tunes_icon'>Tunes {this.state.toggleNav ? <i className={this.state.toggleCategory ? 'fas fa-chevron-up dropdown' : 'fas fa-chevron-down dropdown'} /> : <i className='fas fa-chevron-down dropdown_d' />}</div>
                                <div className={this.state.toggleCategory ? 'category-outer category_open' : 'category-outer category_close'} >
                                    {this.state.toggleNav &&
                                        <div >{this.category.map(item =>
                                            <div className='category-inner' >
                                                <li><Link className='category_link' onClick={() => { this.handleCategoryClick(item.type) }} to={`/TunesCategory/${item.type}`} >  {item.type}</Link></li>

                                            </div>)}</div>}</div></li>

                            <li><Link onClick={this.handleCloseNavbar.bind(this)} className='routes' to='/Faq'> FAQ </Link></li>
                        </div>
                    </div>

                    <div className='navbar_right'>
                        <i className='fas fa-user-circle' />
                        <li className='routes_right'> Admin</li>

                        <div className="dropdown-content" onClick={handleLogin_open}>
                            <i className="fa fa-sign-out"></i>
                            <a>Logout</a>
                        </div>
                    </div>

                    <div className=''>

                    </div>

                </nav>
            </div>

        )
    }
}
export default Navbar;