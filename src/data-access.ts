import axios from "axios";

const defaultHeaders = (axios.defaults.headers.common = {
  Authorization: "Token ee19a18378fc8e9263328bc3b3f6319819f6aef6",
  Organization: 698,
});

export const getWorkspaceMembers = () => {
  return axios.get("https://api.simplified.com/api/v2/workspaces/698/members", {
    headers: defaultHeaders,
  });
};

export const getAIDocuments = () => {
  return axios.get("https://api.simplified.com/api/v1/documents", {
    headers: defaultHeaders,
  });
};
