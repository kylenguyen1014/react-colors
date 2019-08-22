import React, { Component } from 'react';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import generateColors from './colorHelpers';
import { Route, Switch, Redirect } from 'react-router-dom';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Page from './Page';

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
      <Route render={({location}) => 
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={500} classNames='page'>
            <Switch location={location}>
              <Route 
                exact path='/palette/new' 
                render={(routeProps) => <Page><NewPaletteForm {...routeProps} palettes={this.state.palettes} savePalette={this.savePalette}/></Page>}
              />
              <Route 
                exact path='/palette/:paletteId/:colorId' 
                render={(routeProps) => <Page><SingleColorPalette {...routeProps} palette={generateColors(this.fintPalette(routeProps.match.params.paletteId))}/></Page>}
              />    
              <Route 
                exact path='/' 
                render={(routeProps)=> <Page><PaletteList palettes={this.state.palettes} {...routeProps} deletePalette={this.deletePalette}/></Page>} 
              />
              <Route 
                exact path='/palette/:id' 
                render={(routeProps) => <Page><Palette {...routeProps} palette={generateColors(this.fintPalette(routeProps.match.params.id))}/></Page>}
              />
              <Route 
                render={()=> <Page><Redirect to='/'/> </Page>} 
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      }/>
        
    </div>
    );
  }
}
 
export default App;