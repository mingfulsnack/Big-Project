import React, {useContext, useEffect, useRef, useState} from 'react';
import '../assets/scss/AddMusic.css';
import database from '../../db/database';

export default class AddMusic extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            musicDB:[],
            form_music: {}
        }
        this.handleInput = this.handleInput.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.refresh = this.refresh.bind(this);
    }
    componentDidMount(){
        this.refresh();
    }
    async refresh(){
        try{
            const conn = database.collection("musicDB");
            const data = await conn.get();
            const musicDB = [];
            data.docs.map(item=>{
                const d = item.data();
                d.id = item.id;
                musicDB.push(d);                 
            });
            this.setState({musicDB:musicDB});
         }catch(err){
 
         }
    }
    handleInput(event){
        const form_music = this.state.form_music;
        form_music[event.target.name] = event.target.value;
        this.setState({
            form_music: form_music
        })
    }
    async formSubmit(e){
        e.preventDefault();
        try{
            const form_music = this.state.form_music;
            const conn = database.collection("musicDB");
            await conn.add(form_music);  
            this.refresh();  
        }catch(err){
            
        }
       
        return false;
    }

    render(){
    const musicDB = this.state.musicDB;
    return (
        <form  className={"AddMusic"}>
            <div className="add-music-sub-container">
                <div className="d1">
                    <input  accept="image/*" type="file" hidden id={"music-img"}/>
                    
                    <input accept="audio/*" hidden type="file"/>
                </div>
                <div className="d2">
                    <div>
                    <form method="post" onSubmit={this.formSubmit}>
                            <div class="form-group">
                                <input onChange={this.handleInput} type="text" name="name" placeholder=" name"/>
                            </div>
                            <div class="form-group">
                                <input onChange={this.handleInput} type="text" name="img" placeholder="img"/>
                            </div>
                            <div class="form-group">
                                <input onChange={this.handleInput} type="text" name="musicName" placeholder="musicName"/>
                            </div>
                            <div class="form-group">
                                <input onChange={this.handleInput} type="text" name="type" placeholder="type"/>
                            </div>
                            <button type="submit" class="site-btn">Add</button>
                        </form>
                        
                    </div>
                    
                </div>
            </div>

        </form>
    );
}

}
//export default AddMusic;