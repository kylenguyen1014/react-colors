import React, { Component } from 'react';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import generateColors from './colorHelpers';
import { Route, Switch, Redirect } from 'react-router-dom';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      palettes: JSON.parse(localStorage.getItem('palettes')) || seedColors,
    }
    this.savePalette = this.savePalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  componentDidUpdate(prevProps, prevState){
    if (this.state.palettes !== prevState.palettes){
      localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
    }
  }
  deletePalette(id){
    this.setState({palettes: this.state.palettes.filter(palette => palette.id !== id)})
  }
  fintPalette(id){
    return this.state.palettes.find(palette => {
      return palette.id === id;
    })
  }
  savePalette(newPalette){
    this.setState(st => {
      return {palettes: [...st.palettes, newPalette]}
    })
  }
  render() { 
    return (  
      <div className="App">
        {/* <Palette palette={generateColors(seedColors[4])}/> */}
        <Switch>
          <Route 
            exact path='/palette/new' 
            render={(routeProps) => <NewPaletteForm {...routeProps} palettes={this.state.palettes} savePalette={this.savePalette}/>}
          />
          <Route 
            exact path='/palette/:paletteId/:colorId' 
            render={(routeProps) => <SingleColorPalette {...routeProps} palette={generateColors(this.fintPalette(routeProps.match.params.paletteId))}/>}
          />
          <Route 
            exact path='/' 
            render={(routeProps)=> <PaletteList palettes={this.state.palettes} {...routeProps} deletePalette={this.deletePalette}/>} 
            />
          <Route 
            exact path='/palette/:id' 
            render={(routeProps) => <Palette {...routeProps} palette={generateColors(this.fintPalette(routeProps.match.params.id))}/>}
          />
          <Route 
            render={()=> <Redirect to='/'/> } 
          />
        </Switch>
    </div>
    );
  }
}
 
export default App;