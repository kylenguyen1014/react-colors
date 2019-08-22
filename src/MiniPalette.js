import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    main: {
        backgroundColor: 'white',
        margin: '1rem 0',
        borderRadius: '5px',
        transition: 'all  0.3s linear',
        // position: 'relative',
        '&:hover':{
            transform: 'scale(1.05)',
            cursor: 'pointer'
        },
        '&:hover svg': {
            opacity: '1',
        }
        
    },
    container: {
        backgroundColor: '#d7dee1',
        height: '120px',
        // display: 'flex',
        // flexWrap: 'wrap',
        margin: '5px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '5px',
        
    },
    smallBox: {
        width: '20%',
        height: '25%',
        position: 'relative',
        display: 'inline-block',
        margin: '-2px 0',
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0 5px',
        '& p':{
            fontWeight: 'bold',
        },
    },
    delete: {
        
    },
    deleteIcon: {
        width: '25px',
        color: 'white',
        backgroundColor: '#eb3d3d',
        position: 'absolute',  
        top: '0',
        right: '0',
        zIndex: '10',
        opacity: '0',
        transition: 'opacity 0.5 ease-in-out'
        
    }
};



class MiniPalette extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        // this.handleDelete = this.handleDelete.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
      }

    // handleDelete(e){
    //     this.props.handleDeletePalette(this.props.id);
    //     e.stopPropagation();
        
    // }
    handleOpenDialog(e){
        this.props.openDialog(this.props.id);
        e.stopPropagation();
    }
    render() {
        const { classes, palette, id, goToPalette } = this.props;
        
        const smallBoxes = palette.colors.map(color => {
            return <div key={color.name} className={classes.smallBox} style={{background : color.color}}></div>
        });
        return(       
            <div className={classes.main} onClick={() => goToPalette(id)}>
                <div className={classes.delete}  onClick={this.handleOpenDialog}>
                    <DeleteIcon className={classes.deleteIcon}/>           
                </div>
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
}

export default withStyles(styles)(MiniPalette);