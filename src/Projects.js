
import Box3 from './Box3';
import React from 'react';
import LogOutButton from './log_out'

class Projects extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        url: window.location.href, // Get the current URL
        lastString: '',
        joinedBox: null,
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
      fetch('/get_projects', {
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

    handleJoinClick = (boxLetter) => {
      this.setState({ joinedBox: boxLetter });
    }
  
    render() {
      console.log(this.state.data)
      return (
        <div>
          {this.state.data.map((proj) => (
            <Box3 name={proj.name} HWSet1_cap={proj.hw_set_1_cap}  HWSet1_available={proj.hw_set_1_available} HWSet2_cap={proj.hw_set_2_cap} HWSet2_available={proj.hw_set_2_available} onJoinClick={this.handleJoinClick} isJoined={this.state.joinedBox === "1"} />
          ))}
          <LogOutButton></LogOutButton>
        </div>
      );
    }
  }

  export default Projects;

            /* <Box3 name="1" onJoinClick={this.handleJoinClick} isJoined={this.state.joinedBox === "1"} />
          <Box3 name="2" onJoinClick={this.handleJoinClick} isJoined={this.state.joinedBox === "2"} />
          <Box3 name="3" onJoinClick={this.handleJoinClick} isJoined={this.state.joinedBox === "3"} /> */