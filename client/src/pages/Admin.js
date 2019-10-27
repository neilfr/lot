import React, { Component } from "react";
import API from "../utils/API";
import LotForm from "../components/LotForm";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import LotList from "../components/LotList";
import LotListItem from "../components/LotListItem";

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
        console.log("loading lot data:", res.data);
        this.setState({ lots: res.data, currentLot: null, display: "list" });
      })
      .catch(err => console.log("error loading lot data"));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    const currentLot = this.state.currentLot;
    currentLot[name] = value;
    this.setState({
      currentLot: currentLot
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  updateCurrentLot = lotIndex => {
    const selectedLot = this.state.lots[lotIndex];
    console.log("selected lot is:", selectedLot);
    this.setState({ currentLot: selectedLot, display: "detail" });
  };

  deleteLotEntry = lot => {
    console.log("DELETING LOT:", lot);
    console.log("LOT._ID IS:", lot._id);
    API.deleteLotEntry(lot._id)
      .then(res => this.loadLotData())
      .catch(err => console.log(err));
  };

  createNewLot = () => {
    API.createLotEntry().then(res => {
      console.log("response from addLotEntry:", res.data);
      this.setState({
        currentLot: res.data,
        display: "detail"
      });
    });
  };

  updateLotEntry = () => {
    console.log("calling api.updatelotentry with:", this.state.currentLot);
    const currentLot = this.state.currentLot;
    console.log("current lot id is:", currentLot._id);
    API.updateLotEntry(currentLot._id, currentLot)
      .then(res => {
        console.log("response from updateLotEntry:", res.data);
      })
      .then(() => {
        this.loadLotData();
      });
  };

  render() {
    switch (this.state.display) {
      case "list":
        return (
          <div>
            <div size="md-12">
              <PageTitle>Admin</PageTitle>
              <Button label="+" onClick={this.createNewLot} />
              {this.state.lots.length ? (
                <LotList>
                  {this.state.lots.map((lot, index) => (
                    <LotListItem
                      key={lot._id}
                      lot={lot}
                      onClick={() => {
                        this.updateCurrentLot(index);
                      }}
                    />
                  ))}
                </LotList>
              ) : (
                <h3>No Lots to Display</h3>
              )}
            </div>
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
