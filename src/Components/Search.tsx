
import React, { Component } from 'react'
import '../CSS/Search.css'
import '@fortawesome/fontawesome-free/css/all.css';

interface SearchType {
    SearchSong:string;
    handleSearch:(event:React.ChangeEvent<HTMLInputElement>)=> void
}
class Search extends Component<SearchType> {

    

    render() {
        const {SearchSong,handleSearch} = this.props;

        console.log(SearchSong)
        return (
            <div className='search_div'>
                <div className="searchBox">
                    <input className="searchInput" type="text" value={SearchSong} onChange={handleSearch}  placeholder="Type to search"/>
                        <button className="searchButton">
                            <i className="fa fa-search"/>
                        </button>
                </div>
            </div>
        )
    }
}
export default Search