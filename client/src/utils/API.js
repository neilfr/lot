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
  createLotEntry: function() {
    console.log("in api, add lot entry");
    // return axios.post("api/lot/", lotEntry);
    return axios.post("api/lot/");
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
    console.log("INSIDE GET NEW TENANT");
    console.log("lotId is:", lotId);
    return axios.get("api/lot/tenant/" + lotId);
  },
  getTenantPaymentInfo: function(lotId, ticket) {
    console.log("INSIDE GETTENANTPAYMENTINFO");
    console.log("lotId is:", lotId);
    console.log("ticket is:", ticket);
    return axios.get("api/lot/ticket/payment/" + lotId + "/" + ticket);
  },
  getPaymentConfirmation: function(lotId, ticket) {
    console.log("INSIDE GETPAYMENTCONFIRMATION");
    console.log("lotId is:", lotId);
    console.log("ticket is:", ticket);
    return axios.get(
      "api/lot/ticket/paymentConfirmation/" + lotId + "/" + ticket
    );
  },
  payTicket: function(lotId, tenant) {
    console.log("INSIDE API PAYTICKET");
    console.log("lotId is:", lotId);
    console.log("tenant is:", tenant);
    return axios.put("api/lot/tenant/" + lotId, tenant);
  }
};
