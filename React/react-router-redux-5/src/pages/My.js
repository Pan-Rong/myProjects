import React from 'react';
import { PageHeader, Nav, NavItem } from 'react-bootstrap';
import { Route} from 'react-router-dom';
import { IndexLinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';


function My({routes}){
    return (            
    <div>
        <PageHeader className="page-header-top">我的</PageHeader>
        <Nav  bsStyle="tabs"   className="display-flex-space-between">
        {routes.map((route,i) => (
            <IndexLinkContainer key={i} to = {route.path}  activeHref="active">
                <NavItem ><p> {route.title} </p></NavItem>
            </IndexLinkContainer>
        ))}
        </Nav>
        {routes.map((route,i) => (
            <Route key={i} 
              path = {route.path}
              render = {props => ( 
                // 渲染组件  
                <route.component {...props}/>
            )}
        />
        ))}
    </div>
    )
}
My.propTypes = {
    routes: PropTypes.array.isRequired
  }

export default My;
