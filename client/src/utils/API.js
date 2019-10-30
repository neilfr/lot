import axios from "axios";

export default {
  getLots: function() {
    return axios.get("/api/lot");
  },
  updateLotEntry: function(id, lotEntry) {
    return axios.put("/api/lot/" + id, lotEntry);
  },
  createLotEntry: function() {
    return axios.post("api/lot/");
  },
  deleteLotEntry: function(id) {
    return axios.delete("/api/lot/" + id);
  },
  getVacancyCount: function(lotId) {
    return axios.get("api/lot/getVacancyCount/" + lotId);
  },
  getNewTenant: function(lotId) {
    return axios.get("api/lot/getNewTenant/" + lotId);
  },
  getTenantPaymentInfo: function(lotId, ticket) {
    return axios.get(
      "api/lot/ticket/getTenantPaymentInfo/" + lotId + "/" + ticket
    );
  },
  getPaymentConfirmation: function(lotId, ticket) {
    return axios.get(
      "api/lot/ticket/paymentConfirmation/" + lotId + "/" + ticket
    );
  },
  payTicket: function(lotId, tenant) {
    return axios.put("api/lot/payTicket/" + lotId, tenant);
  }
};
