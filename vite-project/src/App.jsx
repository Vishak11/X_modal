import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    const { username, email, phone, dob } = formData;

    if (!username) newErrors.username = "Username is required.";
    if (!email.includes("@"))
      newErrors.email = "Invalid email. Please check your email address.";
    if (!phone || phone.length !== 10 || isNaN(phone)) {
      newErrors.phone =
        "Invalid phone number. Please enter a 10-digit phone number.";
    }
    if (!dob || new Date(dob) > new Date()) {
      newErrors.dob = "Invalid date of birth. Please enter a valid date.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Form submitted successfully!");
    setFormData({ username: "", email: "", phone: "", dob: "" });
    setIsOpen(true);
    setErrors({});
  };

  return (
    <div className="modal">
      {!isOpen && (
        <div>
          <p style={{ fontSize: "60px" }}>User Details Modal</p>
          <button
            style={{ backgroundColor: "blue", width: "100px", color: "white" }}
            onClick={() => setIsOpen(true)}
          >
            Open Form
          </button>
        </div>
      )}

      {isOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsOpen(false)} // Close modal on click outside
        >
          <div className="modal-content" onClick={() => setIsOpen(false)}>
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
              <h2>Fill Details</h2>

              <label>Username:</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              {errors.username && <span>{errors.username}</span>}

              <label>Email Address:</label>
              <input
                type="text"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <span>{errors.email}</span>}

              <label>Phone Number:</label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.phone && <span>{errors.phone}</span>}

              <label>Date of Birth:</label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
              {errors.dob && <span>{errors.dob}</span>}

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
