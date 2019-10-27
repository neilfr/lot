import React, { Component } from "react";
import PageTitle from "../components/PageTitle";
import API from "../utils/API";
import { Col, Row, div } from "../components/Grid";

class Departure extends Component {
  state = {
    lots: [],
    currentLotIndex: null,
    display: "list",
    ticket: "",
    tenant: "",
    duration: "",
    tenantInfoRetrieved: false,
    statusMessage: "Gate Down"
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

  resetDeparture = () => {
    setTimeout(() => {
      this.setState({
        ticket: "",
        tenant: "",
        duration: "",
        tenantInfoRetrieved: false,
        statusMessage: "Gate Down"
      });
    }, 3000);
  };

  depart = () => {
    console.log("post tenant departure info for ticket:", this.state.ticket);
    API.getPaymentConfirmation(
      this.state.lots[this.state.currentLotIndex]._id,
      this.state.ticket
    )
      .then(res => {
        console.log("tenant can leave?", res.data);
        if (res.data) {
          this.setState({
            tenantInfoRetrieved: true,
            statusMessage: "Gate Up - Have a nice day!"
          });
        } else {
          this.setState({
            tenantInfoRetrieved: true,
            statusMessage:
              "There is a problem with your ticket, please contact the office"
          });
        }
      })
      .catch(err => {
        console.log("error retrieving ticket", err);
        this.setState({
          statusMessage:
            "Ticket not found, please try again or contact the office"
        });
      });
    this.resetDeparture();
  };

  render() {
    switch (this.state.display) {
      case "list":
        return (
          <div fluid>
            <div size="md-12">
              <PageTitle>
                <h1>Departure</h1>
              </PageTitle>
              Select lot for kiosk:
              {this.state.lots.length ? (
                <select
                  onChange={this.updateCurrentLot}
                  name="currentLotIndex"
                  defaultValue="empty"
                >
                  <option value="empty" disabled></option>
                  {this.state.lots.map((lot, index) => (
                    <option key={index} value={index}>
                      {lot.name}
                    </option>
                  ))}
                </select>
              ) : (
                <h3>No Lots, Go to Admin to Add Lots</h3>
              )}
            </div>
          </div>
        );
      case "detail":
        return (
          <div>
            <PageTitle>
              <h1>
                Departure: {this.state.lots[this.state.currentLotIndex].name}
              </h1>
            </PageTitle>
            Enter Ticket:
            <input
              name="ticket"
              type="text"
              onChange={this.handleInputChange}
              value={this.state.ticket}
            />
            <button onClick={this.depart}>Submit</button>
            <div>{this.state.statusMessage}</div>
          </div>
        );
    }
  }
}

export default Departure;
