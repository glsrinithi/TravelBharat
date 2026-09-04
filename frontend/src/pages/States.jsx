import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import "../styles/States.css";

import tamilNadu from "../assets/images/tamilnadu.jpg";
import assam from "../assets/images/assam.png";
import jammuKashmir from "../assets/images/jammuKashmir.png";
import rajasthan from "../assets/images/rajasthan.png";
import punjab from "../assets/images/punjab.jpg";
import odisha from "../assets/images/odisha.jpg";

function States() {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const stateImages = {
    "tamil-nadu": tamilNadu,
    "assam": assam,
    "jammu-kashmir": jammuKashmir,
    "rajasthan": rajasthan,
    "punjab": punjab,
    "odisha": odisha,
  };

  useEffect(() => {
    fetch("https://travelbharat-cznx.onrender.com/api/states")
      .then((response) => response.json())
      .then((data) => {
        setStates(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <section className="states-page">

        <div className="states-header">
          <h1>Explore Indian States</h1>

          <p>
            Discover the culture, heritage and beauty of different
            regions of India.
          </p>
        </div>

        {loading ? (
          <p className="loading">Loading states...</p>
        ) : (
          <div className="states-grid">

            {states.map((state) => (
              <div className="state-item" key={state.id}>

                <img
                  src={stateImages[state.id]}
                  alt={state.name}
                  className="state-image"
                />

                <div className="state-content">

                  <h2>{state.name}</h2>

                  <p>
                    Explore the destinations, culture and attractions
                    of {state.name}.
                  </p>

                  <button
                    onClick={() => navigate(`/states/${state.id}`)}
                  >
                    Explore
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>
    </>
  );
}

export default States;