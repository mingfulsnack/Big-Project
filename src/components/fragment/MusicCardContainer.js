import React, {useEffect, useState} from "react";
import '../assets/scss/MusicCardContainer.scss';
import MusicCard from "./MusicCard";
import {useSelector} from "react-redux";
import Container from "./Container";
import firebase from "firebase";
function MusicCardContainer() {
  const ref = firebase.firestore().collection("musicDB");
  const [musicDB, setMusicDB] = useState([]);
  
  async function getData() {
    try {
      const querySnapshot = await ref.get();
      const items = querySnapshot.docs.map((doc) => doc.data());
      setMusicDB(items);
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getData();
  }, []);
  
  useEffect(() => {
    localStorage.setItem("musicDB", JSON.stringify(musicDB));
  }, [musicDB]);
    const playlists = musicDB;
    return (
        <Container>
            <div className={"music-card-container"}>
                {
                    playlists.map(item => (
                        <MusicCard key={item.id} music={item}/>
                    ))
                }
            </div>
        </Container>
    );
}

export default MusicCardContainer;
