import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { LotEntry } from "../components/LotEntry";
import { LotForm } from "../components/LotForm";

class Admin extends Component {
  state = {
    lots: [],
    currentLot: null,
    display: "list"
  };

  componentDidMount() {
    this.loadLotData();
  }

  loadLotData = () => {
    API.getLots()
      .then(res => {
        console.log("loading lot data:", res.data);
        this.setState({ lots: res.data, currentLot: null, display: "list" });
      })
      .catch(err => console.log("error loading lot data"));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    const lotEntry = this.state.currentLot;
    lotEntry[name] = value;
    this.setState({
      currentLot: lotEntry
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  setCurrentLot = lotId => {
    console.log("setting current lot");
    console.log("lotid", lotId);
    const newLot = this.state.lots.filter(lot => {
      console.log("lot._Id", lot._id);
      console.log("lotid", lotId);
      if (lot._id === lotId) {
        return lot;
      }
    });
    console.log("newLot is", newLot);
    this.setState({
      currentLot: newLot[0],
      display: "detail"
    });
  };

  updateLotEntry = () => {
    console.log("calling api.updatelotentry with:", this.state.currentLot);
    const currentLot = this.state.currentLot;
    console.log("current lot id is:", currentLot._id);
    API.updateLotEntry(currentLot._id, currentLot)
      .then(res => {
        console.log("response from updateLotEntry:", res.data);
      })
      .then(() => {
        this.loadLotData();
      });
  };

  render() {
    switch (this.state.display) {
      case "list":
        return (
          <Container fluid>
            <Col size="md-12">
              <Jumbotron>
                <h1>Lot List</h1>
              </Jumbotron>
              {this.state.lots.length ? (
                <List>
                  {this.state.lots.map(lot => (
                    <LotEntry
                      key={lot._id}
                      setCurrentLot={() => this.setCurrentLot(lot._id)}
                      name={lot.name}
                      capacity={lot.capacity}
                    >
                      {/* Name:{lot.name}
                        Capacity:{lot.capacity} */}
                    </LotEntry>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Col>
          </Container>
        );
      case "detail":
        return (
          <div>
            <Jumbotron>
              <h1>Lot Update</h1>
            </Jumbotron>
            <LotForm
              lot={this.state.currentLot}
              onChange={this.handleInputChange}
              updateLotEntry={this.updateLotEntry}
              cancelClick={this.loadLotData}
            />
          </div>
        );
    }
  }
}

export default Admin;
