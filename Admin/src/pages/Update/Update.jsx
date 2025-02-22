import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Update.css";

const Update = () => {
  const [updateType, setUpdateType] = useState("WiFi"); // Default: WiFi
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

  return (
    <div className="update-container">
      <div className="form-card">
        <div className="button-group">
          <button className={updateType === "WiFi" ? "active" : ""} onClick={() => { setUpdateType("WiFi"); fetchWifi(); }}>
            Update WiFi
          </button>
          <button className={updateType === "Switch" ? "active" : ""} onClick={() => { setUpdateType("Switch"); fetchSwitch(); }}>
            Update Switch
          </button>
        </div>

        {updateType === "WiFi" && wifiList.length > 0 && (
          <div className="data-table">
            <h3 className="table-title">WiFi List</h3>
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
                {wifiList.map((wifi) => (
                  <tr key={wifi.WiFiId}>
                    <td>{wifi.WiFiId}</td>
                    <td>{wifi.IP_Addr}</td>
                    <td>{wifi.Location}</td>
                    <td>{wifi.Category}</td>
                    <td>
                      <button className="update-action-btn" onClick={() => window.location.href = `/updateItem/wifi/${wifi.WiFiId}`}>
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {updateType === "Switch" && switchList.length > 0 && (
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
                      <button className="update-action-btn" onClick={() => window.location.href = `/updateItem/switch/${sw.SwitchId}`}>
                        Update
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

export default Update;
