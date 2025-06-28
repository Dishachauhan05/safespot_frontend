import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ReportForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState('');
  const [locationError, setLocationError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        setCoords({ latitude, longitude });
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setLocationError('Unable to fetch location. Please allow access.');
      }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !coords || !address) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('address', address);
    formData.append('latitude', coords.latitude);
    formData.append('longitude', coords.longitude);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post(
        'https://safespot-backend.onrender.com/report',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert('Report submitted!');
      navigate('/reports');
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit report.');
    }
  };

  const bgStyle = {
    background: 'linear-gradient(120deg,rgb(249, 254, 251),rgb(208, 233, 207))',
    minHeight: '100vh',
    padding: '60px 20px',
    fontFamily: "'Segoe UI', sans-serif",
  };

  const cardStyle = {
    borderRadius: '1rem',
    maxWidth: '700px',
    width: '100%',
  };

  const redHeaderStyle = {
    backgroundColor: '#d32f2f',
    color: '#fff',
    padding: '15px',
    borderTopLeftRadius: '1rem',
    borderTopRightRadius: '1rem',
    fontWeight: '600',
  };

  const fileDropZoneStyle = {
    border: '2px dashed #ccc',
    borderRadius: '10px',
    padding: '40px',
    textAlign: 'center',
    cursor: 'pointer',
    background: '#fafafa',
    color: '#666',
  };

  const contactBoxStyle = {
    backgroundColor: '#ffe5e5',
    padding: '15px',
    borderRadius: '10px',
    fontSize: '0.9rem',
    marginTop: '20px',
  };

  return (
    <div style={bgStyle} className="d-flex justify-content-center">
      <div className="shadow bg-white" style={cardStyle}>
        <div style={redHeaderStyle}>📋 Report Details</div>
        <div className="p-4">
          <h4 className="text-center fw-bold text-danger">Emergency Incident Report</h4>
          <p className="text-center text-muted mb-4" style={{ fontSize: '0.95rem' }}>
            Please provide detailed information about the emergency situation.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Incident Title *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Brief description of the incident"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Detailed Description *</label>
              <textarea
                className="form-control"
                placeholder="Describe the situation, what happened, when, and any actions taken"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Supporting Documentation</label>
              <div style={fileDropZoneStyle}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="form-control"
                />
                <small className="d-block mt-2">Click to upload image (JPG/PNG, up to 10MB)</small>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">📍 Location Information</label>
              <input
                type="text"
                className="form-control mb-2"
                readOnly
                value={
                  coords
                    ? `${coords.latitude}, ${coords.longitude}`
                    : locationError || 'Detecting location...'
                }
              />
              <input
                type="text"
                className="form-control"
                placeholder="Street Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div style={contactBoxStyle}>
              <h6 className="text-danger fw-bold mb-2">📞 Emergency Contacts</h6>
              <div>General Emergency: <strong>911</strong></div>
              <div>Poison Control: <strong>1-800-222-1222</strong></div>
            
            </div>

            <button type="submit" className="btn btn-danger w-100 mt-4 fw-semibold py-2">
               Submit Emergency Report
            </button>
          </form>

          <div className="text-center text-muted small mt-3">
            
          </div>
        </div>
      </div>
    </div>
  );
}
