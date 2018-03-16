import React from 'react';
import { CSSTransition } from 'react-transition-group';

function Fade({ children, ...props }){
    return (
    <CSSTransition
      {...props}
      timeout={1000}
      classNames="fade"
    >
      {children}
    </CSSTransition>
    )
}
  class App extends React.Component {
    constructor(...args) {
      super(...args);
      this.state = { show: false }
  
      setInterval(() => {
        this.setState({ show: !this.state.show })
      }, 5000)
    }
    render() {
      return (
        <Fade in={this.state.show}>
          <div className='greeting'>Hello world</div>
        </Fade>
      )
    }
  }
export default App;