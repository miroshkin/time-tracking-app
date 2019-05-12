import React, { useState, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends React.Component {
  state = {
    isLoading: true,
    projects: [],
    error: null
  };

  fetchProjects() {
    fetch(`http://u0713882.plsk.regruhosting.ru/api/projects`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          projects: data,
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchProjects();
  }

  goToProjectDetails(id) {
    window.location.href='/projects/' + id;
  }

  render() {
    const { isLoading, projects, error } = this.state;
    return (
      <React.Fragment>
        <h1>Projects</h1>
        {error ? <p>{error.message}</p> : null}
        {!isLoading ? (
          projects.map(project => {
            const { id, name } = project;
            return (
              <div>
                <p>{name}</p>
                <button onClick={(e) => this.goToProjectDetails(id)}>Show project details</button>
                <hr />
              </div>
            );
          })
        ) : (
          <h3>Loading...</h3>
        )}
      </React.Fragment>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("root"));
export default App
