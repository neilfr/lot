import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Arrival extends Component {
  state = {
    lots: [],
    currentLotIndex: null,
    display: "list"
  };

  componentDidMount() {
    this.loadLotData();
  }

  loadLotData = () => {
    API.getLots()
      .then(res => {
        console.log("loading lot data:", res.data);
        this.setState({ lots: res.data });
      })
      .catch(err => console.log("error loading lot data"));
  };

  ticketPlease = () => {
    console.log("INSIDE TICKET PLEASE");
    API.getNewTenant(this.state.lots[this.state.currentLotIndex]._id)
      .then(res => {
        console.log("GET NEW TENANT RESPONSE");
        console.log(res.data);
      })
      .catch(err => console.log("error getting ticket"));
  };

  setCurrentLotIndex = event => {
    console.log("setting current lot");
    console.log("lot index is:", event.target.value);
    this.setState({ currentLotIndex: event.target.value, display: "detail" });
  };

  render() {
    switch (this.state.display) {
      case "list":
        return (
          <Container fluid>
            <Col size="md-12">
              <Jumbotron>
                <h1>Lot Picker</h1>
              </Jumbotron>
              {this.state.lots.length ? (
                <select
                  onChange={this.setCurrentLotIndex}
                  name="currentLotIndex"
                >
                  {this.state.lots.map((lot, index) => (
                    <option key={index} value={index}>
                      {lot.name}
                    </option>
                  ))}
                </select>
              ) : (
                <h3>No Lots, Go to Admin to Add Lots</h3>
              )}
            </Col>
          </Container>
        );
      case "detail":
        return (
          <div>
            <Jumbotron>
              <h1>Lot selected</h1>
              {this.state.lots[this.state.currentLotIndex].name}
            </Jumbotron>
            <p>Gate closed</p>
            <p>rate information</p>
            <button onClick={this.ticketPlease}>press for ticket</button>
            <div>
              <p>click this ticket to take it</p>
              <p>ticket #</p>
            </div>
            <p>date/time</p>
          </div>
        );
    }
  }
}

export default Arrival;
