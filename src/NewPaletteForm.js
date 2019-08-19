import React, { Component } from 'react';

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {arrayMove} from 'react-sortable-hoc';
import DraggableList from './DraggableList';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  main: {
      height: '90vh',

  },
  buttonGroup: {
      marginLeft: 'auto',
      '& button': {
          margin: '0 0.5rem',
      }
  }
});

class NewPaletteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
             open: false,
             currentColor: 'purple',
             newName:'',
             colors : []
        }
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSavePalette = this.handleSavePalette.bind(this);
        this.deleteColor = this.deleteColor.bind(this);
    }

    componentDidMount() {
        // custom rule will have name 'isColoNamerUnique'
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
            return this.state.colors.every(color => color.name.toLowerCase() !== value.toLowerCase())
        });
        // custom rule will have name 'isColorUnique'
        ValidatorForm.addValidationRule('isColorUnique', () => {
            return this.state.colors.every(color => color.color !== this.state.currentColor)
        });
    }

    handleDrawerOpen() {
        this.setState({ open : true});
    }
    
    handleDrawerClose() {
        this.setState({ open : false});
    }
    handleColorChange(color){
        this.setState({currentColor: color.hex});
    }
    handleSubmit(){
        const newColor = {
            name: this.state.newName,
            color: this.state.currentColor
        }
        this.setState({colors: [...this.state.colors, newColor], newName: ''});
    }
    handleNameChange(evt){
        this.setState({newName: evt.target.value})
    }

    handleSavePalette(){
        const newName = "New Palette Colors";
        const newPalette = {
            paletteName: newName,
            id: newName.toLowerCase().replace(/ /g, '-'),
            emoji: "🎨",
            colors: this.state.colors
        };
        console.log(newPalette);
        this.props.savePalette(newPalette);
        this.props.history.push('/');
    }
    deleteColor(name){
      this.setState({colors: this.state.colors.filter(color => color.name !== name)})
    }

    onSortEnd = ({oldIndex, newIndex}) => {
      this.setState(({colors}) => ({
        colors: arrayMove(colors, oldIndex, newIndex),
      }));
    };

    render() { 
        const {classes, theme} = this.props;
        const { open, currentColor, newName, colors } = this.state;
        return (
            <div className={classes.root}>
              <CssBaseline />
              <AppBar
                color='default'
                position="fixed"
                className={clsx(classes.appBar, {
                  [classes.appBarShift]: open,
                })}
              >
                <Toolbar >
                    
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={this.handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography  variant="h6" noWrap>
                    Create A Palette
                  </Typography>
                  <div className={classes.buttonGroup}>
                    <Button variant='contained' color='secondary' onClick={() => this.props.history.push('/')}>
                            GO BACK
                    </Button>
                    <Button variant='contained' color='primary' onClick={this.handleSavePalette}>
                            SAVE PALETTE
                    </Button>
                  </div>
                </Toolbar>
              </AppBar>
              <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <div className={classes.drawerHeader}>
                  <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon /> 
                  </IconButton>
                </div>
                {/* <Divider /> */}
                <Typography variant='h5' >
                    Design Your Palette
                </Typography>
                <div>
                    <Button variant='contained' color='secondary'>
                        CLREAT PALETTE
                    </Button>
                    <Button variant='contained' color='primary'>
                        RANDOM COLOR
                    </Button>
                </div>                
                <ChromePicker 
                    color={currentColor}
                    onChangeComplete={this.handleColorChange}
                />
                <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
                    <TextValidator
                        label='Color Name'
                        onChange={this.handleNameChange}
                        name='newName'
                        value={newName}
                        validators={['required', 'isColorUnique', 'isColorNameUnique']}
                        errorMessages={['This field is required', 'This color has been taken','Color name must be unique']}
                    />
                    <Button 
                        style={{backgroundColor : currentColor}} 
                        variant='contained'
                        color='primary'
                        type='submit'
                        >
                        ADD COLOR
                    </Button>
                </ValidatorForm>
                
              </Drawer>
              <main
                className={clsx(classes.content, {
                  [classes.contentShift]: open,
                })}
              >
                <div className={classes.drawerHeader} />
                <div className={classes.main}>
                    {/* {colors.map((color,index) => {
                        return <DraggableBox index={index} background={color.color} name={color.name} key={color.name} deleteColor={this.deleteColor}/>
                    })} */}
                    <DraggableList 
                      colors={this.state.colors} 
                      deleteColor={this.deleteColor} 
                      axis='xy' 
                      onSortEnd={this.onSortEnd}
                      distance={20}
                    />
                </div>
                
              </main>
            </div>
          );
    }
}
 
export default withStyles(styles, { withTheme : true})(NewPaletteForm);