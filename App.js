import React, {useEffect} from "react";
import './App.scss';
import Home from "../components/Pages/Home";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "../components/Pages/Login";
import {ThemeContext, themes} from "../api/Theme";
//import musicDB from "../db/music";
import {useDispatch, useSelector} from "react-redux";
import {setPlaylist} from "../actions/actions";
import AddMusic from "../components/fragment/AddMusic";
import firebase from "firebase";
import { useState } from "react";
import database from "../db/database";

const App = () => {
    
   const ref = firebase.firestore().collection("musicDB");
   const [musicDB,setMusicDB] = useState([]);
   const [loader,setLoader] = useState(true);
   function getData(){
    ref.onSnapshot((querySnapshot)=>{
        const items = [];
        querySnapshot.forEach((doc)=>{
            items.push(doc.data())
        })
        setMusicDB(items)
        setLoader(false)
    })
   }
   useEffect(()=>{
    getData()
   },[])
   useEffect(()=>{
    
   },[musicDB])
   
   localStorage.setItem("musicDB",JSON.stringify(musicDB));
   const storeDB = JSON.parse(localStorage.getItem("musicDB"));
  console.log(storeDB);
   
    const {language} = useSelector(state => state.musicReducer);

    const dispatch = useDispatch();
    useEffect(()=>{
        if (language === null || language.includes("any")){
            dispatch(setPlaylist(storeDB))
        }
        else if (language.includes('hindi')){
            alert("No hindi tracks available")
        } else {
            let x = storeDB.filter((item)=>(
                item.lang && language.includes(item.lang.toLowerCase())
            ))
            dispatch(setPlaylist(x))
        }
    },[dispatch, language]);

    return (
        <ThemeContext.Provider value={themes.light}>
            <>
                <Router>
                    <Switch>
                        <Route path="/" exact component={Login}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/home/add" component={AddMusic}/>
                    </Switch>
                </Router>
            </>
        </ThemeContext.Provider>
    );
}

export default App;