import React, { useState } from 'react';
import Form from './forms'

function CreateProject(props) {
    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            <center>
            <Form/>
            <button onClick={() => setInputValue(FormData.arguments.inputValue)}>
            Create Project
            </button>
            <p>Project Name: {inputValue}</p>
            </center>
            
            
        </div>
  );


}

export default CreateProject;