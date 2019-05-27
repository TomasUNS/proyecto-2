import React, { Component } from 'react';
import "./css/utilities.css";

//Seccion de botones y nombre del avatar

export default class Utilities extends Component {
    
    render () {
        return (
            <>
                <div className="d-flex justify-content-center" id="textFlex">
                    <input type="text" className="form-control" id="avatarName" placeholder="Avatar Name" 
                           value={this.props.name}>
                    </input>
                </div>
                <div className="d-flex justify-content-center" id="buttonsFlex">
                    <button className="btn btn-secondary" id="cancelButton" onClick={this.props.returnToDefault}>
                        Cancel Changes
                    </button>
                    <button className="btn btn-primary" id="saveButton" 
                            onClick={this.props.saveChanges.bind (this.props.name)}>
                        Save Avatar
                    </button>
                </div>
            </>
        );
    }

}