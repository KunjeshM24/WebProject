import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Delete.css";

const Delete = () => {
  const [deleteType, setDeleteType] = useState("WiFi"); // Default: WiFi
  const [wifiList, setWifiList] = useState([]);
  const [switchList, setSwitchList] = useState([]);
  const url = "http://localhost:5000";

  useEffect(() => {
    fetchWifi();
  }, []);

  const fetchWifi = async () => {
    try {
      const response = await axios.get(`${url}/api/wifi/list`);
      if (response.data.success) {
        setWifiList(response.data.data);
        setSwitchList([]);
      } else {
        toast.error("Error fetching WiFi data");
      }
    } catch (error) {
      toast.error("Error fetching WiFi data");
      console.error("Error:", error);
    }
  };

  const fetchSwitch = async () => {
    try {
      const response = await axios.get(`${url}/api/switch/list`);
      if (response.data.success) {
        setSwitchList(response.data.data);
        setWifiList([]);
      } else {
        toast.error("Error fetching Switch data");
      }
    } catch (error) {
      toast.error("Error fetching Switch data");
      console.error("Error:", error);
    }
  };

  const deleteItem = async (type, id) => {
    const userPassword = prompt("Enter password to delete:");
    if (userPassword !== "kunj123") {
      toast.error("Incorrect password. Deletion canceled.");
      return;
    }

    try {
      const response = await axios.delete(`${url}/api/${type}/delete/${id}`);
      if (response.data.success) {
        toast.success(`${type === "wifi" ? "WiFi" : "Switch"} deleted successfully`);
        type === "wifi" ? fetchWifi() : fetchSwitch();
      } else {
        toast.error("Error deleting item");
      }
    } catch (error) {
      toast.error("Error deleting item");
      console.error("Error:", error);
    }
  };

  return (
    <div className="delete-container">
      <div className="form-card">
        <div className="button-group">
          <button className={deleteType === "WiFi" ? "active" : ""} onClick={() => { setDeleteType("WiFi"); fetchWifi(); }}>
            Delete WiFi
          </button>
          <button className={deleteType === "Switch" ? "active" : ""} onClick={() => { setDeleteType("Switch"); fetchSwitch(); }}>
            Delete Switch
          </button>
        </div>

        {deleteType === "WiFi" && wifiList.length > 0 && (
          <div className="data-table">
            <h3 className="table-title">WiFi List</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>IP Address</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {wifiList.map((wifi) => (
                  <tr key={wifi.WiFiId}>
                    <td>{wifi.WiFiId}</td>
                    <td>{wifi.IP_Addr}</td>
                    <td>{wifi.Location}</td>
                    <td>{wifi.Category}</td>
                    <td>{wifi.Password}</td>
                    <td>
                      <button className="delete-action-btn" onClick={() => deleteItem("wifi", wifi.WiFiId)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {deleteType === "Switch" && switchList.length > 0 && (
          <div className="data-table">
            <h3 className="table-title">Switch List</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>IP Address</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {switchList.map((sw) => (
                  <tr key={sw.SwitchId}>
                    <td>{sw.SwitchId}</td>
                    <td>{sw.Ip_addr}</td>
                    <td>{sw.Location}</td>
                    <td>{sw.Category}</td>
                    <td>
                      <button className="delete-action-btn" onClick={() => deleteItem("switch", sw.SwitchId)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Delete;
