import React, { Component } from "react";
import "./DrawerToggleButton.scss";
import { HamburgerElastic } from 'react-animated-burgers';

class DrawerToggleButton extends Component {
    state = {
        isActive: false
    }

    toggleButton = () => {
        this.setState({
            isActive: !this.state.isActive
        })
    }

    isDrawerOpen = () => {
        setTimeout(() => {
            if(!this.props.isOpen) {
                this.setState({
                    isActive: false
                })
            } 
        })
    }

    render() {
        return (
            <div onClick={this.props.click} className="toggle-button">
                <HamburgerElastic
                    onClick={this.isDrawerOpen()}
                    isActive={this.state.isActive} 
                    toggleButton={this.toggleButton} 
                    barColor="#74dfaf" />
            </div>
        );
    }
}


export default DrawerToggleButton;