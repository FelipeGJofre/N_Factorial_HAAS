// child of Box3, gets passed 
import React from 'react';

class JoinButton extends React.Component {
  render() {
    const joinButtonText = this.props.isJoined ? 'Leave' : 'Join';

    return (
      <button onClick={this.props.handleJoinClick}>{joinButtonText}</button>
    );
  }
}

export default JoinButton;