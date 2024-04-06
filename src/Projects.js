
import ProjBox from './Box3';
import React from 'react';
import './nfactorial.css';

class Projects extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        url: window.location.href, // Get the current URL
        lastString: '',
        data: []
      };
    }

    componentDidMount(){
      this.extractLastString();
    }

    extractLastString = () => {
      const { url } = this.state;
      const segments = url.split('/').filter(segment => segment !== ''); // Split the pathname by slashes and remove empty segments
      const lastString = segments.pop(); // Get the last segment
      console.log(lastString)
      this.setState({ lastString });
      fetch('/getProjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: lastString })
      })
      .then(response => response.json())
      .then(data => {
        this.setState({data})
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  
    render() {
      console.log(this.state.data)
      return (
        <div>
          {this.state.data.map((proj) => (
            <ProjBox name={proj.name} user={this.state.lastString} HWSet1_cap={proj.hw_set_1_cap}  HWSet1_available={proj.hw_set_1_available} HWSet2_cap={proj.hw_set_2_cap} HWSet2_available={proj.hw_set_2_available} />
          ))}
        </div>
      );
    }
  }

  export default Projects;