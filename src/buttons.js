import React, { useState } from 'react';
import Form from './forms'

function CreateProject(props) {
    const [inputValue, setInputValue] = useState('');
    const [projectName, setProjectName] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleCreateProject = () => {
        setProjectName(inputValue);
    };

    return (
        <div>
            <center>
                <form>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter project name"
                    />
                    <button type="button" onClick={handleCreateProject}>
                        Create Project
                    </button>
                </form>
                <p>Project Name: {projectName}</p>
            </center>
        </div>
    );
}


export default CreateProject;