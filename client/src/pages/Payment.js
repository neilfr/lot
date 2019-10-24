import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import Moment from "moment";
// const Moment = require("moment");

class Payment extends Component {
  state = {
    lots: [],
    currentLotIndex: null,
    display: "list",
    ticket: "",
    tenant: "",
    duration: "",
    tenantInfoRetrieved: false,
    statusMessage: ""
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

  getTenantPaymentInfo = () => {
    console.log("get tenant payment info for ticket:", this.state.ticket);
    API.getTenantPaymentInfo(
      this.state.lots[this.state.currentLotIndex]._id,
      this.state.ticket
    )
      .then(res => {
        const tenant = res.data;
        console.log("TENANT IS:", tenant);
        const start = Moment.utc(tenant.arrival);
        const end = Moment.utc(tenant.payment);
        const duration = end.diff(start, "minutes");
        console.log("DURATION IS:", duration);
        const hours = Math.floor(duration / 60);
        const remainingMinutes = duration - hours * 60;
        const formattedDuration =
          hours + " hours " + remainingMinutes + " minutes";
        console.log("FORMATTED DURATION IS:", formattedDuration);
        this.setState({
          tenant: tenant,
          duration: formattedDuration,
          tenantInfoRetrieved: true,
          statusMessage: ""
        });
      })
      .catch(err => {
        console.log("error retrieving ticket", err);
        this.setState({
          statusMessage:
            "Ticket not found, please try again or contact the office"
        });
      });
  };

  payTicket = () => {
    API.updateTenant(
      this.state.lots[this.state.currentLotIndex]._id,
      this.state.tenant
    )
      .then(res => {
        console.log("res from update tenant is:", res);
      })
      .catch(err => {
        console.log("error updating tenant:", err);
      });
    this.setState({
      ticket: "",
      tenant: "",
      duration: "",
      tenantInfoRetrieved: false,
      statusMessage: ""
    });
    //refresh payment page for next exiting tenant
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
              value={this.state.ticket}
            />
            <button onClick={this.getTenantPaymentInfo}>Submit</button>
            <div>{this.state.statusMessage}</div>
            <div>duration of stay:{this.state.duration}</div>
            <div>fee:{this.state.tenant.fee}</div>
            <button
              disabled={!this.state.tenantInfoRetrieved}
              onClick={this.payTicket}
            >
              pay ticket
            </button>
          </div>
        );
    }
  }
}

export default Payment;
