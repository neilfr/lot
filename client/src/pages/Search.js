import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import BookCard from "../components/BookCard";

class Search extends Component {
  state = {
    books: [],
    index: "",
    title: "",
    author: "",
    synopsis: "",
    thumbnail: "",
    selfLink: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  addBook = index => {
    console.log("Add this book!", this.state.books);
    console.log("index is:", index);

    API.saveBook(this.state.books[index]).then(
      res => (window.location.href = "/")
    );
  };

  handleBookSearch = event => {
    event.preventDefault();
    if (this.state.title) {
      console.log("search google for the book");
      API.searchGoogle(this.state.title)
        .then(res => {
          console.log("response is:", res);
          this.setState({
            books: res,
            index: "",
            title: "",
            author: "",
            synopsis: "",
            thumbnail: "",
            selfLink: ""
          });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Jumbotron>
          <h1>Search Google Books</h1>
        </Jumbotron>
        <form>
          <Input
            value={this.state.title}
            onChange={this.handleInputChange}
            name="title"
            placeholder="Title (required)"
          />
          <FormBtn
            // disabled={!(this.state.author && this.state.title)}
            disabled={!this.state.title}
            onClick={this.handleBookSearch}
          >
            Search
          </FormBtn>
        </form>

        <Jumbotron>
          <h4>Results</h4>
        </Jumbotron>

        {this.state.books.map(book => (
          <BookCard
            key={book.index}
            index={book.index}
            title={book.title}
            author={book.author}
            synopsis={book.synopsis}
            thumbnail={book.thumbnail}
            addBook={this.addBook}
          />
        ))}
      </Container>
    );
  }
}

export default Search;
