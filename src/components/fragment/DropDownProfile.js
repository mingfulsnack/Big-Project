import React, {useContext} from "react";
import '../assets/scss/DropDownProfile.css';
import {ThemeContext} from "../../api/Theme";
import HoverButton from "./HoverButton";
import {AccountBox, ArrowForward} from "@material-ui/icons";
const DropDownProfile = () => {
    const useStyle = useContext(ThemeContext);
    return (
        <div style={useStyle.component} className="dropdown-profile">
            <HoverButton Icon={AccountBox} variant={"text"} text={"Profile"}/>
            <HoverButton Icon={ArrowForward} variant={"text"} text={"LogOut"}></HoverButton>
            {/*<HoverButton Icon={Explore} variant={"text"} text={"About"}/>*/}
        </div>
    );
}
export default DropDownProfile;