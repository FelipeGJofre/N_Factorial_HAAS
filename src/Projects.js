
import Box3 from './Box3';
import React from 'react';

class Projects extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        joinedBox: null
      };
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
        </div>
      );
    }
  }

  export default Projects;