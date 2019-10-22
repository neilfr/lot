import axios from "axios";

export default {
  getLots: function() {
    return axios.get("/api/lot");
  },
  updateLotEntry: function(id, lotEntry) {
    console.log("in api, update lot entry:", JSON.stringify(lotEntry));
    console.log("in api, id is:", id);
    return axios.put("/api/lot/" + id, lotEntry);
  },
  addLotEntry: function(lotEntry) {
    console.log("in api, add lot entry:", JSON.stringify(lotEntry));
    return axios.post("api/lot/", lotEntry);
  },
  // Deletes the lot with the given id
  deleteLotEntry: function(id) {
    console.log("INSIDE DELETE LOT");
    console.log("id is:", id);
    return axios.delete("/api/lot/" + id);
  },
  getVacancyCount: function(lotId) {
    console.log("INSIDE GET VACANCY COUNT:");
    console.log("lotId is:", lotId);
    return axios.get("api/lot/vacancies/" + lotId);
  },

  getNewTenant: function(lotId) {
    console.log("INSIDE ADD TENANT");
    console.log("lotId is:", lotId);
    return axios.get("api/lot/tenant/" + lotId);
  },

  getTenantPaymentInfo: function(lotId, ticket) {
    console.log("INSIDE GETFEEFORTICKET");
    console.log("lotId is:", lotId);
    console.log("ticket is:", ticket);
    return axios.get("api/lot/ticket/" + lotId + "/" + ticket);
  },

  updateTenant: function(lotId, tenant) {
    console.log("INSIDE UPDATE TENANT");
    console.log("lotId is:", lotId);
    console.log("tenant is:", tenant);
    return axios.put("api/lot/tenant/" + lotId, tenant);
  },

  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
