import React, { Component } from "react";
import PageTitle from "../components/PageTitle";
import API from "../utils/API";
import LotList from "../components/LotList";
import LotListItem from "../components/LotListItem";

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
        this.setState({ lots: res.data });
      })
      .catch(err => console.log("error loading lot data:", err));
  };

  updateCurrentLot = lotIndex => {
    this.setState({
      currentLotIndex: lotIndex,
      display: "detail"
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
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
          <div size="md-12">
            <PageTitle>Departure</PageTitle>
            {this.state.lots.length ? (
              <LotList>
                {this.state.lots.map((lot, index) => (
                  <LotListItem
                    key={index}
                    lot={lot}
                    onClick={() => {
                      this.updateCurrentLot(index);
                    }}
                  />
                ))}
              </LotList>
            ) : (
              <h3>No Lots, Go to Admin to Add Lots</h3>
            )}
          </div>
        );
      case "detail":
        return (
          <div>
            <PageTitle>
              Departure: {this.state.lots[this.state.currentLotIndex].name}
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
