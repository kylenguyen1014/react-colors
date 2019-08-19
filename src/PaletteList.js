import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';
import { Link } from 'react-router-dom';

class PaletteList extends Component {
    constructor(props){
        super(props);
        this.state = {
            palette : ''
        }
        this.goToPalette = this.goToPalette.bind(this);
    }
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.main}>
                    <div className={classes.header}>
                        <h1>React Colors</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </div>
                    
                    <div className={classes.container}>
                        {this.props.palettes.map(palette => {
                            return  <MiniPalette key={palette.id} id={palette.id} palette={palette} goToPalette={this.goToPalette}/>;                                          
                        })}
                    </div>
          
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);
