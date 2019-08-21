import React, { Component } from 'react';
import seedColors from './seedColors';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/NewPaletteFormStyles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {arrayMove} from 'react-sortable-hoc';
import DraggableList from './DraggableList';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

class NewPaletteForm extends Component {
    constructor(props) {
        super(props);
        this._allColor = seedColors.map(palette => palette.colors).flat();
        this.state = {
             open: false,
             currentColor: 'purple',
             newColorName:'',
             colors : [],
             dialogOpen: false,
             emojiOpen: false,
             emoji: '',
             newPaletteName: ''
        }
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSavePalette = this.handleSavePalette.bind(this);
        this.deleteColor = this.deleteColor.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
        this.toogleDialog = this.toogleDialog.bind(this);
        this.openEmoji = this.openEmoji.bind(this);
        this.closeEmoji = this.closeEmoji.bind(this);
        this.saveEmoji = this.saveEmoji.bind(this);
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
        ValidatorForm.addValidationRule('isPaletteNameUnique', () => {
            return this.props.palettes.every(palette => palette.paletteName.toLowerCase() !== this.state.newPaletteName.toLowerCase())
        });
    }
    addRandomColor(){
      let rand = Math.floor(Math.random() * this._allColor.length);
      let isDuplicate = true
      while (isDuplicate){
        rand = Math.floor(Math.random() * this._allColor.length);
        if (!this.state.colors.includes(this._allColor[rand])){
          isDuplicate = false
        }
      }
      this.setState({colors: [...this.state.colors, this._allColor[rand]]});
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
          name: this.state.newColorName,
          color: this.state.currentColor
      }
      this.setState({colors: [...this.state.colors, newColor], newName: ''});
    }
    handleNameChange(evt){
        this.setState({[evt.target.name]: evt.target.value})
    }

    handleSavePalette(){
        const newPaletteName = this.state.newPaletteName;
        const newPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, '-'),
            emoji: this.state.emoji,
            colors: this.state.colors
        };
        console.log(newPalette);
        this.props.savePalette(newPalette);
        this.props.history.push('/');
    }
    deleteColor(name){
      this.setState({colors: this.state.colors.filter(color => color.name !== name)})
    }
    clearPalette(){
      this.setState({colors : []});
    }

    toogleDialog(){
      this.setState({dialogOpen: !this.state.dialogOpen})
    }
    openEmoji(){
      this.setState({dialogOpen: false, emojiOpen: true})
    }
    closeEmoji(){
      this.setState({emojiOpen: false})
    }
    saveEmoji(emoji){
      this.setState({emoji: emoji.native});
    }

    onSortEnd = ({oldIndex, newIndex}) => {
      this.setState(({colors}) => ({
        colors: arrayMove(colors, oldIndex, newIndex),
      }));
    };


    render() { 
        const {classes} = this.props;
        const { open, currentColor, newColorName, colors, dialogOpen, emojiOpen ,newPaletteName } = this.state;
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
                    <Button variant='contained' color='primary' onClick={this.toogleDialog}>
                            SAVE PALETTE
                    </Button>
                      <Dialog open={dialogOpen} onClose={this.toogleDialog} aria-labelledby='palette-name-title'>
                        <DialogTitle id='palette-name-title'>Palette Name</DialogTitle>
                        <ValidatorForm onSubmit={this.openEmoji}>
                          <DialogContent>
                            <DialogContentText>
                              Enter a name for the new palette
                            </DialogContentText>
                            <TextValidator 
                              autoFocus
                              label="Palette's name"
                              onChange={this.handleNameChange}
                              name='newPaletteName'
                              value={newPaletteName}
                              validators={['required','isPaletteNameUnique']}
                              errorMessages={['This field is required','This name has been taken']}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={this.toogleDialog} color="primary">
                              Cancel
                            </Button>
                            <Button  color="primary" type='submit' >
                              Continue
                            </Button>
                          </DialogActions>
                        </ValidatorForm>
                      </Dialog>
                      <Dialog open={emojiOpen} onClose={this.closeEmoji}>
                        <DialogTitle id='palette-name-title'>Pick an Emoji</DialogTitle>
                        <DialogContent>
                          <Picker set='emojione' onSelect={this.saveEmoji}/>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={this.handleSavePalette} color="primary" type='submit'>
                              Finish 
                          </Button>
                        </DialogActions>
                      </Dialog>
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
                <Divider />
                <div className={classes.addColor}>
                  <Typography variant='h4' >
                      Design Your Palette
                  </Typography>
                  <div>
                      <Button variant='contained' color='secondary' onClick={this.clearPalette}>
                          CLREAT PALETTE
                      </Button>
                      <Button variant='contained' color='primary' onClick={this.addRandomColor} disabled={colors.length >= 20}>
                          RANDOM COLOR
                      </Button>
                  </div>                
                  <ChromePicker 
                      width={'360px'}
                      color={currentColor}
                      onChangeComplete={this.handleColorChange}
                  />
                  <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
                      <TextValidator
                          fullWidth
                          label='Color Name'
                          onChange={this.handleNameChange}
                          name='newColorName'
                          value={newColorName}
                          validators={['required', 'isColorUnique', 'isColorNameUnique']}
                          errorMessages={['This field is required', 'This color has been taken','Color name must be unique']}
                      />
                      <Button 
                          fullWidth 
                          size='large'
                          style={{backgroundColor : currentColor}} 
                          variant='contained'
                          color='primary'
                          type='submit'
                          disabled={colors.length >= 20}
                          >
                          ADD COLOR
                      </Button>
                  </ValidatorForm>
                </div>
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