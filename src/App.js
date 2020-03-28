import React from 'react';
import './App.css';

class CountryCard extends React.Component {
  render(){
    var items = []
    const { getCode } = require('country-list');
    for (let i = 0; i < this.props.api.slice(-3).length; i++) {
      const countryCode = getCode(this.props.api[i].country);
      items.push(
      <div className="col-lg-4">
        <div className="countryCard">
          <h3 className="countryCard__country">{this.props.api[i].country}</h3>
          <div>
            <img src={"https://www.countryflags.io/"+ countryCode +"/flat/64.png"}></img>
          </div>
          <span>Infected now:</span>
          <h1 className="countryCard__title">{this.props.api[i].cases.active}</h1>
          <ul className="countryCard__infoList">
            <li className="countryCard__infoList__item">Total infected: {this.props.api[i].cases.total}</li>
            <li className="countryCard__infoList__item">Deaths: {this.props.api[i].deaths.total}</li>
          </ul>
        </div>
      </div>
      )
    }
    return (
      <div className="row">
        {items}
      </div>
    )
  }
}

// const CountryCardContainer = (props) =>{

//   return(
//     <div>
      
//     </div>
//   )
// }

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      api : []
    }
  }
  async componentDidMount(){
    try{
      const response = await fetch("https://covid-193.p.rapidapi.com/statistics", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "covid-193.p.rapidapi.com",
          "x-rapidapi-key": "51b20adcd9msh684c652fb4ba30ap193f64jsn1b5bcc62dce8"
        }
      })
      const data = await response.json();
      this.setState({
        api : data.response
      })

    }
    catch(err){
      console.log(err)
    }
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <CountryCard api={this.state.api} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
