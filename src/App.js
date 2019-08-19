import React, { Component } from 'react';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import generateColors from './colorHelpers';
import { Route, Switch } from 'react-router-dom';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      palette: seedColors,
    }
    this.savePalette = this.savePalette.bind(this);
  }
  fintPalette(id){
    return this.state.palette.find(palette => {
      return palette.id === id;
    })
  }
  savePalette(newPalette){
    this.setState(st => {
      return {palette: [...st.palette, newPalette]}
    })
  }
  render() { 
    return (  
      <div className="App">
        {/* <Palette palette={generateColors(seedColors[4])}/> */}
        <Switch>
          <Route 
            exact path='/palette/new' 
            render={(routeProps) => <NewPaletteForm {...routeProps} palettes={this.state.palette} savePalette={this.savePalette}/>}
          />
          <Route 
            exact path='/palette/:paletteId/:colorId' 
            render={(routeProps) => <SingleColorPalette {...routeProps} palette={generateColors(this.fintPalette(routeProps.match.params.paletteId))}/>}
          />
          <Route 
            exact path='/' 
            render={(routeProps)=> <PaletteList palettes={this.state.palette} {...routeProps}/>} 
            />
          <Route 
            exact path='/palette/:id' 
            render={(routeProps) => <Palette {...routeProps} palette={generateColors(this.fintPalette(routeProps.match.params.id))}/>}
          />
         
        </Switch>
    </div>
    );
  }
}
 
export default App;