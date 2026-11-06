import axios from "axios";
// const token = localStorage.getItem("token");
const token = "28|23CyIiFSpaVJVHCeWNbADER2hA9bww0zZiYVNSXe28ca086e";
const apiClient = axios.create({
 baseURL: "http://127.0.0.1:8000/api",
 headers: {
 "Content-Type": "application/json",
 Accept: "application/json",
 Authorization: 'Bearer ' + token,
 },
});
export default apiClient