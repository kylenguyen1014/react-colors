import React, { Component } from 'react';
import 'rc-slider/assets/index.css';

import ColorBox from './ColorBox';
import './Palette.css';
import Navbar from './Navbar';

class Palette extends Component {
    constructor(props){
        super(props);
        this.state = {
            level: 500
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(level){
        this.setState({ level });
    }

    render() { 
        
        const colorBoxes = this.props.palette.colors[this.state.level].map(color => 
                <ColorBox background={color.hex} name={color.name}/>
            );
        return ( 
            <div className='Palette'>
                {/* Navbar goes here */}
                <Navbar level={this.state.level} handleChange={this.handleChange}/>
                <div className='Pallete-colors'>
                    {/* bunch of color boxes */}
                    {colorBoxes}
                </div>
                {/* footer goes here */}
            </div>
        );
    }
}
 
export default Palette;