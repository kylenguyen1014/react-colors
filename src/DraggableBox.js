 import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {SortableElement} from 'react-sortable-hoc';
import down from './SizeHelper';

const styles = {
    root: {
        display: 'inline-block',
        width: '20%',
        height: '25%',
        margin: '-2px 0',
        position: 'relative',
        backgroundColor: props => props.background,
        [down('lg')]:{
            width: '25%',
            height:  '20%',
        },
        [down('md')]:{
            width: '50%',
            height:  '10%',
        },
        [down('xs')]:{
            width: '100%',
            height:  '5%',
        },
    },
    main: {
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        '&:hover svg':{
            transform: 'scale(1.5)',
            color: 'white',
            transition: 'all 0.3s ease-in-out',
        }       
    }
    
}
const DraggableBox = SortableElement(props => {
    const { classes, deleteColor, name } = props;
    return (
        <div className={classes.root}>   
            <div className={classes.main}>
                <p>{name}</p>
                <span>
                    <IconButton onClick={() => deleteColor(name)}>
                        <DeleteIcon/>
                    </IconButton>
                </span> 
            </div>
        </div>
    )
})

export default withStyles(styles)(DraggableBox);
