import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Link} from 'react-router-dom';
import './index.css';
class About extends Component{
  render(){
    return <div>About</div>
  }
}
class Repos extends Component{
  render(){
    return <div>Repos</div>
  }
}
class App extends Component {
  render() {
    return (   
      <div>
        <Route path="/">
          <div>Hello, React Router!</div>
        </Route>
        <Route path="/repos" component={Repos}></Route>
        <Route path="/about" component={About}></Route>
      </div>
    );
  }
}

ReactDOM.render(
   <BrowserRouter><App /></BrowserRouter>, 
  document.getElementById('root')
  );

  
