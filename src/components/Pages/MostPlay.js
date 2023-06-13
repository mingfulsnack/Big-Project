import React, {useEffect, useState} from 'react';
import './css/Profile.css';
import {Avatar} from "@material-ui/core";
import {useSelector} from "react-redux";
import MusicCard from "../fragment/MusicCard";
import Container from "../fragment/Container";
import Grade from 'grade-js';
import SideBarOptions from "../fragment/SideBarOptions";
import {PlaylistPlay} from "@material-ui/icons";

function MostPlay() {
    
    var playlists = [];
    const [mostPlayed, setMostPlayed] = useState([]);
    useEffect(() => {
        async function fetchData() {
          try {
            playlists = JSON.parse(localStorage.getItem("musicDB"));
            console.log(playlists);
            setMostPlayed(playlists);
          } catch (error) {
            // Xử lý lỗi tại đây
            console.error(error);
          }
        }
      
        fetchData();
      }, []);
      
    return (
        <Container>
            <div className={"Profile"}>
                    
                    <div className="profile-detail">
              
                        <span className={"profile-playlist"}>
                            <SideBarOptions className={"lib-sub"} Icon={PlaylistPlay}
                                            href={"/home/playlist/instrumental"} title={"Instrumental"}/>
                            <SideBarOptions className={"lib-sub"} Icon={PlaylistPlay} href={"/home/playlist/electronic"}
                                            title={"Electronic"}/>
                        </span>
                    </div>
                
                <div className="bottom-profile">
                    <div>
                        <h3>Most Played</h3>
                        <div className="most-played">
                            {
                                mostPlayed.map((item, index) => (
                                    index <= 4 && <MusicCard key={item.id} music={item}/>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        </Container>
    );
}

export default MostPlay;