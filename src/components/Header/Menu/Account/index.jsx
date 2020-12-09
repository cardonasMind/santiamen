import { PureComponent } from "react";

import { mainContext } from "../../../../context";

import Logged from "./Logged";
import Login from "./Login";

export default class extends PureComponent {
    static contextType = mainContext;

    render() {
        const { uid, name, photoURL, handleLogout } = this.context.user;
        
        return(
            <div id="menu-account">
                <div id="account-data">
                    { uid !== "" ? <Logged name={name} uid={uid} handleLogout={handleLogout} /> : <Login /> }   
                </div>
                <div id="account-photo" />

                <style jsx>{`
                    #menu-account {
                        margin-bottom: 1rem;
                        display: grid;            
                        grid-template-columns: 1fr auto;                   
                        grid-gap: 1rem;
                    }

                    #account-photo {
                        width: 60px;  
                        height: 60px;
                        border-radius: .4rem;  
                        background-color: rgba(0, 0, 0, .15);
                        background-image: url(${photoURL ? photoURL : ""});
                        background-size: cover;
                        background-position: center;    
                    }
                `}</style>
            </div>
        )
    }
}