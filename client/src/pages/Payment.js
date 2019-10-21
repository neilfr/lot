import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";

class Payment extends Component {
  state = {
    lots: [],
    currentLotIndex: null,
    display: "list",
    ticket: "",
    tenant: ""
  };

  componentDidMount() {
    this.loadLots();
  }

  loadLots = () => {
    API.getLots()
      .then(res => {
        console.log("loading lot data:", res.data);
        this.setState({ lots: res.data });
      })
      .catch(err => console.log("error loading lot data"));
  };

  updateCurrentLot = event => {
    console.log("setting current lot");
    const lotIndex = event.target.value;
    console.log("lot index is:", lotIndex);
    this.setState({
      currentLotIndex: lotIndex,
      display: "detail"
    });
  };

  handleInputChange = event => {
    console.log("event.target.name", event.target.name);
    console.log("event.target.value", event.target.value);
    const { name, value } = event.target;
    this.setState({
      ticket: value
    });
  };

  getFee = () => {
    console.log("get fee info for ticket:", this.state.ticket);
    API.getFeeForTicket(
      this.state.lots[this.state.currentLotIndex]._id,
      this.state.ticket
    )
      .then(res => {
        console.log("fee response data:", res.data);
      })
      .catch(err => console.log("error loading lot data"));
  };

  render() {
    switch (this.state.display) {
      case "list":
        return (
          <Container fluid>
            <Col size="md-12">
              <Jumbotron>
                <h1>Payment</h1>
              </Jumbotron>
              {this.state.lots.length ? (
                <select onChange={this.updateCurrentLot} name="currentLotIndex">
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
              <h1>Payment: Lot selected</h1>
              {this.state.lots[this.state.currentLotIndex].name}
            </Jumbotron>
            Enter Ticket:
            <input
              name="ticket"
              type="text"
              onChange={this.handleInputChange}
            />
            <button onClick={this.getFee}>Submit</button>
          </div>
        );
    }
  }
}

export default Payment;
