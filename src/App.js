import React, { Component } from "react";
import Add from "./components/Add";
import Table from "./components/Table";
// import uuid from "uuid";
import axios from "axios";

export default class App extends Component {
  state = {
    repos: []
  };
  check = id => {
    axios.put(`http://localhost:9000/edit/${id}`).then(array => {
      this.setState({ repos: array.data });
    });
  };

  adddata = item => {
    axios.post(`http://localhost:9000/add`, { item }).then(array => {
      this.setState({ repos: array.data });
    });
  };

  getData = () => {
    axios.get(`http://localhost:9000/data`).then(array => {
      let data = array.data;
      this.setState({ repos: data });
    });
  };

  del = id => {
    console.log("IDAPP :", id);
    axios.delete(`http://localhost:9000/delete/${id}`).then(array => {
      let data = array.data;
      this.setState({ repos: data });
    });
  };

  render() {
    const { del, adddata, check } = this;
    const { repos } = this.state;

    return (
      <div className="container">
        <button className="btn btn-info" onClick={this.getData}>
          GetData
        </button>
        <Add repos={repos} adddata={adddata} />
        <Table check={check} repos={repos} del={del} adddata={adddata} />
      </div>
    );
  }
}
