import React, { Component } from "react";

export default class Repo extends Component {
  state = {};
  render() {
    const { del, check } = this.props;
    const { _id, title, status, language } = this.props.repos;

    return (
      <tr>
        <td>{_id} </td>|<td> {title}</td>|<td>{status.toUpperCase()}</td>|
        <td>
          <input
            type="checkbox"
            checked={status === "Private"}
            onClick={check.bind(this, _id)}
          />
        </td>
        |<td>{status === "Private" ? "YES" : "NO"}</td>|<td> {language}</td>|
        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={del.bind(this, _id)}
          >
            Delete
          </button>
        </td>
        |
      </tr>
    );
  }
}
