import React, {useEffect, useReducer, useState} from "react";
import './App.css';
import Home from "../components/Pages/Home";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "../components/Pages/Login";
import {ThemeContext, themes} from "../api/Theme";
import {useDispatch, useSelector} from "react-redux";
import {setPlaylist} from "../actions/actions";
import {UserProvider} from "../context/UserContext";
import reducer from "../context/reducer";
import musicState from "../context/statePage";
import AddAlbum from "../../src/components/fragment/AddAlbum"
import AddMusic from "../components/fragment/AddMusic";
import firebase from "firebase";
import database from "../db/database";
const App = () => {
  const localState = localStorage.getItem("state")?JSON.parse(localStorage.getItem("state")) : musicState;
  const [state, dispatch] = useReducer(reducer,localState);
  localStorage.setItem("state",JSON.stringify(state));
  const display = state.isBg?"block":"none";
  var dispatch1 = useDispatch();
  
  const ref = firebase.firestore().collection("musicDB");
  const [musicDB, setMusicDB] = useState([]);
  const [loader, setLoader] = useState(true);
  
  async function getData() {
    try {
      const querySnapshot = await ref.get();
      const items = querySnapshot.docs.map((doc) => doc.data());
      setMusicDB(items);
      setLoader(false);
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
  
  const storedDB = JSON.parse(localStorage.getItem("musicDB"));
    //console.log(storeDB);
   
  const {language} = useSelector(state => state.musicReducer);
  useEffect(()=>{
      if (language === null || language.includes("any")){
          dispatch1(setPlaylist(musicDB))
      }
      else if (language.includes('hindi')){
          alert("No hindi tracks available")
      } else {
          let x = musicDB.filter((item)=>(
              item.lang && language.includes(item.lang.toLowerCase())
          ))
          dispatch1(setPlaylist(x))
      }
  },[dispatch1, language]);

  return (
      <div>
                      
      <UserProvider value={{state,dispatch}}>
      
      <ThemeContext.Provider value={themes.light}>
          
          
          <>
          <div id="preloder" style={{display:display}} >
              {
                //console.log(display,state.isBg)
              }
          </div>
          <div id = "addalbum" style={{display:display}}>
              <AddAlbum/>
          </div>
              <Router>
                  <Switch>
                      <Route path="/" exact component={Login}/>
                      <Route path="/home" component={Home}/>
                  </Switch>
              </Router>
              
          </>
      </ThemeContext.Provider>
      </UserProvider>
      </div>
  );
}

export default App;

