import React, { Component } from 'react';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import styles from './styles/NavbarStyles';


class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: this.props.format,
            open: false
        }
        this.handleChangeFormat = this.handleChangeFormat.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleChangeFormat(e){
        this.setState({value : e.target.value, open: true});
        this.props.changeFormat(e.target.value);
    }
    handleClose(){
        this.setState({open : false})
    }
    render() { 
        const { value, open } = this.state;
        const { level, changeLevel, showingLevel, classes} = this.props;
        return (  
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to='/'>reactcolorpicker</Link>
                </div>
                {showingLevel && (
                <div>
                    <span >Level: {level}</span>
                    <div className={classes.slider}>
                        <Slider 
                            min={100} 
                            max={900} 
                            step={100}
                            defaultValue={level}
                            onAfterChange={changeLevel}
                            railStyle={{ height : '8px'}}
                            trackStyle={{backgroundColor: 'transparent'}}
                            handleStyle={{backgroundColor: 'green', outline: 'none', marginTop: '-4px',boxShadow: 'none'}}
                        />
                    </div>
                </div>
                )}
                <div className={classes.NavbarSelect}>
                    <Select
                        value={value}
                        onChange={this.handleChangeFormat}
                        >
                        <MenuItem value={`hex`}>Hex: #ff0055</MenuItem>
                        <MenuItem value={`rgb`}>Rgb: Rgb(255, 255, 255)</MenuItem>
                        <MenuItem value={`rgba`}>Rgba: Rgb(255, 255, 255, 1.0)</MenuItem>
                    </Select>
                    <Snackbar
                        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                        open={open}
                        autoHideDuration={5000}
                        onClose={this.handleClose}
                        ContentProps={{'aria-describedby': 'message-id',}}
                        message={<span id="message-id">{`Format Changed to ${value.toUpperCase()}`}</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="close"
                                color="inherit"
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        ]}
                    />
                </div>

            </header>
        );
    }
}
 
export default withStyles(styles)(Navbar);
