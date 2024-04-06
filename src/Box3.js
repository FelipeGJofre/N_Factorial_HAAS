import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './project.css';

const ProjBox = (props) => {
  const navigate = useNavigate();
  const [joined, setJoined] = useState(true)
  const [info, data] = useState({
    HWSet1_cap: props.HWSet1_cap,
    HWSet1_available: props.HWSet1_available,
    HWSet2_cap: props.HWSet2_cap,
    HWSet2_available: props.HWSet2_available,
    input1: '',
    input2: '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name)
    data(prevState => ({ 
        ...prevState,
        [name]: value }));
  }

  const handleCheckin1 = () => {
    const updatedHWSet1 = parseInt(info.input1) + info.HWSet1_available;
    if (updatedHWSet1 <= 100) {
      data(prevState => ({ 
        ...prevState,
        HWSet1_available: updatedHWSet1 }));
      
      fetch('/updatehw/'+props.name, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({HWSet1_available: updatedHWSet1, HWSet2_available: info.HWSet2_available}),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .catch(error => {
          // Handle error
          console.error('There was a problem with your fetch operation:', error);
      })
    }
  }

  const handleCheckout1 = () => {
    const updatedHWSet1 = info.HWSet1_available - parseInt(info.input1);
    if (updatedHWSet1 >= 0 ) {
      data(prevState => ({ 
        ...prevState,
        HWSet1_available: updatedHWSet1 }));

      fetch('/updatehw/'+props.name, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({HWSet1_available: updatedHWSet1, HWSet2_available: info.HWSet2_available}),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .catch(error => {
          // Handle error
          console.error('There was a problem with your fetch operation:', error);
      })
    }
  }

  const handleCheckin2 = () => {
    const updatedHWSet2 = parseInt(info.input2) + info.HWSet2_available;
    if (updatedHWSet2 <= 100) {
      data(prevState => ({ 
        ...prevState,
        HWSet2_available: updatedHWSet2 }));

      fetch('/updatehw/'+props.name, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({HWSet1_available: info.HWSet1_available, HWSet2_available: updatedHWSet2}),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .catch(error => {
          // Handle error
          console.error('There was a problem with your fetch operation:', error);
      })
    }
  }

  const handleCheckout2 = () => {
    const updatedHWSet2 = info.HWSet2_available - parseInt(info.input2);
    if (updatedHWSet2 >= 0 ) {
      data(prevState => ({ 
        ...prevState,
        HWSet2_available: updatedHWSet2 }));

      fetch('/updatehw/'+props.name, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({HWSet1_available: info.HWSet1_available, HWSet2_available: updatedHWSet2}),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .catch(error => {
          // Handle error
          console.error('There was a problem with your fetch operation:', error);
      })
    }
  }

  const handleJoinClick = () => {
    if(joined){
      fetch('/leaveproj/'+props.user+'/'+props.name, {method: 'POST',})
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .catch(error => {
          // Handle error
          console.error('There was a problem with your fetch operation:', error);
      })
    }else{
      fetch('/joinproj/'+props.user+'/'+props.name, {method: 'POST',})
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .catch(error => {
          // Handle error
          console.error('There was a problem with your fetch operation:', error);
      })
    }
    setJoined(!joined);
  }

  return (
    <div className="box" style={joined ? {backgroundColor:'#dfdfdf'} : {backgroundColor:'gray'}}>
      <div className="box-title">
        <strong style={{ fontSize: '24px', marginRight: '20px'}}>{props.name}</strong>
      </div>
      <div className='availcap-container'>
        <div className="availcap">
          <strong>HWSet1: {info.HWSet1_available}/{info.HWSet1_cap}</strong>
          <input type="number" min="0" max="100" name="input1" value={info.input1} onChange={handleInputChange} placeholder="QTY:" style={{width:'15%', margin:'5px'}} disabled={!joined} />
          <div className="checkinout">
            <button onClick={handleCheckin1} disabled={!joined}>Check In</button>
            <button onClick={handleCheckout1} disabled={!joined}>Check Out</button>
          </div>
        </div>
        <div className="availcap">
          <strong>HWSet2: {info.HWSet2_available}/{info.HWSet2_cap}</strong>
          <input type="number" min="0" max="100" name="input2" value={info.input2} onChange={handleInputChange} placeholder="QTY:" style={{width:'15%', margin:'5px'}} disabled={!joined} />
          <div className="checkinout">
            <button onClick={handleCheckin2} disabled={!joined}>Check In</button>
            <button onClick={handleCheckout2} disabled={!joined}>Check Out</button>
          </div>
        </div>
      </div>
      <div className="join-container">
        <div className="join" onClick={handleJoinClick} style={joined ? {backgroundColor:'#b47b00'} : {backgroundColor:'#0014cd'}}>{joined ? 'Leave' : 'Join'}</div>
      </div>
    </div>
  );
}

export default ProjBox;