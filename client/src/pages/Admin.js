import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { LotEntry } from "../components/LotEntry";
import { LotForm } from "../components/LotForm";

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
    const lotEntry = this.state.currentLot;
    lotEntry[name] = value;
    this.setState({
      currentLot: lotEntry
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

  setCurrentLot = event => {
    console.log("event.target is:", event.target);
    console.log("event.target.value is:", event.target.value);
    const selectedLot = this.state.lots[event.target.value];
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

  addLotEntry = () => {
    const lotEntry = {
      name: "update name",
      capacity: 0,
      //! defaults should be read in via a json file
      feeFormula: [
        { elapsedMinutes: 61, fee: 3 },
        { elapsedMinutes: 181, fee: 4.5 },
        { elapsedMinutes: 361, fee: 6.75 },
        { elapsedMinutes: 1441, fee: 10.12 }
      ],
      departureLeeway: 15
    };
    API.addLotEntry(lotEntry).then(res => {
      console.log("response from addLotEntry:", res.data);
      this.setState({
        currentLot: res.data,
        display: "detail"
      });
    });
    // .then(() => {
    //   this.loadLotData();
    // });
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
          <Container fluid>
            <Col size="md-12">
              <Jumbotron>
                <h1>Lot List</h1>
              </Jumbotron>
              <button onClick={this.addLotEntry}>Add New Lot</button>
              {this.state.lots.length ? (
                <List>
                  {this.state.lots.map((lot, index) => (
                    <LotEntry
                      key={lot._id}
                      setCurrentLot={this.setCurrentLot}
                      lot={lot}
                      value={index}
                    />
                  ))}
                </List>
              ) : (
                <h3>No Lots to Display</h3>
              )}
            </Col>
          </Container>
        );
      case "detail":
        return (
          <div>
            <Jumbotron>
              <h1>Lot Update</h1>
            </Jumbotron>
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
