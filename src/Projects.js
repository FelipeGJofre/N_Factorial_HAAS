
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
        console.log(data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }

    handleJoinClick = (boxLetter) => {
      this.setState({ joinedBox: boxLetter });
    }
  
    render() {
      return (
        <div>
          <Box3 letter="1" onJoinClick={this.handleJoinClick} isJoined={this.state.joinedBox === "1"} />
          <Box3 letter="2" onJoinClick={this.handleJoinClick} isJoined={this.state.joinedBox === "2"} />
          <Box3 letter="3" onJoinClick={this.handleJoinClick} isJoined={this.state.joinedBox === "3"} />
          <LogOutButton></LogOutButton>
        </div>
      );
    }
  }

  export default Projects;