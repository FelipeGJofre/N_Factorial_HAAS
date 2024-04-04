// child of projects, gets passed what number project
import React from 'react';
import JoinButton from './JoinButton'; // Import JoinButton component


class Box3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      HWSet1: 0,
      HWSet2: 0,
      input1: '',
      input2: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleButtonClick1 = () => {
    const updatedHWSet1 = parseInt(this.state.input1) + this.state.HWSet1;
    if (updatedHWSet1 <= 100) {
      this.setState(prevState => ({
        HWSet1: updatedHWSet1
      }));
    }
  }

  handleCheckout1 = () => {
    const updatedHWSet1 = this.state.HWSet1 - parseInt(this.state.input1);
    if (updatedHWSet1 >= 0) {
      this.setState(prevState => ({
        HWSet1: updatedHWSet1
      }));
    }
  }

  handleButtonClick2 = () => {
    const updatedHWSet2 = parseInt(this.state.input1) + this.state.HWSet2;
    if (updatedHWSet2 <= 100) {
      this.setState(prevState => ({
        HWSet2: updatedHWSet2
      }));
    }
  }

  handleCheckout2 = () => {
    const updatedHWSet2 = this.state.HWSet2 - parseInt(this.state.input1);
    if (updatedHWSet2 >= 0) {
      this.setState(prevState => ({
        HWSet2: updatedHWSet2
      }));
    }
  }

  handleJoinClick = () => {
    if (this.props.isJoined) {
      this.props.onJoinClick(null);
    } else {
      this.props.onJoinClick(this.props.letter);
    }
  }

  render() {
    const backgroundColor = this.props.isJoined ? 'green' : 'gray';
    const joinButtonText = this.props.isJoined ? 'Leave' : 'Join';
    const isDisabled = !this.props.isJoined;

    return (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid black',
          width: '1000px',
          height: '200px',
          padding: '10px',
          margin: '10px',
          backgroundColor: backgroundColor,
          position: 'relative'
        }}>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
        }}>
          <strong style={{ fontSize: '24px', marginRight: '20px' }}>Project Name {this.props.letter}</strong>
          <span>List of authorized users</span>
        </div>
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '380px',
          display: 'flex',
          alignItems: 'center',
        }}>
          <strong style={{ fontSize: '24px', marginRight: '20px' }}>HWSet1: {this.state.HWSet1}/100</strong>
          <input type="text" name="input1" value={this.state.input1} onChange={this.handleInputChange} placeholder="QTY:" style={{ width: '50px', height: '24px', marginRight: '20px' }} disabled={isDisabled} />
          <button onClick={this.handleButtonClick1} disabled={isDisabled}>Check In</button>
          <button onClick={this.handleCheckout1} disabled={isDisabled}>Check Out</button>
        </div>
        <div style={{
            position: 'absolute',
            top: '65%',
            left: '380px',
            display: 'flex',
            alignItems: 'center',
        }}>
            <strong style={{ fontSize: '24px', marginRight: '20px' }}>HWSet2: {this.state.HWSet2}/100</strong>
            <input style={{ marginRight: '20px', width: '50px', height: '24px' }} type="text" name="input2" value={this.state.input2} onChange={this.handleInputChange} placeholder="QTY:" disabled={isDisabled} />
            <button onClick={this.handleButtonClick2} disabled={isDisabled}>Check In</button>
            <button onClick={this.handleCheckout2} disabled={isDisabled}>Check Out</button>
        </div>
        <JoinButton
          isJoined={this.props.isJoined}
          handleJoinClick={this.handleJoinClick}
        />
      </div>
    );
  }
}

export default Box3;