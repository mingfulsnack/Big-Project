const reducer = (state,action)=>{ 
    switch(action.type){
        default: return state;
        case "show_bg":{
            return {...state,isBg:true};
        }
        case "hide_bg":{
            return {...state,isBg:false};
        }   
        case "updateRender":{
            return{...state,hasRender: state.hasRender + 1};
        }
        case "resetRender":{
            return{...state,hasRender: 0};
        }
        case "selected_music":{
            return {...state,isSelect:state.isSelect};
        }
        case "selected_album":{
            return {...state,isSelectAlbum:state.isSelectAlbum};
        }   
        case "add_album":{
            return {...state,list:state.list};
        }
    }
}
export default reducer;