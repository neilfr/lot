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
        this.setState({ lots: res.data });
      })
      .catch(err => console.log("error loading lot data"));
  };

  setCurrentLot = event => {
    console.log("setting current lot");
    console.log("lot index is:", event.target.value);
    this.setState({ currentLot: event.target.value, display: "detail" });
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
                <select onChange={this.setCurrentLot} name="currentLot">
                  {this.state.lots.map((lot, index) => (
                    <option value={index}>{lot.name}</option>
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
              {this.state.lots[this.state.currentLot].name}
            </Jumbotron>
          </div>
        );
    }
  }
}

export default Arrival;
