import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    main: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        margin: '1rem 0',
        borderRadius: '5px',
        transition: 'all  0.3s linear',
        '&:hover':{
            transform: 'scale(1.05)',
            cursor: 'pointer'
        }
    },
    container: {
        backgroundColor: '#d7dee1',
        height: '120px',
        // width:'100%',
        display: 'flex',
        flexWrap: 'wrap',
        margin: '5px',
        // position: 'relative',
        overflow: 'hidden',
        borderRadius: '5px'
    },
    smallBox: {
        width: '20%',
        height: '25%',

    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0 5px',
        '& p':{
            fontWeight: 'bold',
        },
    }
};



function MiniPalette(props) {
    const { classes, palette, id } = props;
    const smallBoxes = palette.colors.map(color => {
        return <div className={classes.smallBox} style={{background : color.color}}></div>
    });
    return(
        <div className={classes.main} onClick={() => props.goToPalette(id)}>
            <div className={classes.container}>
                {smallBoxes}
            </div>
            <div className={classes.title}>
                <p>{palette.paletteName}</p>
                <span>{palette.emoji}</span>
            </div>
        </div>
    )
}

export default withStyles(styles)(MiniPalette);