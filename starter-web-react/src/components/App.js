import React, {Component} from 'react';

export default class App extends Component {
  state = {foo: 'bar', clickCount: 0};

  componentDidMount() {
    this.getHello().then((val) => {
      if (val) {
        this.setState({foo: val});
      }
    });
  }

  getHello = async () => {
    const res = await fetch('/api/hello');
    if (res.ok) {
      return res.text();
    }
    return undefined;
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState({clickCount: this.state.clickCount + 1});
  };

  render() {
    const {foo, clickCount} = this.state;
    return (
      <div>
        {foo}
        <button className="btn btn-secondary" onClick={this.handleClick}>Click count: {clickCount}</button>
        <div className="grid">
          <div className="col-xl-6 col-md-12">
            Foobar
          </div>
          <div className="col-xl-6 col-md-12">
            Foobar
          </div>
        </div>
      </div>
    );
  }
}

