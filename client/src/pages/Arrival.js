import React, { Component } from "react";
import PageTitle from "../components/PageTitle";
import API from "../utils/API";
import FeeFormula from "../components/FeeFormula";
import LotList from "../components/LotList";
import LotListItem from "../components/LotListItem";
import ArrivalCard from "../components/ArrivalCard";

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
    API.getLots()
      .then(res => {
        console.log("loading lot data:", res.data);
        this.setState({ lots: res.data });
      })
      .catch(err => console.log("error loading lot data:", err));
  };

  ticketPlease = () => {
    console.log("INSIDE TICKETPLEASE");
    API.getNewTenant(this.state.lots[this.state.currentLotIndex]._id)
      .then(res => {
        this.setState({ tenant: res.data, ticketIssued: true });
      })
      .then(() => {
        console.log("after get new tenant, before update vacancy count");
        this.updateVacancyCount(this.state.currentLotIndex);
      })
      .catch(err => console.log("error getting ticket:", err));
  };

  updateVacancyCount = lotIndex => {
    console.log("INSIDE ARRIVAL:UPDATEVACANCYCOUNT");
    API.getVacancyCount(this.state.lots[lotIndex]._id)
      .then(res => {
        console.log(
          "INSIDE CALLBACK FROM API.GETVACANCYCOUNT,res.data:",
          res.data
        );
        this.setState({
          vacancies: res.data
        });
      })
      .catch(err => console.log("error getting vacancies:", err));
  };

  updateCurrentLot = lotIndex => {
    API.getVacancyCount(this.state.lots[lotIndex]._id)
      .then(res => {
        this.setState({
          currentLotIndex: lotIndex,
          vacancies: res.data,
          display: "detail"
        });
      })
      .catch(err => console.log("error getting vacancies:", err));
  };

  takeTicket = () => {
    this.setState({ tenant: null, ticketIssued: false });
  };

  render() {
    switch (this.state.display) {
      case "list":
        return (
          <div size="md-12">
            <PageTitle>Arrival</PageTitle>
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
              Arrival: {this.state.lots[this.state.currentLotIndex].name}
            </PageTitle>
            <FeeFormula
              feeFormula={
                this.state.lots[this.state.currentLotIndex].feeFormula
              }
              listField="description"
            />
            {/* TODO: Convert ArrivalCard and buttons into standardized Card; to share with other pages */}
            <ArrivalCard
              vacancies={this.state.vacancies}
              ticket={this.state.tenant ? this.state.tenant.ticket : ""}
              arrival={this.state.tenant ? this.state.tenant.arrival : ""}
            />
            <button
              className="btn btn-primary"
              disabled={!(this.state.vacancies > 0)}
              onClick={this.ticketPlease}
            >
              Press for Ticket
            </button>
            <button
              className="btn btn-primary"
              disabled={!this.state.ticketIssued}
              onClick={this.takeTicket}
            >
              Take Ticket
            </button>
          </div>
        );
    }
  }
}

export default Arrival;
