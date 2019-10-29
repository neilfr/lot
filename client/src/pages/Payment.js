import React, { Component } from "react";
import PageTitle from "../components/PageTitle";
import API from "../utils/API";
import LotList from "../components/LotList";
import LotListItem from "../components/LotListItem";

import Moment from "moment";

class Payment extends Component {
  state = {
    lots: [],
    currentLotIndex: null,
    display: "list",
    ticket: "",
    tenant: "",
    duration: "",
    tenantInfoRetrieved: false,
    statusMessage: "",
    fee: ""
  };

  componentDidMount() {
    this.loadLots();
  }

  formatCurrency = value => {
    const result = value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
    return result;
  };

  formatDuration = tenant => {
    const duration = Moment.utc(tenant.payment).diff(
      Moment.utc(tenant.arrival),
      "minutes"
    );
    const hours = Math.floor(duration / 60);
    const remainingMinutes = duration - hours * 60;
    return hours + " hours " + remainingMinutes + " minutes";
  };

  loadLots = () => {
    API.getLots()
      .then(res => {
        this.setState({ lots: res.data });
      })
      .catch(err => console.log("error loading lot data:", err));
  };

  updateCurrentLot = lotIndex => {
    console.log("setting current lot");
    console.log("lot index is:", lotIndex);
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

  getTenantPaymentInfo = () => {
    API.getTenantPaymentInfo(
      this.state.lots[this.state.currentLotIndex]._id,
      this.state.ticket
    )
      .then(res => {
        const tenant = res.data;
        this.setState({
          tenant: tenant,
          duration: this.formatDuration(tenant),
          tenantInfoRetrieved: true,
          statusMessage: "",
          fee: this.formatCurrency(tenant.fee)
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
    API.payTicket(
      this.state.lots[this.state.currentLotIndex]._id,
      this.state.tenant
    ).catch(err => {
      console.log("error updating tenant:", err);
    });
    this.setState({
      ticket: "",
      tenant: "",
      duration: "",
      tenantInfoRetrieved: false,
      statusMessage: "",
      fee: ""
    });

    //TODO: handle screen refresh if 'pay ticket' is never pressed
  };

  render() {
    switch (this.state.display) {
      case "list":
        return (
          <div>
            <div size="md-12">
              <PageTitle>Payment</PageTitle>
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
          </div>
        );
      case "detail":
        return (
          <div>
            <PageTitle>
              Payment: {this.state.lots[this.state.currentLotIndex].name}
            </PageTitle>
            <div className="grid-container bg-primary text-white">
              <label>Enter Ticket #:</label>
              <input
                name="ticket"
                type="text"
                onChange={this.handleInputChange}
                value={this.state.ticket}
              />
              <label>Duration:</label>
              <input type="text" defaultValue={this.state.duration} readOnly />
              <label>Fee:</label>
              <input type="text" defaultValue={this.state.fee} readOnly />
              <div></div>
            </div>
            <button
              className="btn btn-primary"
              onClick={this.getTenantPaymentInfo}
            >
              Submit
            </button>
            <button
              className="btn btn-primary"
              disabled={!this.state.tenantInfoRetrieved}
              onClick={this.payTicket}
            >
              Pay
            </button>
            <div>{this.state.statusMessage}</div>
          </div>
        );
    }
  }
}

export default Payment;
