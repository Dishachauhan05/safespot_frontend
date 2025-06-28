import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Dashboard = () => {
  const [coords, setCoords] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationError("Location access denied or unavailable.");
      }
    );
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("https://safespot-backend.onrender.com/report");
        setReports(res.data);
      } catch (error) {
        console.error("Failed to fetch reports", error);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="container my-4" style={{ backgroundColor: "#f4f6f9" }}>
      <h2 className="text-center mb-4 display-6 fw-bold text-success">
        🛡️ SafeSpot Dashboard
      </h2>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-danger shadow-sm">
            <div className="card-header fw-semibold">Total Reports</div>
            <div className="card-body">
              <h4 className="card-title">{reports.length}</h4>
              <p className="card-text">Active safety concerns reported.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-info shadow-sm">
            <div className="card-header fw-semibold">Your Location</div>
            <div className="card-body">
              <h5 className="card-title">
                {coords
                  ? `${coords.latitude.toFixed(3)}, ${coords.longitude.toFixed(3)}`
                  : locationError || "Fetching..."}
              </h5>
              <p className="card-text">Current geolocation.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-secondary shadow-sm">
            <div className="card-header fw-semibold">Last Report</div>
            <div className="card-body">
              <h5 className="card-title">
                {reports.length > 0
                  ? reports[reports.length - 1].title
                  : "No reports"}
              </h5>
              <p className="card-text">
                {reports.length > 0 && reports[reports.length - 1].createdAt
                  ? new Date(reports[reports.length - 1].createdAt).toLocaleString()
                  : "No data"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white fw-semibold">
              🗺️ Live Incident Map
            </div>
            <div className="card-body p-0" style={{ height: "600px" }}>
              <MapContainer
                center={
                  coords
                    ? [coords.latitude, coords.longitude]
                    : [20.5937, 78.9629]
                }
                zoom={coords ? 13 : 5}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {coords && (
                  <Marker
                    position={[coords.latitude, coords.longitude]}
                    icon={redIcon}
                  >
                    <Popup>You are here</Popup>
                  </Marker>
                )}
                {reports.map((report) => {
                  const coordinates = report?.location?.coordinates;
                  if (!coordinates || coordinates.length !== 2) return null;
                  const [lng, lat] = coordinates;
                  return (
                    <Marker key={report._id} position={[lat, lng]} icon={redIcon}>
                      <Popup>
                        <strong>{report.title}</strong>
                        <br />
                        {report.description}
                        <br />
                        <em>{report.address || "No address"}</em>
                        <br />
                        {report.imageUrl && (
                          <img
                            src={`https://safespot-backend.onrender.com${report.imageUrl}`}
                            alt="Report"
                            style={{ width: "100px", marginTop: "5px" }}
                          />
                        )}
                        <br />
                        <small>
                          {report.createdAt
                            ? new Date(report.createdAt).toLocaleString()
                            : "Unknown date"}
                        </small>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white fw-semibold">
              📋 All Reports
            </div>
            <div
              className="card-body"
              style={{ overflowY: "auto", maxHeight: "580px" }}
            >
              {reports.length === 0 ? (
                <p className="text-muted">No reports available.</p>
              ) : (
                reports.map((report) => (
                  <div
                    className="card mb-3 border-0 shadow-sm"
                    key={report._id}
                    style={{
                      background: "linear-gradient(145deg, #fff, #f1f1f1)",
                      borderLeft: "5px solid #dc3545",
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title text-danger mb-2">
                        🚨 {report.title}
                      </h5>
                      <p className="card-text text-muted mb-1">
                        📍 <strong>{report.address || "No address"}</strong>
                      </p>
                      <p className="mb-1">{report.description}</p>
                      {report.imageUrl && (
                        <img
                          src={`https://safespot-backend.onrender.com${report.imageUrl}`}
                          alt="report"
                          className="img-fluid rounded mt-2"
                          style={{
                            maxHeight: "130px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
                      )}
                      <p className="mt-2 mb-0">
                        <small className="text-muted">
                          🕒{" "}
                          {report.createdAt
                            ? new Date(report.createdAt).toLocaleString()
                            : "Unknown date"}
                        </small>
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
