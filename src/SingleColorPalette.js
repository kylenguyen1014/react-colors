import React, { Component } from 'react'
import ColorBox from './ColorBox';
import { withStyles } from '@material-ui/styles';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import styles from './styles/SingleColorPaletteStyles';


class SingleColorPalette extends Component {
    constructor(props){
        super(props);
        this.state={
            format: 'hex'
        }
        this._colors = this.getPaletteColor(this.props.palette, this.props.match.params.colorId);
        this.changeFormat = this.changeFormat.bind(this);
    }

    getPaletteColor(palette, colorIdFilterBy){
        let shades = [];
        for (let color in palette.colors){
            shades = shades.concat(palette.colors[color].filter(shade => shade.id === colorIdFilterBy))
        }
        return shades.slice(1);
    }
    changeFormat(value){
        this.setState({format : value});
    }

    render() {
        const { format } = this.state;
        const { palette, classes } = this.props;
        const shades = this._colors.map(color => {
            return  <ColorBox 
                        background={color[format]} 
                        name={color.name} 
                        key={color.name}
                        showingFullShades={false}
                    />
        })
        return (
            <div className={classes.SinglePalette}>
                <Navbar
                    format={format}
                    showingLevel={false}
                    changeFormat={this.changeFormat}
                />
                <div className={classes.SinglePalleteColors}>
                    {shades}
                    <div className={classes.goBack} onClick={() => this.props.history.goBack()}>
                        <span>GO BACK</span>
                    </div>
                </div>
                <PaletteFooter 
                    paletteName={palette.paletteName} 
                    emoji={palette.emoji}
                />
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);