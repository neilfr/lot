import React, { Component } from "react";
import PageTitle from "../components/PageTitle";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Test, GetLots } from "../utils/api2";
import { FeeFormula } from "../components/FeeFormula";

class Arrival extends Component {
  state = {
    lots: [],
    currentLotIndex: null,
    display: "list",
    vacancies: null,
    tenant: null,
    ticketIssued: false
  };

  componentDidMount() {
    this.loadLots();
  }

  loadLots = () => {
    // GetLots();
    API.getLots()
      .then(res => {
        console.log("loading lot data:", res.data);
        this.setState({ lots: res.data });
      })
      .catch(err => console.log("error loading lot data"));
  };

  //Todo: reset if ticket not taken (takeTicket) within 10 seconds of ticket issue
  ticketPlease = () => {
    console.log("INSIDE TICKET PLEASE");
    API.getNewTenant(this.state.lots[this.state.currentLotIndex]._id)
      .then(res => {
        console.log("GET NEW TENANT RESPONSE");
        console.log(res.data);
        this.setState({ tenant: res.data, ticketIssued: true });
      })
      .then(() => {
        this.updateVacancyCount(this.state.currentLotIndex);
      })
      .catch(err => console.log("error getting ticket", err));
  };

  updateVacancyCount = lotIndex => {
    API.getVacancyCount(this.state.lots[lotIndex]._id)
      .then(res => {
        console.log("res is:", res);
        console.log("VACANCY COUNT IS:", res.data);
        // const vacancies = 5;
        this.setState({
          vacancies: res.data
        });
      })
      .catch(err => console.log("error getting vacancies"));
  };

  updateCurrentLot = event => {
    console.log("setting current lot");
    const lotIndex = event.target.value;
    console.log("lot index is:", lotIndex);
    API.getVacancyCount(this.state.lots[lotIndex]._id)
      .then(res => {
        console.log("res is:", res);
        console.log("VACANCY COUNT IS:", res.data);
        // const vacancies = 5;
        this.setState({
          currentLotIndex: lotIndex,
          vacancies: res.data,
          display: "detail"
        });
      })
      .catch(err => console.log("error getting vacancies"));
  };

  takeTicket = () => {
    this.setState({ tenant: null, ticketIssued: false });
  };

  render() {
    switch (this.state.display) {
      case "list":
        return (
          <div>
            <div size="md-12">
              <PageTitle>
                <h1>Arrival</h1>
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
                Arrival: {this.state.lots[this.state.currentLotIndex].name}
              </h1>
            </PageTitle>
            <p>Vacancies:{this.state.vacancies}</p>
            <p>Rate Information</p>
            <FeeFormula
              feeFormula={
                this.state.lots[this.state.currentLotIndex].feeFormula
              }
              listField="description"
            />

            <button
              disabled={!(this.state.vacancies > 0)}
              onClick={this.ticketPlease}
            >
              press for ticket
            </button>
            <div>
              {this.state.tenant ? (
                <div>
                  <p>ticket #:{this.state.tenant.ticket}</p>
                  <p>ticket issued:{this.state.tenant.arrival}</p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <button
              disabled={!this.state.ticketIssued}
              onClick={this.takeTicket}
            >
              Take ticket
            </button>
          </div>
        );
    }
  }
}

export default Arrival;
