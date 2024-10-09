import React, { Component, MouseEventHandler } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import WishList from './Components/WishList';
import Tunes from './Components/Tunes';

import TunesCategory from './Components/TunesCategory';
import FaqMain from './Components/FaqMain';
import ErrorPage from './Components/ErrorPage';
import LoginTimeout from './Components/loginTimeout';
import Login from './Components/Login';


interface SongListType {
  id: string,
  songName: string,
  singer: string,
  category: string

}

interface AppType {
  isFetchingData: boolean
  wish_list: SongListType[];
  songList: SongListType[],
  tunesOpen: boolean;
  Selected: string;
  SearchSong: string;
  isMounted: boolean;
  isloginTimeout: boolean;
  isLogin: boolean;
  songhandle: boolean,
  storagehandle: { loginstatus: boolean }
}

class App extends Component<{}, AppType> {

  constructor(props: any) {
    super(props);
    this.state = {
      isFetchingData: false,
      wish_list: [],
      songList: [],
      Selected: 'All',
      SearchSong: '',
      tunesOpen: false,
      isMounted: false,
      isloginTimeout: false,
      isLogin: false,
      songhandle: false,
      storagehandle: { loginstatus: false },
    }
  }

  displaySongList(): void {
    fetch('http://localhost:8000/SongList', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        else {
          console.log("error displaying song data")
        }
      })
      .then(data => {
        this.setState({ songList: data })
        console.log("fetched sucessfully")
      })
      .catch(error => console.log("error in fetching", error));
  }


  displayWishList(): void {
    fetch('http://localhost:8001/Wishlist', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        else {
          console.log("error displaying song data")
        }
      })
      .then(data => {
        this.setState({ wish_list: data })
        console.log("fetched sucessfully")
      })
      .catch(error => console.log("error in fetching", error));
  }

  addWishlist(song: SongListType): void {
    fetch('http://localhost:8001/Wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(song)
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        else {
          console.log("could not add song to wishlist")
        }

      })
      .then((data) => {

        // this.setState({ wish_list: data })
        this.displaySongList();
        console.log("data added to wishlist", data)
      })
      .catch((error) => { return console.log("error in posting data", error) });
  }

  DeleteData(id: string): void {
    fetch('http://localhost:8001/Wishlist/' + id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'aplication/json' },

    })
      .then(response => {
        if (response.ok) {
          console.log("data Deleted sucessfully ", response.json()
            .then(json => console.log(json)))
          this.displayWishList();
          this.displaySongList();

        } else {
          console.log("cannot delete data")
        }
      })
      .catch(error => console.log("Error deleting data", error))
  }

  handleWishList(id: string, song: SongListType) {

    const istrue = this.state.wish_list.some(item => item.id === song.id)
    console.log(this.state.wish_list.map(item => item))

    if (istrue) {
      this.DeleteData(song.id);
      // this.displaySongList();
    }
    else {
      this.addWishlist(song);
      // this.displaySongList();
    }

    this.displaySongList();
    this.displayWishList();
  }


  componentDidMount(): void {
    this.displaySongList();
    this.displayWishList();
    console.log("component app mounted");

    const result = localStorage.getItem('credentials');
    let parsedresult = null;
    if (result) {
      parsedresult = JSON.parse(result)
    }
    console.log(result);
    //this.setState({storagehandle:result?JSON.parse(result): {loginstatus:false}}); 
    if (parsedresult !== null) {
      if (!parsedresult.loginstatus) {
        setTimeout(this.handleLoad.bind(this), 5000)
      }
    }
    else {
      setTimeout(this.handleLoad.bind(this), 5000)
    }
  }
  // componentDidUpdate(prevProps,prevState){
  //   if(this.state.isloginTimeout !== prevState.isloginTimeout|| this.state.isLogin == true ){
  //     this.setState({songhandle:true})
  //     console.log("song handle component")
  //    }
  //   console.log("update component")
  // }

  componentDidUpdate(prevProps: any, prevState: any) {
    // Check if the condition for state update is different from the previous state
    if ((this.state.isloginTimeout !== prevState.isloginTimeout) || (this.state.isLogin !== prevState.isLogin)) {
      if (this.state.isloginTimeout || this.state.isLogin) {
        // Set state only when necessary
        this.setState({ songhandle: true });
        console.log("song handle component");
      }
    }
    console.log("update component");
  }

  songhandle() {
    if (this.state.isloginTimeout == true || this.state.isLogin == true) {
      this.setState({ songhandle: true })
      console.log("song handle component")
    }

  }

  handleLoad() {
    this.setState({ isloginTimeout: true });
    console.log("Load working");

  }

  handleonSelected: MouseEventHandler<HTMLInputElement> = (event) => {
    const value = (event.target as HTMLInputElement).value;
    console.log("on Selected", value);

    this.setState({ Selected: value });
  }
  handleTunesSelected(type: string) {

    this.setState({ Selected: type })
    console.log("getting clicked", type)
  }


  handleonSearch(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ SearchSong: event.target.value })
  }


  handleTunesClose() {
    this.setState({ tunesOpen: false });
  }
  handleTunesOpen() {
    this.setState({ tunesOpen: true })
  }

  handleopenLogin() {
    this.setState({ isloginTimeout: true })
  }
  handlecloseLogin() {
    this.setState({ isloginTimeout: false })
    this.setState({ isLogin: true })
  }
  handleLogin_open() {
    this.setState({ isLogin: true })
    localStorage.removeItem('credentials');
  }

  handleLogin_close() {
    this.setState({ isLogin: false });
  }
  handleStorage_true() {
    this.setState({ storagehandle: { loginstatus: true } },
      () => {
        console.log(this.state.storagehandle);
        localStorage.setItem('credentials', JSON.stringify(this.state.storagehandle))
      });
  }

  render() {
    // this.setState({isFetchingData:false});
    let songs = [];

    if (this.state.Selected == 'All') {
      const filteredAll = this.state.songList.filter(song => song.songName.toLowerCase().includes(this.state.SearchSong.toLowerCase()))
      songs = filteredAll;

    }
    else {
      const categotyfilter = this.state.songList.filter(song => song.category === this.state.Selected && song.songName.toLowerCase().includes(this.state.SearchSong.toLowerCase()))
      songs = categotyfilter;

    }

    // if(this.state.isloginTimeout == true || this.state.isLogin == true ){
    //   this.setState({songhandle:true})
    // }

    return (
      <div className="App">
        <div>
          <Navbar tunesOpen={this.state.tunesOpen} handleTunesClose={this.handleTunesClose.bind(this)} Selected={this.state.Selected} SearchSong={this.state.SearchSong} songList={this.state.songList} handleTunesSelected={this.handleTunesSelected.bind(this)} handleTunesOpen={this.handleTunesOpen.bind(this)} handleLogin_open={this.handleLogin_open.bind(this)} />
        </div>
        {/* <div>
          <Tunes handleTunesSelected={this.handleTunesSelected.bind(this)} songList={this.state.songList} Selected={this.state.Selected}
            SearchSong={this.state.SearchSong} tunesOpen={this.state.tunesOpen} handleTunesClose={this.handleTunesClose.bind(this)} />
        </div> */}
        <div>
          <LoginTimeout isloginTimeout={this.state.isloginTimeout} handlecloseLogin={this.handlecloseLogin.bind(this)} />
        </div>
        <div>
          <Login handleStorage_true={this.handleStorage_true.bind(this)} storagehandle={this.state.storagehandle} isLogin={this.state.isLogin} handleLogin_close={this.handleLogin_close.bind(this)} />
        </div>
        <Routes>
          <Route path='/' element={<Home Selected={this.state.Selected}
            SearchSong={this.state.SearchSong}
            handleonSelected={this.handleonSelected.bind(this)}
            handleonSearch={this.handleonSearch.bind(this)}
            handleWishList={this.handleWishList.bind(this)}
            songList={this.state.songList} displaySongList={this.displaySongList.bind(this)}
            DeleteData={this.DeleteData.bind(this)} wish_list={this.state.wish_list}
            addWishlist={this.addWishlist.bind(this)} songhandle={this.state.songhandle} />}>
          </Route>

          <Route path='/WishList' element={<WishList wish_list={this.state.wish_list} displayWishList={this.displayWishList.bind(this)}
            isFetchingData={this.state.isFetchingData} DeleteData={this.DeleteData.bind(this)} />}> </Route>

          <Route path='/TunesCategory/:category' element={<TunesCategory Song={songs} handleWishList={this.handleWishList.bind(this)} wish_list={this.state.wish_list} />}></Route>
          <Route path='/Faq' element={<FaqMain />}></Route>
          <Route path='/*' element={<ErrorPage />}></Route>

        </Routes>
      </div>
    );
  }
}

export default App;
