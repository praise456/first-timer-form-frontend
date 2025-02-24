mport React, { useState } from "react";
import axios from "axios";

export default function FirstTimerForm() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    occupation: "",
    contactAddress: "",
    telephone: "",
    email: "",
    bornAgain: "",
    hearAboutChurch: "",
    others: "",
    age: "",
    remarks: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/submit`, formData);
      setSubmitted(true);
      setFormData({
        name: "",
        gender: "",
        occupation: "",
        contactAddress: "",
        telephone: "",
        email: "",
        bornAgain: "",
        hearAboutChurch: "",
        others: "",
        age: "",
        remarks: ""
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleDownload = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/download`;
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">First Timer's Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block capitalize mb-1">{key.replace(/([A-Z])/g, " $1").trim()}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
      {submitted && (
        <button onClick={handleDownload} className="w-full mt-4 p-2 bg-green-500 text-white rounded">Download as Excel</button>
      )}
    </div>
  );
}
