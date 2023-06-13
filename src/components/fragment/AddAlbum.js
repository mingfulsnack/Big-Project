import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import UserContext from "../../context/UserContext"
import musicDB from "../../db/music";
const AddAlbum = () => {
  var listtt = musicDB;
  const {state,dispatch} = React.useContext(UserContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const closeClick = () =>{
    var isBg = false;
    var tmp = state;
    tmp.isSelectAlbum = null;
    dispatch({type:"selected_album",payload:tmp});
    dispatch({type:"hide_bg",payload:isBg});
    setSelectedItem(null);
    localStorage.setItem("state",JSON.stringify(state));
    
  };
  const saveClick = () =>{
    var isBg = false;
    var tmp = state;
    for(var i = 0; i < tmp.list.length;i++){
        if(tmp.list[i].id == tmp.isSelectAlbum){
          var x = tmp.list[i];
          console.log(x.listMusic);
          x.listMusic[x.listMusic.length] = tmp.isSelect;
          console.log(x.listMusic);
        }
    }
    
    //console.log(tmp.list[tmp.isSelectAlbum-1]);
    tmp.isSelectAlbum = null;
    dispatch({type:"selected_album",payload:tmp});
    dispatch({type:"hide_bg",payload:isBg});
    setSelectedItem(null);
    localStorage.setItem("state",JSON.stringify(state));
  }
  const buttonClicked = (item) => {
    setSelectedItem(item);
    var tmp = state;
    tmp.isSelectAlbum = item.id;
    dispatch({type:"selected_album",payload:tmp});
    localStorage.setItem("state",JSON.stringify(state));
  };
  const newAlbum = (item) =>{
    var tmp = state.list;
    var nameOfAlbum = document.getElementById("addNewAlbum").value;
    if(nameOfAlbum != ""){
       tmp[state.list.length] = {
          id: state.list.length+1,
          name: nameOfAlbum,
          listMusic:[],
       }
       dispatch({type:"add_album",payload:tmp});
       localStorage.setItem("state",JSON.stringify(state));
    }
  }
  var listt = state.list;
  return (
        <div className="modal show"style={{ display: 'block', position: 'initial' }}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Add to Album</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
              {            
                listt.map((item) => (
                  <div key={item.id}>
                    <p
                      onClick={() => buttonClicked(item)}
                      style={{ backgroundColor: selectedItem === item ? '#ff0000' : 'transparent' }}
                    >
                      {item.name}
                    </p>
                  </div>
                ))
                
              }
            </Modal.Body>
    
            <Modal.Footer id = "dd">
              <Form.Control type="text" placeholder="new Album" id = "addNewAlbum"/>
              <Button variant="primary" onClick = {newAlbum} >New Album</Button>
              <Button  variant="secondary" onClick = {closeClick}>Close</Button>
              <Button variant="primary"onClick = {saveClick}>Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      );
}
export default AddAlbum;