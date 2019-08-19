import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import styles from './styles/ColorBoxStyles';
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
        this.setState({copied:true});
        setTimeout(() => {
            this.setState({copied:false})
        }, 1500);
    }
    
    render() { 
        const { copied } = this.state;
        const { background, name, moreUrl, showingFullShades, classes } = this.props;
        return (  
            <CopyToClipboard text={background} onCopy={this.handleCopy}>
                <div style={{ background }} className={classes.ColorBox}>
                    <div style={{ background }} className={`${classes.ColorBoxAnimate} ${copied && classes.show}`}/>
                    <div className={`${classes.ColorBoxMsg} ${copied && classes.displayMsg}`}>
                        <h1>COPIED!</h1>
                        <p>{background}</p>
                    </div>
                    <div >
                        <span className={classes.ColorBoxName}>{name}</span>            
                        <button className={classes.CopyButton}>
                        Copy
                        </button>
                    </div>
                    {showingFullShades && (
                    <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                        <span className={classes.showMore}>MORE</span>
                    </Link>
                    )}
                </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(ColorBox);
