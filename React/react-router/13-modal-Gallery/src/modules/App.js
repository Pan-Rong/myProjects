import React from 'react';
import {Route,Link,Switch} from 'react-router-dom';

class ModalSwitch extends React.Component{
    previousLocation = this.props.location;
    componentWillUpdate(nextProps){
        const {location} = this.props;
        if(
            nextProps.history.action !=="POP" && 
            (!location.state || !location.state.modal)
        ){
            this.previousLocation = this.props.location;
        }
    }
    render(){
        const {location} = this.props;
        const isModal =!!(
            location.state &&
            location.state.modal &&
            this.previousLocation !== location
        );
        return (
        <div>
            <Switch location={isModal ? this.previousLocation : location}>
                <Route exact path="/" component={Home} />
                <Route path="/gallery" component={Gallery} />
                <Route path="/img/:id" component={ImageView} />
            </Switch>
            {isModal ? <Route path="/img/:id" component={Modal} /> : null}
        </div>
        )
    }
}

const IMAGES = [
    { id: 0, title: "Dark Orchid", color: "DarkOrchid" },
    { id: 1, title: "Lime Green", color: "LimeGreen" },
    { id: 2, title: "Tomato", color: "Tomato" },
    { id: 3, title: "Seven Ate Nine", color: "#789" },
    { id: 4, title: "Crimson", color: "Crimson" }
  ];

  function Thumbnail({color}){
    return (
        <div
            style={{
                width: 50,
                height: 50,
                background: color
            }}
        />
    )
  }

  function Image({color}){
    return (
        <div
            style={{
                width: "100%",
                height: 400,
                background: color
            }}
        />
      )
  }

function Home(){
    return (
    <div>
        <Link to="/gallery">Visit the Gallery</Link>
        <h2>Featured Images</h2>
        <ul>
            <li>
                <Link to="/img/2">Tomato</Link>
            </li>
            <li>
                <Link to="/img/4">Crimson</Link>
            </li>
        </ul>
    </div>
    )
}
function Gallery(){
    return (
    <div>
        {IMAGES.map(i => (
            <Link
                key={i.id}
                to={{
                    pathname: `/img/${i.id}`,
                    // this is the trick!
                    state: { modal: true }
                }}
             >
                <Thumbnail color={i.color} />
                <p>{i.title}</p>
            </Link>
        ))}
    </div>
    )
}
function ImageView({match}){
    const image = IMAGES[parseInt(match.params.id, 10)];
    if (!image) {
        return <div>Image not found</div>;
      }
    return (
        <div>
          <h1>{image.title}</h1>
          <Image color={image.color} />
        </div>
      );
}
function Modal({match,history}){
    const image = IMAGES[parseInt(match.params.id, 10)];
    if (!image) {
      return null;
    }
    const back = e => {
        e.stopPropagation();
        history.goBack();
    };
    return (
        <div
          onClick={back}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: "rgba(0, 0, 0, 0.15)"
          }}
        >
          <div
            className="modal"
            style={{
              position: "absolute",
              background: "#fff",
              top: 25,
              left: "10%",
              right: "10%",
              padding: 15,
              border: "2px solid #444"
            }}
          >
            <h1>{image.title}</h1>
            <Image color={image.color} />
            <button type="button" onClick={back}>
              Close
            </button>
          </div>
        </div>
      );   
}
function App(){
    return (
        <Route component = {ModalSwitch}/>
    )
}

export default App;