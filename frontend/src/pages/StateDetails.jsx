import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate
} from "react-router-dom";

import Navbar from "../components/Navbar";
import "../styles/StateDetails.css";

import tamilNadu from "../assets/images/tamilnadu.jpg";
import assam from "../assets/images/assam.png";
import jammuKashmir from "../assets/images/jammuKashmir.png";
import rajasthan from "../assets/images/rajasthan.png";
import punjab from "../assets/images/punjab.jpg";
import odisha from "../assets/images/odisha.jpg";

function StateDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const stateData = {
    "tamil-nadu": {
      name: "Tamil Nadu",
      image: tamilNadu,
      description:
        "Tamil Nadu is known for magnificent temples, beautiful beaches, hill stations and rich cultural heritage."
    },

    assam: {
      name: "Assam",
      image: assam,
      description:
        "Assam is famous for tea gardens, the Brahmaputra River, wildlife and beautiful natural landscapes."
    },

    "jammu-kashmir": {
      name: "Jammu & Kashmir",
      image: jammuKashmir,
      description:
        "Jammu & Kashmir is known for beautiful valleys, snow-covered mountains, lakes and breathtaking scenery."
    },

    rajasthan: {
      name: "Rajasthan",
      image: rajasthan,
      description:
        "Rajasthan is famous for magnificent forts, palaces, deserts and colourful royal heritage."
    },

    punjab: {
      name: "Punjab",
      image: punjab,
      description:
        "Punjab is known for its vibrant culture, Golden Temple, delicious food and warm hospitality."
    },

    odisha: {
      name: "Odisha",
      image: odisha,
      description:
        "Odisha is known for ancient temples, beautiful beaches, traditional arts and rich cultural heritage."
    }
  };

  const state = stateData[id];

  useEffect(() => {
    if (!state) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/api/destinations")
      .then((response) => response.json())
      .then((data) => {

        const filteredDestinations = data.filter(
          (destination) =>
            destination.state === state.name
        );

        setDestinations(filteredDestinations);
        setLoading(false);
      })
      .catch((error) => {

        console.error(
          "Error fetching destinations:",
          error
        );

        setLoading(false);
      });

  }, [state]);


  if (!state) {
    return (
      <>
        <Navbar />

        <div className="state-not-found">
          <h1>State Not Found</h1>
          <p>
            The requested state could not be found.
          </p>
        </div>
      </>
    );
  }


  return (
    <>
      <Navbar />

      <section className="state-details">

        {/* STATE IMAGE */}

        <div className="state-details-image">
          <img
            src={state.image}
            alt={state.name}
          />
        </div>


        {/* STATE INFORMATION */}

        <div className="state-details-content">

          <h1>{state.name}</h1>

          <p>
            {state.description}
          </p>


          <h2>
            Popular Places to Visit
          </h2>


          {loading ? (

            <p className="loading">
              Loading destinations...
            </p>

          ) : destinations.length === 0 ? (

            <p className="loading">
              No destinations available yet.
            </p>

          ) : (

            <div className="places-list">

              {destinations.map(
                (destination) => (

                  <div
                    className="place-card"
                    key={destination._id}
                    onClick={() =>
                    navigate(`/destination/${destination._id}`)
                    }
                  >

                    <h3>
                      {destination.name}
                    </h3>

                    <p>
                      {destination.description}
                    </p>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </section>
    </>
  );
}

export default StateDetails;