import React, { Component } from "react";
import "./App.css";
import { getUrls, postUrl } from "../../apiCalls";
import UrlContainer from "../UrlContainer/UrlContainer";
import UrlForm from "../UrlForm/UrlForm";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
    };
  }

  componentDidMount() {
    getUrls().then((data) => this.setState({ urls: data.urls }));
  }

  updateUrl = (newUrl) => {
    postUrl(newUrl).then((data) =>
      this.setState({ urls: [...this.state.urls, data] })
    );
    // postUrl(newUrl).then(data => console.log(data)
  };

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm updateUrl={this.updateUrl} />
        </header>

        {this.state.urls && <UrlContainer urls={this.state.urls} />}
      </main>
    );
  }
}

export default App;
