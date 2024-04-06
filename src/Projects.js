import ProjBox from './Box3';
import React from 'react';
import './nfactorial.css';

class Projects extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        url: window.location.href, // Get the current URL
        lastString: '',
        data: [],
        neworexisting: true,
        projname: '',
        projID: '',
        projdesc: ''
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
      this.populateProjects(lastString);
    }

    handleInputChange = (event) => {
      const { name, value } = event.target;
      console.log(name)
      this.setState({[name]: value});
    }

    populateProjects = (userID) => {
      fetch('/getProjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: userID })
      })
      .then(response => response.json())
      .then(data => {
        this.setState({data})
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }

    handleNewProject = () => {
      fetch('/newproj/'+this.state.lastString, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({newprojectname: this.state.projname,
                              newprojectID: this.state.projID,
                              newprojectdesc: this.state.projdesc}),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          // Handle response data from Flask if needed
          console.log(data);
          if(data['message'] === "Project already exists!")
          {
              this.setState({neworexisting: false})
          }
          else {
          // Go to the main app page
            this.populateProjects(this.state.lastString);
          }
      })
      .catch(error => {
          // Handle error
          console.error('There was a problem with your fetch operation:', error);
      })
    }

    handleJoinProject = () => {
      fetch('/joinproj/'+this.state.lastString+'/'+this.state.projID, {method: 'POST',})
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          this.populateProjects(this.state.lastString);
          return response.json();
      })
      .then(data => {
        // Handle response data from Flask if needed
        console.log(data);
        if(data['message'] === "Project does not exist!")
        {
            this.setState({neworexisting: true})
        }
        else {
        // Go to the main app page
          this.populateProjects(this.state.lastString);
        }
    })
      .catch(error => {
          // Handle error
          console.error('There was a problem with your fetch operation:', error);
      })
    }
  
    render() {
      console.log(this.state.data)
      return (
        <div>
          {this.state.data.map((proj) => (
            <ProjBox projID={proj.id} name={proj.name} desc={proj.desc} user={this.state.lastString} HWSet1_cap={proj.hw_set_1_cap}  HWSet1_available={proj.hw_set_1_available} HWSet2_cap={proj.hw_set_2_cap} HWSet2_available={proj.hw_set_2_available} />
          ))}
          {this.state.neworexisting ? null :
            <div>
              <div className="forgot-password">
                Want to create a new project? <span onClick={()=>{this.setState({neworexisting: true})}}>Click here!</span>
              </div>
              <div className="newproject-container" style={{height:'30px'}}>
                <div style={{width: '85%'}}>
                  <input type="text" name="projID" value={this.state.projID} onChange={this.handleInputChange} placeholder={this.state.neworexisting ? 'New ProjectID' : 'Existing ProjectID'} style={{width:'85%'}}/>
                </div>
                <div className="newproj" onClick={this.state.neworexisting ? this.handleNewProject : this.handleJoinProject}>{this.state.neworexisting ? 'Create Project' : 'Join Project'}</div>
              </div>
            </div>
          }
          {(!this.state.neworexisting) ? null :
            <div>
              <div className="forgot-password">
                Want to join an existing project? <span onClick={()=>{this.setState({neworexisting: false})}}>Click here!</span>
              </div>
              <div className="newproject-container" style={{height:'70px'}}>
                <div style={{width: '85%'}}>
                  <input type="text" name="projname" value={this.state.projname} onChange={this.handleInputChange} placeholder='Project Name' style={{width:'85%'}}/>
                  <input type="text" name="projID" value={this.state.projID} onChange={this.handleInputChange} placeholder={this.state.neworexisting ? 'New ProjectID' : 'Existing ProjectID'} style={{width:'85%'}}/>
                  <input type="text" name="projdesc" value={this.state.projdesc} onChange={this.handleInputChange} placeholder='Brief Project Description' style={{width:'85%'}}/>
                </div>
                <div className="newproj" onClick={this.state.neworexisting ? this.handleNewProject : this.handleJoinProject}>{this.state.neworexisting ? 'Create Project' : 'Join Project'}</div>
              </div>
            </div>
          }
        </div>
      );
    }
  }

  export default Projects;