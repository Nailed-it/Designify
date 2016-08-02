import React, { Component } from 'react';
import './App.css';
import Content from './Content';
import Header from './Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <Header />
          </div>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}
