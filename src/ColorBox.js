import React, { Component } from 'react';
import './ColorBox.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            copied: false,
         }
         this.handleCopy = this.handleCopy.bind(this)
    }
    handleCopy(){
        // this.setState({copied:true}, () => {
        //     setTimeout( this.setState({copied:false}), 10000)
        // });
        this.setState({copied:true});
        setTimeout(() => {
            this.setState({copied:false})
        }, 1500);
    }
    render() { 
        const { background, name } = this.props;
        return (  
            <CopyToClipboard text={background} onCopy={this.handleCopy}>
                <div style={{ background }} className='ColorBox'>
                    <div style={{ background }} className={`ColorBox-animate ${this.state.copied && 'show'}`}/>
                    <div className={`ColorBox-msg ${this.state.copied && 'display-msg'}`}>
                        <h1>COPIED!</h1>
                        <p>{background}</p>
                    </div>
                    <div className='ColorBox-info'>
                        <span className='ColorBox-name'>{name}</span>            
                        <button className='ColorBox-copy-button'>
                        Copy
                        </button>
                    </div>
                    <span className='ColorBox-show-more'>More</span>
                </div>
            </CopyToClipboard>
        );
    }
}
 
export default ColorBox;
