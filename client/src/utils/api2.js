import API from "./API";
const Test = "hello world";

const GetLots = () => {
  API.getLots()
    .then(res => {
      console.log("loading lot data:", res.data);
      this.setState({ lots: res.data });
    })
    .catch(err => console.log("error loading lot data"));
};

export { Test, GetLots };
