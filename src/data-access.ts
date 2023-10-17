import axios from "axios";
import {
  GET_DOCUMENTS_ENDPOINT,
  GET_DOCUMENT_DETAILS_ENDPOINT,
  GET_WORKSPACE_MEMBERS_ENDPOINT,
} from "./endpoints";

const defaultHeaders = (axios.defaults.headers.common = {
  Authorization: "Token ee19a18378fc8e9263328bc3b3f6319819f6aef6",
  Organization: 698,
});

export const getWorkspaceMembers = () => {
  const endpoint = new URL(GET_WORKSPACE_MEMBERS_ENDPOINT);
  return axios.get(endpoint.href, {
    headers: defaultHeaders,
  });
};

export const getAIDocuments = () => {
  const endpoint = new URL(GET_DOCUMENTS_ENDPOINT);
  return axios.get(endpoint.href, {
    headers: defaultHeaders,
  });
};

export const getDocumentDetails = () => {
  const endpoint = new URL(GET_DOCUMENT_DETAILS_ENDPOINT);
  return axios.get(endpoint.href, {
    headers: defaultHeaders,
  });
};
