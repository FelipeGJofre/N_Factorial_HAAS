import React from 'react';
import Projects from './Projects';


class App extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
      
  //   };
  // }
  
  // componentDidMount(){
  //   this.extractLastString();
  // }

  // extractLastString = () => {
  //   const { url } = this.state;
  //   const segments = url.split('/').filter(segment => segment !== ''); // Split the pathname by slashes and remove empty segments
  //   const lastString = segments.pop(); // Get the last segment
  //   this.setState({ lastString });
  // }

  render() {
    // const { url, lastString } = this.state;
    return (
      <div className="App">
        <h1>Projects</h1>
        <Projects  />
      </div>
      
    );
  }
}

export default App;
