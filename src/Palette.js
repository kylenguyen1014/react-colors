import React, { Component } from 'react';
import ColorBox from './ColorBox';
import { withStyles } from '@material-ui/styles';
import Navbar from './Navbar';
import styles from './styles/PaletteStyles';
import PaletteFooter from './PaletteFooter';
import 'rc-slider/assets/index.css';


class Palette extends Component {
    constructor(props){
        super(props);
        this.state = {
            level: 500,
            format: 'hex'
        }
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this)
    }

    changeLevel(level){
        this.setState({ level });
    }
    changeFormat(value){
        this.setState({format : value});
    }


    render() { 
        const { palette, classes } = this.props;
        const { level, format } = this.state;
        const colorBoxes = palette.colors[level].map(color => 
                <ColorBox 
                    background={color[format]} 
                    name={color.name} 
                    key={color.name}
                    moreUrl={`/palette/${palette.id}/${color.id}`}
                    showingFullShades
                    />
            );
        return ( 
            <div className={classes.Palette}>
                {/* Navbar goes here */}
                <Navbar level={level} 
                        changeLevel={this.changeLevel} 
                        changeFormat={this.changeFormat}
                        format={format}
                        showingLevel
                        />
                <div className={classes.PalleteColors}>
                    {colorBoxes}
                </div>
                <PaletteFooter 
                    paletteName={palette.paletteName} 
                    emoji={palette.emoji}
                />
            </div>
        );
    }
}
 
export default withStyles(styles)(Palette);