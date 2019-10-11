import React, { Component } from "react";
import "./style.css";

class BookCard extends Component {
  render() {
    return (
      <div className="container card">
        <div className="row">
          <div className="col-md-4">
            <h5 className="card-title">Title: {this.props.title}</h5>
            <h5 className="card-title">Author(s): {this.props.author}</h5>
            <h5 className="card-title">index is: {this.props.index}</h5>
            <img src={this.props.thumbnail} alt={this.props.title} />
          </div>
          <div className="col-md-8">
            <p className="card-text col-m-8">{this.props.synopsis}</p>
            <button
              className="btn btn-primary"
              onClick={() => this.props.addBook(this.props.index)}
            >
              Add Book
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default BookCard;
