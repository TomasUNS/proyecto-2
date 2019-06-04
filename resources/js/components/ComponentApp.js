import React, { Component } from 'react';
import axios from 'axios';
import "./css/componentApp.css";
import AvatarView from './AvatarView'
import AvatarComponents from './AvatarComponents'
import ElementSelect from './ElementSelect'
import Utilities from './Utilities'

//Clase base de la aplicacion

export default class ComponentApp extends Component {
    
    state = {
        currentAvatar: {
            "avatar_id": null,
            "avatar_name": "", 
            "hair": "Hair1", 
            "shirt": "Shirt1", 
            "beard": "Beard1"
        },
        allAvatar: []
    };

    render () {
        return (
            <>
                <div className="d-flex justify-content-center" id="topFlex">
                    <div className="col-md-9" id="editor">
                        <AvatarView avatar={this.state.currentAvatar}/>
                    </div>
                    <div className="col-md-3" id="options">
                        <AvatarComponents avatar={this.state.currentAvatar} 
                                          componentChange={this.componentChange}/>
                    </div>
                </div>
                <div className="d-flex justify-content-center" id="bottomFlex">
                    <div className="col-md-9" id="previous">
                        <ElementSelect avatarList={this.state.allAvatar} 
                                       setSavedAvatar={this.setSavedAvatar}/>
                    </div>
                    <div className="col-md-3" id="buttons">
                        <Utilities name={this.state.currentAvatar.avatar_name} 
                                   returnToDefault={this.returnToDefault} 
                                   saveChanges={this.saveChanges}
                                   updateName={this.updateName}/>
                    </div>
                </div>
            </>
        );
    }

    componentDidMount () {
        try {
            axios.get ('/api/app/avatars').then (response => {
                this.setState({
                    allAvatar: response.data
                });
            });
        } 
        catch (event) {
            console.log('Axios Request Failed: ', event);
        }
    }

    componentChange = (avatar) => {
        this.setState ({
            currentAvatar: {
                "avatar_id": this.state.currentAvatar.avatar_id,
                "avatar_name": this.state.currentAvatar.avatar_name,
                "hair": avatar.hair,
                "shirt": avatar.shirt,
                "beard": avatar.beard
            }
        });
    }

    saveChanges = () => {
        if (this.state.currentAvatar.avatar_name == "") {
            alert ("Error: Name field is empty.");
        }
        else {
            try {
                if (this.state.currentAvatar.avatar_id == null) {
                    axios.post ('api/app/avatars', {
                        avatar_name: this.state.currentAvatar.avatar_name,
                        hair: this.state.currentAvatar.hair,
                        shirt: this.state.currentAvatar.shirt,
                        beard: this.state.currentAvatar.beard
                    }).then (response => {
                        console.log ('From Handle Submit ', response.statusText);
                        this.setState ({
                            currentAvatar: {
                                "avatar_id": response.data,
                                "avatar_name": this.state.currentAvatar.avatar_name,
                                "hair": this.state.currentAvatar.hair,
                                "shirt": this.state.currentAvatar.shirt,
                                "beard": this.state.currentAvatar.beard
                            }
                        }, () => {
                            this.setState ({
                                allAvatar: this.state.allAvatar.concat (this.state.currentAvatar)
                            })
                        });
                    });
                }
                else {
                    axios.put (('api/app/avatars/' + this.state.currentAvatar.avatar_id), {
                        avatar_id: this.state.currentAvatar.avatar_id,
                        avatar_name: this.state.currentAvatar.avatar_name,
                        hair: this.state.currentAvatar.hair,
                        shirt: this.state.currentAvatar.shirt,
                        beard: this.state.currentAvatar.beard
                    }).then (response => {
                        console.log ('From Handle Submit ', response.data);
                        let currentAvatarPlace = 0;
                        for (let I = 0; I < this.state.allAvatar.length; I++) {
                            if (this.state.allAvatar[I].avatar_id == this.state.currentAvatar.avatar_id) {
                                currentAvatarPlace = I;
                                break;
                            }
                        }
                        const firstHalf = this.state.allAvatar.slice (0, currentAvatarPlace);
                        const secondHalf = this.state.allAvatar.slice (currentAvatarPlace + 1, this.state.allAvatar.length);
                        const firstPlusNewAvatar = firstHalf.concat (this.state.currentAvatar);
                        this.setState ({
                            allAvatar: firstPlusNewAvatar.concat (secondHalf)
                        });
                    });
                }
            }
            catch (event) {
                console.log('Axios Request Failed: ', event);
            }
        }
    }

    returnToDefault = () => {
        this.setState ({
            currentAvatar: {
                "avatar_id": null,
                "avatar_name": "",
                "hair": "Hair1",
                "shirt": "Shirt1",
                "beard": "Beard1"
            }
        });
    }

    setSavedAvatar = (avatar) => {
        this.setState ({
            currentAvatar: {
                "avatar_id": avatar.avatar_id,
                "avatar_name": avatar.avatar_name,
                "hair": avatar.hair,
                "shirt": avatar.shirt,
                "beard": avatar.beard
            }
        });
    }

    updateName = (newName) => {
        this.setState ({
            currentAvatar: {
                "avatar_id": this.state.currentAvatar.avatar_id,
                "avatar_name": newName,
                "hair": this.state.currentAvatar.hair,
                "shirt": this.state.currentAvatar.shirt,
                "beard": this.state.currentAvatar.beard
            }
        });
    }

}