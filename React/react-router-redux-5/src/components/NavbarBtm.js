import React from 'react';
import { Nav,NavItem} from 'react-bootstrap';
import { routes } from '../routes';
import { IndexLinkContainer } from 'react-router-bootstrap';


class NavbarBtm extends React.Component{

   render(){
    return (
        <Nav bsStyle="pills"  className="navbar-fixed-bottom">
        { routes.map((route , index) => (
          <IndexLinkContainer to={ route.path } key={index}  activeHref="active">
            <NavItem >
                <img className="cursor-pointer" 
                     src={ route.imageSrc_active }  
                     style={{width:"30px"}}
                     alt ="" 
                    />
                <p className="display-justify-center">{route.title}</p>
            </NavItem>
          </IndexLinkContainer>
        ))}
      </Nav>
    )
   }
   
}

    
export default NavbarBtm