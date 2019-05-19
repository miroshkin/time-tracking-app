import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props){
      super(props);
      this._isMounted = false;
      this._webAPI = "http://u0713882.plsk.regruhosting.ru/api"
    }

  state = {
    isLoading: true,
    projects: [],
    error: null
  };

  fetchProjects() {
    fetch(this._webAPI + `/projects`)
      .then(response => response.json())
      .then(data =>
        this._isMounted && this.setState({
          projects: data,
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.fetchProjects();
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  goToProjectDetails(id) {
    window.location.href='/projects/' + id;
  }

  render() {
    const { isLoading, projects, error } = this.state;
    return (
      <React.Fragment>
        <h1 className="mx-2">Projects</h1>
        {error ? <p className="mx-2">{error.message}</p> : null}
        <hr />
        {!isLoading ? (
          projects.map(project => {
            const { id, name, customerName } = project;
            return (
              <div key={id}>
                <p className="mx-2">{customerName} - {name}</p>
                <button onClick={(e) => this.goToProjectDetails(id)} className="mx-2">Show project details</button>
                <hr />
              </div>
            );
          })
        ) : (
          <h3 className="mx-2">Loading...</h3>
        )}
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
export default App
