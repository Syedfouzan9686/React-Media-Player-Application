import React from 'react'
import Card from './Card'

import '../CSS/TunesCategory.css'
import {   useParams  } from 'react-router-dom'

import popstarter from '../popstarter.jpg'
import hipopstarter from '../Hipopstarter3.jpg'
import hiplifestarter from '../Hiplifestarter1.jpg'
import rockstarter from '../rockstarter.jpg'
import invalid from '../categoryinvalid2.jpg'



interface SongListType {
  id: string,
  songName: string,
  singer: string,
  category: string

}
type  TunesCategorytype = {
  handleWishList: (id: string, song: SongListType) => void
  Song: SongListType[];
  wish_list: SongListType[];
  

}

function TunesCategory({handleWishList,Song,wish_list}:TunesCategorytype) {


    const{category} = useParams();

    let starterSrc = '';

  switch (category) {
    case 'Pop':
      starterSrc = popstarter;
      break;
    case 'Hipop':
      starterSrc = hipopstarter;
      break;
    case 'Hiplife':
      starterSrc = hiplifestarter;
      break;
    case 'Rock':
      starterSrc = rockstarter;
      break;
    default:
      starterSrc = invalid; // Set default starterSrc or handle error case
      // alert("not valid")
      break;
  }
   
 
    return (


      <div className='popdiv'>
        <img className='popimage' src={starterSrc}  />
        <div className='popinner'>
          {starterSrc != invalid && 
            <Card songList={Song} handleWishList={handleWishList} wish_list={wish_list} />}
      
        </div>
      </div>

    )
  }

export default TunesCategory;