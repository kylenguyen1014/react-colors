import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import generateColors from './colorHelpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (  
      <div className="App">
        <Palette palette={generateColors(seedColors[4])}/>
    </div>
    );
  }
}
 
export default App;