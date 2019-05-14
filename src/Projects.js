import React, { Component } from 'react';
import {Link } from "react-router-dom";
import Moment from 'moment';

class Projects extends Component {

  constructor(props) {
    super(props);

    this.state = {addDate: new Date().toDateString()};
    this.state = {addDuration: '1'};
    this.state = {addWorkType: '1'};

    // this.handleAddDate = this.handleAddDate.bind(this);
    // this.handleAddDuration = this.handleAddDuration.bind(this);
    // this.handleAddWorkType = this.handleAddWorkType.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      edit: false,
      id: null,
      projectData: [],
      name: null,
      totalSum: null,
      isLoading: true
    }
  }

  fetchProjectDetails() {
    fetch(`http://u0713882.plsk.regruhosting.ru/api/projects/` + this.props.match.params.projectId)
      .then(response => response.json())
      .then(data =>
        this.setState({
          projectData: data.timeRegistrations,
          projectId: data.id,
          projectName: data.name,
          totalSum: data.totalSum,
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

   

  componentDidMount() {
    this.fetchProjectDetails();
  }

  onSubmitHandle(event) {
    event.preventDefault();


    this.addRegistration(null);

    // this.setState({
    //   projectData: [...this.state.projectData, {
    //     id: Date.now(),
    //     title: event.target.item.value,
    //     done: false,
    //     date: new Date()
    //   }]
    // });

    // event.target.item.value = '';
  }

  onDeleteHandle(event) {

    this.deleteRegistration(arguments[0]);

    // this.setState({
    //   projectData: this.state.projectData.filter(item => {
    //     if (item.id !== arguments[0]) {
    //       return item;
    //     }
    //   })
    // });

    this.setState({ state: this.state });
  }

  deleteRegistration(id)  {
    fetch('http://u0713882.plsk.regruhosting.ru/api/timeregistrations/' + id, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  })
  .then(res => res.text()) // OR res.json()
  .then(res => console.log(res))
  .catch(error => this.setState({ error, isLoading: false }));
}

updateRegistration() {
  
  console.log("updateDate: " + this.state.updateDate);
  console.log("updateDuration: " + this.state.updateDuration);
  console.log("updateWorkType: " + this.state.updateWorkType);
  console.log("updateTimeRegistrationId: " + this.state.updateTimeRegistrationId);

  var updateData = {"timeRegistrationId": this.state.updateTimeRegistrationId, "date": this.state.updateDate, "workTypeId": this.state.updateWorkType, "duration": this.state.updateDuration};
  
  fetch('http://u0713882.plsk.regruhosting.ru/api/timeregistrations/' + this.state.updateTimeRegistrationId, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(updateData)
  })
  .then(res => res.text()) // OR res.json()
  .then(res => console.log(res))
  .catch(error => this.setState({ error, isLoading: false }));
}

addRegistration() {
  console.log("addDate: " +this.state.addDate);
  console.log("addDuration: " +this.state.addDuration);
  console.log("addWorkType: " +this.state.addWorkType);
  console.log("projectId: " +this.state.projectId);

  var addData = {"date": this.state.addDate, "workTypeId": this.state.addWorkType, "duration": this.state.addDuration};
  
  fetch('http://u0713882.plsk.regruhosting.ru/api/timeregistrations?projectId=' + this.state.projectId, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(addData)
  })
  .then(res => res.text()) // OR res.json()
  .then(res => console.log(res))
  .catch(error => this.setState({ error, isLoading: false }));

  this.setState({ state: this.state });
}

handleChange(event) {
  this.setState({[event.target.name]: event.target.value}); 
}

  onEditHandle(event) {
    this.setState({
      edit: true,
      updateTimeRegistrationId: arguments[0]
      
    });
    // this.setState({
    //   edit: true,
    //   updateTimeRegistrationId: arguments[0],
    //   updatedItemDate: arguments[1],
    //   updatedItemWorkTypeName: arguments[2],
    //   updatedItemDuration: arguments[3]
      
    // });
  }

  onUpdateHandle(event) {
    event.preventDefault();

    this.updateRegistration()

    // this.setState({
    //   projectData: this.state.projectData.map(item => {
    //     if (item.id === this.state.id) {
    //       item['title'] = event.target.updatedItem.value;
    //       return item;
    //     }

    //     return item;
    //   })
    // });

    this.setState({
      edit: false
    });

    window.location.reload();

  }

  renderEditForm() {
    if (this.state.edit) {
      return <form onSubmit={this.onUpdateHandle.bind(this)}>
      <label>ID: </label><input type="text" name="updateTimeRegistrationId" value={this.state.updateTimeRegistrationId} disabled={true}></input><br></br>
        <label>Date: </label><input type="date" name="updateDate" value={this.state.updateDate} onChange={this.handleChange}></input><br></br>
          <label>Duration: </label><select name="updateDuration" value={this.state.updateDuration} defaultValue={this.state.updateDuration} onChange={this.handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select><br></br>
          <label>Work Type: </label><select name="updateWorkType" value={this.state.updateWorkType} onChange={this.handleChange} defaultValue={this.state.updateWorkType}>
            <option value="1">Database design</option>
            <option value="2">Business logic</option>
            <option value="3">Website design</option>
            <option value="4">Programming</option>
            <option value="5">UX design</option>
          </select>
        <button className="update-add-item">Update</button>
      </form>
    }
  }

  render() {
    return (
      <div>
          <h1>Project ID: {this.state.projectId}</h1>
          <div><Link to="/">Back to Projects page</Link></div>
          <h2>Project name: {this.state.projectName}</h2>
          <h2>Total sum: ${this.state.totalSum}</h2>
        {this.renderEditForm()}
        <form onSubmit={this.onSubmitHandle.bind(this)}>
          <input type="date" name="addDate" value={this.state.addDate} onChange={this.handleChange}></input>
          <select name="addDuration" value={this.state.addDuration} onChange={this.handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <select name="addWorkType" value={this.state.addWorkType} onChange={this.handleChange}>
            <option value="1">Database design</option>
            <option value="2">Business logic</option>
            <option value="3">Website design</option>
            <option value="4">Programming</option>
            <option value="5">UX design</option>
          </select>
          <button>Add</button>
        </form>
        <table>
        <thead><tr>
          <th>ID</th>
          <th>Date</th>
    <th>Work Type Name</th> 
    <th>Price, $/h</th>
    <th>Duration, h</th>
    <th>Sum, $</th>
  </tr></thead>
  <tbody>
          {this.state.projectData.map(item => (


            <tr key={item.timeRegistrationId}>
            <td>{item.timeRegistrationId}</td>
              <td>{Moment(item.date).format('DD.MM.YYYY')}</td>
              <td>{item.workTypeName}</td>
              <td>{item.price}</td>
              <td>{item.duration}</td>
              <td>{item.sum}</td>
              <td><button onClick={this.onDeleteHandle.bind(this, item.timeRegistrationId, item.workTypeName)}>Delete</button></td>
              <td><button onClick={this.onEditHandle.bind(this,item.timeRegistrationId, item.date, item.workTypeName, item.duration)}>Edit</button></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Projects;
