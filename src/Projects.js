import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Projects extends Component {

  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      id: null,
      projectData: [],
      name: null,
      totalSum: null
    }
  }

  fetchProjectDetails() {
    fetch(`http://u0713882.plsk.regruhosting.ru/api/projects/` + this.props.match.params.projectId)
      .then(response => response.json())
      .then(data =>
        this.setState({
          projectData: data.timeRegistrations,
          id: data.id,
          name: data.name,
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

    this.setState({
      projectData: [...this.state.projectData, {
        id: Date.now(),
        title: event.target.item.value,
        done: false,
        date: new Date()
      }]
    });

    event.target.item.value = '';
  }

  onDeleteHandle(event) {

    this.deleteRegistration(arguments[0]);

    this.setState({
      projectData: this.state.projectData.filter(item => {
        if (item.id !== arguments[0]) {
          return item;
        }
      })
    });

    this.setState({ state: this.state });
  }

  deleteRegistration(id)  {
    fetch('http://u0713882.plsk.regruhosting.ru/api/timeregistrations/' + id, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    // body: JSON.stringify({timeRegistrationId: {id}})
  })
  .then(res => res.text()) // OR res.json()
  .then(res => console.log(res));
  this.render();
}

updateRegistration(data) {
  fetch('http://u0713882.plsk.regruhosting.ru/api/timeregistrations/3', {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: '{"timeRegistrationId":3,"date":"2019-05-06T00:00:00","workTypeId": 1,"duration":4}'
  })
  .then(res => res.text()) // OR res.json()
  .then(res => console.log(res));
}

addRegistration(data) {
  fetch('http://u0713882.plsk.regruhosting.ru/api/timeregistrations?projectId=1', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: '{"date":"2019-05-06T00:00:00","workTypeId": 1,"duration":4}'
  })
  .then(res => res.text()) // OR res.json()
  .then(res => console.log(res));
}

  onEditHandle(event) {
    this.setState({
      edit: true,
      updatedItemId: arguments[0],
      updatedItemDate: arguments[1],
      updatedItemWorkTypeName: arguments[2],
      updatedItemDuration: arguments[3]
      
    });
    
  }

  onUpdateHandle(event) {
    event.preventDefault();

var data = {id: this.state.updatedItemId, 
  date:this.state.updatedItemDate, 
  duration: this.state.updatedItemDuration, 
  workTypeId: 1};

    this.updateRegistration(data)

    this.setState({
      projectData: this.state.projectData.map(item => {
        if (item.id === this.state.id) {
          item['title'] = event.target.updatedItem.value;
          return item;
        }

        return item;
      })
    });

    this.setState({
      edit: false
    });
  }

  renderEditForm() {
    if (this.state.edit) {
      return <form onSubmit={this.onUpdateHandle.bind(this)}>
        <input type="text" defaultValue={this.state.updatedItemId} />
        <input type="text" defaultValue={this.state.updatedItemDate} />
        <input type="text" defaultValue={this.state.updatedItemWorkTypeName} />
        <input type="text" defaultValue={this.state.updatedItemDuration} />
        <button className="update-add-item">Update</button>
      </form>
    }
  }

  render() {
    return (
      <div>
          <h1>Project ID: {this.state.id}</h1>
          <div><Link to="/">Back to Projects page</Link></div>
          <h2>Project name: {this.state.name}</h2>
          <h2>Total sum: ${this.state.totalSum}</h2>
        {this.renderEditForm()}
        <form onSubmit={this.onSubmitHandle.bind(this)}>
          <input type="text" name="item" className="item" />
          <input type="text" name="item" className="item" />
          <input type="text" name="item" className="item" />
          <button className="btn-add-item">Add</button>
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
              <td>{item.date}</td>
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
