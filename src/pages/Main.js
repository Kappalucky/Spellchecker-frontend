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
  send(e) {
    e.preventDefault();

    if (this.state.word !== '') {
      const apiUrl = 'http://localhost:31337/spellcheck/';

      this.setState({
        isLoading: true,
        error: {},
        correct: false,
        suggestions: []
      });

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
          this.setState({
            isLoading: false,
            error: {
              status:error.response.status,
              message: error.response.data
            }
          })
      })
    }

  }
  handleChange(object) {
    this.setState(object)
  }

  render() {
    let {suggestions, correct, error} = this.state;

    const renderTable = () => {
      if (correct === false && suggestions.length !== 0) {
        return (<div style={{maxWidth: "75%", height: "70vh", overflow: "scroll"}} className="col border border-black border-1 rounded my-4 mx-auto text-center px-2 pt-0 pb-2">
        <div id="results" className="d-flex justify-content-center">
        <table className="table table-borderless">
          <thead style={{position: "sticky", top: "0", backgroundColor: "goldenrod"}}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Suggestions</th>
            </tr>
          </thead>
          <tbody>
            {suggestions.map((suggestion) => {
              return (
                <tr key={suggestion.toString()}>
                  <th scope="row">{suggestions.indexOf(suggestion) + 1}</th>
                  <th>{suggestion}</th>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      </div>);
      } else if (correct === true) {
        return <h1 className="text-center subheading">The word is spelled correctly</h1>;
      }
      else if (error) {
        return <h1 className="text-center subheading">{error.message}</h1>;
      }
       else {
        return <h1 className="text-center subheading">Results will show here</h1>;
      }
    }

    return (
        <div className="container-fluid">
          <div className="header m-4 p-2">
            <h1 className="text-center fw-bold heading">Busy Bee</h1>
            <h2 className="text-center fw-light subheading">Spellchecker</h2>
          </div>
          <div className="content">
            <div className="md:w-75 md:mx-auto">
              <div id="user-input" className="d-flex justify-content-center m-2 p-2">
              <form className="d-flex w-100" onSubmit={this.send}>
                <input className="form-control me-2" type="text" placeholder="Search" pattern="[A-Za-z]" aria-label="Search" value={this.state.word} onChange={(e) => this.handleChange({ word: e.target.value })} required/>
                <button className="btn btn-bee" type="submit" onClick={ (e) => this.send(e)}>Search</button>
              </form>
              </div>
            </div>
            <div>
            {renderTable()}
            </div>
          </div>
        </div>
    );
  }
}

export default Main;