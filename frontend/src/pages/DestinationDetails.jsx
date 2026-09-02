import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import "../styles/DestinationDetails.css";

function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/destinations/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Destination not found");
        }

        return response.json();
      })
      .then((data) => {
        setDestination(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="destination-loading">
          <h2>Loading destination...</h2>
        </div>
      </>
    );
  }

  if (!destination) {
    return (
      <>
        <Navbar />

        <div className="destination-not-found">
          <h1>Destination Not Found</h1>

          <button onClick={() => navigate("/states")}>
            Back to States
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="destination-details-page">

        <div className="destination-details-card">

          <span className="destination-state">
            {destination.state}
          </span>

          <h1>
            {destination.name}
          </h1>

          <p>
            {destination.description}
          </p>

          <button
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

        </div>

      </section>
    </>
  );
}

export default DestinationDetails;