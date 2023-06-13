import React from 'react';
import '../assets/scss/Playlist.scss';
import {useSelector} from "react-redux";
import MusicCard from "./MusicCard";
import Container from "./Container";
import musicDB from "../../db/music";
import UserContext from "../../context/UserContext"
const Playlist = () => {
    const typeOfPlaylist = window.location.pathname.substring(15);
    const {state,dispatch} = React.useContext(UserContext);
    const {playlists} = useSelector(state=>state.musicReducer);
    var listMusicc;
    for(var i = 0; i < state.list.length;i++){
        if(state.list[i].name.toLowerCase() === typeOfPlaylist)
        {
            
            listMusicc = state.list[i].listMusic;
        }
    } 
    console.log(listMusicc);
    return (
        <Container>
            <div  className={"Playlist"}>
                <h3>Your {typeOfPlaylist} playlist</h3>
                <div className="Playlist-container">
                    {
                        listMusicc.map((musicDis)=>(
                            playlists.map((item)=>(
                                item.id === musicDis &&
                                <MusicCard key={item.id} music={item}/>
                            ))
                        ))
                        
                    }
                </div>
            </div>
        </Container>
    );
}

export default Playlist;