import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Avatar } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

class PaletteList extends Component {
    constructor(props){
        super(props);
        this.state = {
            palette : '',
            openDialog: false,
            deletingId: ''
        }
        this.goToPalette = this.goToPalette.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }
    openDialog(id){
        this.setState(st => ({openDialog : true, deletingId : id}))
    }
    closeDialog(){
        this.setState(st => ({openDialog : false, deletingId : ''}))
    }
    handleDelete(e){
        this.props.deletePalette(this.state.deletingId); 
        this.setState({openDialog: false});
    }
    render() {
        const { classes, deletePalette, palettes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.main}>
                    <div className={classes.header}>
                        <h1>React Colors</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </div>
                    
                    <TransitionGroup className={classes.container}>
                        {palettes.map(palette => {
                            return  (<CSSTransition
                                        key={palette.id}
                                        timeout={500}
                                        classNames='fade'
                                    >
                                        <MiniPalette 
                                            key={palette.id} 
                                            id={palette.id} 
                                            palette={palette} 
                                            goToPalette={this.goToPalette} 
                                            // handleDeletePalette={deletePalette}
                                            openDialog={this.openDialog}
                                        />
                                    </CSSTransition>
                                    )                               
                        })}
                        
                    </TransitionGroup>
                    <div>
                        <Dialog open={this.state.openDialog} onClose={this.closeDialog} aria-labelledby='delete-palette'>
                            <DialogTitle id='delete-palette'>Delete palette?</DialogTitle>
                            <List>
                                <ListItem button onClick={this.handleDelete}>
                                    <ListItemAvatar>
                                        <Avatar style={{backgroundColor: blue[100], color : blue[600]}} >
                                            <CheckIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Delete'/>
                                </ListItem>
                                <ListItem button  onClick={this.closeDialog}>
                                    <ListItemAvatar>
                                        <Avatar style={{backgroundColor: red[100], color : red[600]}} >
                                            <CloseIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Cancel'/>
                                </ListItem>
                            </List>
                        </Dialog>
                    </div>
          
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);
