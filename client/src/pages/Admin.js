import React, { Component } from "react";
import API from "../utils/API";
import LotForm from "../components/LotForm";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import LotList from "../components/LotList";
import LotListItem from "../components/LotListItem";
import "./style.css";

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
        this.setState({ lots: res.data, currentLot: null, display: "list" });
      })
      .catch(err => console.log("error loading lot data:", err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    const currentLot = this.state.currentLot;
    currentLot[name] = value;
    this.setState({
      currentLot: currentLot
    });
  };

  updateCurrentLot = lotIndex => {
    const selectedLot = this.state.lots[lotIndex];
    this.setState({ currentLot: selectedLot, display: "detail" });
  };

  deleteLotEntry = lot => {
    API.deleteLotEntry(lot._id)
      .then(() => this.loadLotData())
      .catch(err => console.log("error deleting log entry:", err));
  };

  createNewLot = () => {
    API.createLotEntry().then(res => {
      this.setState({
        currentLot: res.data,
        display: "detail"
      });
    });
  };

  updateLotEntry = () => {
    const currentLot = this.state.currentLot;
    API.updateLotEntry(currentLot._id, currentLot).then(() => {
      this.loadLotData();
    });
  };

  render() {
    switch (this.state.display) {
      case "list":
        return (
          <div>
            <PageTitle>Admin</PageTitle>
            <Button label="+" onClick={this.createNewLot} />
            {this.state.lots.length ? (
              <LotList>
                {this.state.lots.map((lot, index) => (
                  <LotListItem
                    className="lotListItem"
                    key={lot._id}
                    lot={lot}
                    onClick={() => {
                      this.updateCurrentLot(index);
                    }}
                  />
                ))}
              </LotList>
            ) : (
              <h3>Press "+" to add a lot</h3>
            )}
          </div>
        );
      case "detail":
        return (
          <div>
            <PageTitle>Lot Update</PageTitle>
            <LotForm
              lot={this.state.currentLot}
              onChange={this.handleInputChange}
              updateLotEntry={this.updateLotEntry}
              cancelClick={this.loadLotData}
              deleteClick={this.deleteLotEntry}
            />
          </div>
        );
    }
  }
}

export default Admin;
