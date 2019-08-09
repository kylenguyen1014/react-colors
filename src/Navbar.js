import React, { Component } from 'react';
import Slider from 'rc-slider';
import './Navbar.css';

class Navbar extends Component {
    render() { 
        return (  
            <header className='Navbar'>
                <div className='logo'>
                    <a href='/'>reactcolorpicker</a>
                </div>
                <div className='slider-container'>
                    <span className='slider-label'>Level: {this.props.level}</span>
                    <div className='slider'>
                    <Slider 
                        min={100} 
                        max={900} 
                        step={100}
                        defaultValue={this.props.level}
                        onAfterChange={this.props.handleChange}
                        railStyle={{ height : '8px'}}
                        trackStyle={{backgroundColor: 'transparent'}}
                        handleStyle={{backgroundColor: 'green', outline: 'none', marginTop: '-4px',boxShadow: 'none'}}
                    />
                </div>
                </div>
                
            </header>
        );
    }
}
 
export default Navbar;