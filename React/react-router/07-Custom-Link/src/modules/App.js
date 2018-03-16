import React from 'react';
import {Route,NavLinkProps} from 'react-router-dom';

function  App (){
    return (
      <div>
        <OldSchoolMenuLink activeOnlyWhenExact={true} to="/" label="Home" />
        <OldSchoolMenuLink to="/about" label="About" />
        <hr />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </div>
    )
}
    
function OldSchoolMenuLink({ label, to, activeOnlyWhenExact }){
    return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => (
        <div className={match ? "active" : ""}>
          {match ? "> " : ""}
          <Link to={to}>{label}</Link>
        </div>
      )}
    />
      )
};
function Home(){
    return 
    <div>
        <h2>Home</h2>
    </div>
};
  
function About(){
    return 
    <div>
      <h2>About</h2>
    </div>
};

export default App;  
