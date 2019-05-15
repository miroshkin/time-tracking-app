import React, { Component } from 'react';
import {Link } from "react-router-dom";
import Moment from 'moment';


class Projects extends Component {

  constructor(props) {
    super(props);
    this._isMounted = false;
    this._webAPI = "http://u0713882.plsk.regruhosting.ru/api"
    
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      edit: false,
      id: null,
      registrations: [],
      name: null,
      totalSum: null,
      error: null,
      addDuration: 1,
      addWorkType: 1,
      addDate: Moment(new Date()).format('YYYY-MM-DD'),
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.fetchProjectDetails();
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  onSubmitHandle(event) {
    event.preventDefault();
    this.addRegistration(null);
  }

  fetchProjectDetails() {
    fetch(this._webAPI + `/projects/` + this.props.match.params.projectId)
      .then(response => response.json())
      .then(data =>
        this._isMounted && this.setState({
          registrations: data.timeRegistrations,
          projectId: data.id,
          projectName: data.name,
          totalSum: data.totalSum,
        })
      )
      .catch(error => this.setState({ error }));
  }

  async deleteRegistration(id)  {
    await fetch(this._webAPI + '/timeregistrations/' + id, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  })
  .catch(error => this.setState({ error}));

  await this.fetchProjectDetails();
}

async updateRegistration() {

  var updateData = {"timeRegistrationId": this.state.updateTimeRegistrationId, "date": this.state.updateDate, "workTypeId": this.state.updateWorkType, "duration": this.state.updateDuration};
  
  await fetch(this._webAPI + '/timeregistrations/' + this.state.updateTimeRegistrationId, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(updateData)
  })
  .catch(error => this.setState({ error }));

  await this.fetchProjectDetails();
}


async addRegistration() {

  var addData = {"date": this.state.addDate, "workTypeId": this.state.addWorkType, "duration": this.state.addDuration};
  
  await fetch(this._webAPI + '/timeregistrations?projectId=' + this.state.projectId, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(addData)
  })
  .catch(error => this.setState({ error }));

  await this.fetchProjectDetails();
}

handleChange(event) {
  this.setState({[event.target.name]: event.target.value}); 
}

onEditHandle(event) {
  this.setState({
    edit: true,
    updateTimeRegistrationId: arguments[0],
    updateDate: Moment(arguments[1]).format('YYYY-MM-DD'),
    updateWorkType: arguments[2],
    updateDuration: arguments[3]
  });
}

onUpdateHandle(event) {
  event.preventDefault();
  
  this.updateRegistration()

  this._isMounted && this.setState({
    edit: false,
    registrations : this.state.registrations
  });
}

onDeleteHandle(event) {
  let id = arguments[0];
  this.deleteRegistration(id);
  var registrations = this.state.registrations.filter(function(registration) { return registration.timeRegistrationId !== id });
  this.setState({ registrations: registrations, edit: false });
  }

onCancelHandle(event){
  event.preventDefault();
  this._isMounted && this.setState({
    edit: false
  });
}

  renderEditForm() {
    const { error } = this.state;
    if (this.state.edit) {
      return <form id="project_details_form" onSubmit={this.onUpdateHandle.bind(this)}>
        <input type="date" name="updateDate" value={this.state.updateDate} onChange={this.handleChange} className="mx-2"></input>
          <select name="updateDuration" value={this.state.updateDuration} onChange={this.handleChange} className="mr-2">
          <option value="1">1h</option>
            <option value="2">2h</option>
            <option value="3">3h</option>
            <option value="4">4h</option>
            <option value="5">5h</option>
            <option value="6">6h</option>
            <option value="7">7h</option>
            <option value="8">8h</option>
            <option value="9">9h</option>
            <option value="10">10h</option>
            <option value="11">11h</option>
            <option value="12">12h</option>
          </select>
          <select name="updateWorkType" value={this.state.updateWorkType} onChange={this.handleChange} className="mr-2">
            <option value="1">Database design</option>
            <option value="2">Business logic</option>
            <option value="3">Website design</option>
            <option value="4">Programming</option>
            <option value="5">UX design</option>
          </select>
        <button className="mr-2">Update</button>
        <button onClick={this.onCancelHandle.bind(this)}>Cancel</button>
        {error ? <div class="alert alert-danger mx-2" role="alert">{error.message}.</div> : null}
      </form>
    }
  }

  render() {
    const { error, projectName, totalSum } = this.state;
    return (
      <div>
          <h1 className="mx-2">{projectName? "Project > " + projectName :  "Project > Loading..." }</h1>
          <div className="mx-2 mb-3"><Link to="/">Back to Projects page</Link></div>
          
        {this.renderEditForm()}
        <form id="project_details_form" onSubmit={this.onSubmitHandle.bind(this)}>
          <input type="date" name="addDate" value={this.state.addDate} onChange={this.handleChange} className="mx-2 my-2"></input>
          <select name="addDuration" value={this.state.addDuration} onChange={this.handleChange} className="mr-2">
            <option value="1">1h</option>
            <option value="2">2h</option>
            <option value="3">3h</option>
            <option value="4">4h</option>
            <option value="5">5h</option>
            <option value="6">6h</option>
            <option value="7">7h</option>
            <option value="8">8h</option>
            <option value="9">9h</option>
            <option value="10">10h</option>
            <option value="11">11h</option>
            <option value="12">12h</option>
          </select>
          <select name="addWorkType" value={this.state.addWorkType} onChange={this.handleChange} className="mr-2">
            <option value="1">Database design</option>
            <option value="2">Business logic</option>
            <option value="3">Website design</option>
            <option value="4">Programming</option>
            <option value="5">UX design</option>
          </select>
          <button className="mr-2">Add</button>
          {error ? <div class="alert alert-danger mx-2" role="alert">{error.message}.</div> : null}
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
          {this.state.registrations.map(item => (
            <tr key={item.timeRegistrationId}>
            <td>{item.timeRegistrationId}</td>
              <td>{Moment(item.date).format('DD.MM.YYYY')}</td>
              <td>{item.workTypeName}</td>
              <td>{item.price}</td>
              <td>{item.duration}</td>
              <td>{item.sum}</td>
              <td><button onClick={this.onDeleteHandle.bind(this, item.timeRegistrationId, item.workTypeName)}>Delete</button></td>
              <td><button onClick={this.onEditHandle.bind(this,item.timeRegistrationId, item.date, item.workTypeId, item.duration)}>Edit</button></td>
            </tr>
          ))}
          </tbody>
        </table>
        <h4 className="mx-2">{projectName? "Total sum: $" + totalSum :  "" }</h4>
      </div>
    );
  }
}

export default Projects;
