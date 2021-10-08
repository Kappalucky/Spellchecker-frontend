import React, { Component } from "react";
import axios from 'axios'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      error: null,
      isLoading: false,
      correct: false,
      suggestions: []
    };

    this.send = this.send.bind(this);
  }
  componentDidMount() {

  }
  send(e) {
    e.preventDefault();

    const apiUrl = 'http://localhost:31337/spellcheck/';

    this.setState({isLoading: true, error: {}, correct: false, suggestions: []});

    axios.post(apiUrl, {
      word: this.state.word,})
      .then((response) => {
        this.setState({
          isLoading: false,
          correct: response.data.correct,
          suggestions: response.data.suggestions,
        })
        console.log('This is your data', response.data);
      }, error =>{
        console.error('Status:', error.response.status, error.response.data);
        this.setState({
          isLoading: false,
          error: {status:error.response.status, message: error.response.data}
        })
    })}
  handleChange(object) {
    this.setState(object)
  }
  render() {
    return (
        <div className="container-fluid">
          <div className="header m-4 p-2">
            <h1 className="text-center fw-bold">Spellchecker</h1>
          </div>
          <div className="content">
            <div className="md:w-75 md:mx-auto">
              <div id="user-input" className="d-flex justify-content-center m-2 p-2">
              <form className="d-flex w-100" onSubmit={this.send}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={this.state.word} onChange={(e) => this.handleChange({ word: e.target.value })} required/>
                <button className="btn btn-primary" type="submit" onClick={ (e) => this.send(e)}>Search</button>
              </form>
              </div>
            </div>
            <div>
              <div style={{maxWidth: "75%", height: "70vh", overflow: "scroll"}} className="col border border-black border-1 rounded my-4 mx-auto text-center px-2 pt-0 pb-2">
                <div id="results" className="d-flex justify-content-center">
                <table className="table table-borderless">
                  <thead style={{position: "sticky", top: "0", backgroundColor: "goldenrod"}}>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Suggestions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.suggestions.map((suggestion) => {
                      return (
                        <tr key={suggestion.toString()}>
                          <th scope="row">{this.state.suggestions.indexOf(suggestion) + 1}</th>
                          <th>{suggestion}</th>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              </div>

            </div>
          </div>
        </div>
    );
  }
}

export default Main;