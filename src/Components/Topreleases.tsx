import React, { MouseEventHandler, useEffect, useState } from 'react'
import Releases from './Releases';
import '../CSS/Topreleases.css'
import { release } from 'os';


type TopReleases = {
    id: string,
    imageurl: string,
    songurl: string,
    category: string,
    songname: string,
    singer: string
}



export default function Topreleases() {

    const [topReleases, settopReleases] = useState<TopReleases[]>([]);

    const [releaseCategory, setreleaseCategory] = useState('month');

    const [filteredReleases, setfilteredReleases] = useState<TopReleases[]>([])

    const[pausePrevious,setpausePrevious] = useState<HTMLAudioElement>()


    function ReleasesData() {
        const releases = new XMLHttpRequest();
        releases.open('GET', './TopReleases/TopReleases.json', true);
        releases.send();
        releases.onload = () => {
            if (releases.status == 200 && releases.readyState == 4) {
                const releasesData = releases.response;
                const parsedReleases = JSON.parse(releasesData);

                settopReleases(parsedReleases.TopReleasesList);
                console.log(parsedReleases);
                console.log(topReleases);

            }
        }
    }
     function pausing_previous(current:HTMLAudioElement){
        setpausePrevious(current);
    }

    // const SelectreleaseCategory: MouseEventHandler<HTMLInputElement> = (event) => {

    //     const category = (event.target as HTMLInputElement).value;
    //     // console.log(category,"category selected")
    //     setreleaseCategory(category);

    //     // console.log(releaseCategory,"category selected");
    // }

    function SelectreleaseCategory(event:React.ChangeEvent<HTMLInputElement>){
        setreleaseCategory(event.target.value)
    }
    

    function filterCategory() {

        const filteredItem = topReleases.filter(song => song.category == releaseCategory);
        setfilteredReleases(filteredItem)
    }



    useEffect(() => {
        ReleasesData();
        console.log(topReleases.map(item => item))
    }, []);

    useEffect(() =>
        filterCategory(), [releaseCategory,topReleases])

    return (
        <div className=''>
            <div className='radio_release'>
                
                <input type='radio' name='release' id='best_month' value='month' onChange={SelectreleaseCategory} defaultChecked ></input>
                <label className='release_label' htmlFor='best_month' >BEST OF MONTH</label>
                <input type='radio' name='release' id='best_week' value='week' onChange={SelectreleaseCategory}></input>
                <label className='release_label'  htmlFor='best_week'>BEST OF WEEK</label>
                <input type='radio' name='release' id='most_liked' value='liked' onChange={SelectreleaseCategory}></input>
                <label className='release_label'  htmlFor='most_liked'>MOST LIKED</label>
            </div>
            <div className='filteredrelease'>
                {filteredReleases.map(release =>

                    <div>
                        <Releases release={release} pausePrevious={pausePrevious} pausing_previous={pausing_previous}/>

                    </div>)}
            </div>


        </div>
    )
}