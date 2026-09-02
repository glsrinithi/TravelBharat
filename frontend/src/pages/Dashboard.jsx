import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [stateCount, setStateCount] = useState(0);
  const [destinationCount, setDestinationCount] = useState(0);

  const [destinations, setDestinations] = useState([]);

  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);


  // ===============================
  // LOGIN + LOAD DATA
  // ===============================

  useEffect(() => {
  const loggedIn = localStorage.getItem("adminLoggedIn");

  if (loggedIn !== "true") {
    navigate("/admin");
    return;
  }

  fetch("http://localhost:5000/api/messages")
    .then((response) => response.json())
    .then((data) => {
      setMessages(data);
      setLoadingMessages(false);
    })
    .catch((error) => {
      console.error("Error fetching messages:", error);
      setLoadingMessages(false);
    });

}, [navigate]);


  // ===============================
  // GET DESTINATIONS
  // ===============================

  const fetchDestinations = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/destinations"
      );

      const data = await response.json();

      setDestinations(data);

    } catch (error) {
      console.error(
        "Error fetching destinations:",
        error
      );
    }
  };


  // ===============================
  // ADD / UPDATE
  // ===============================

  const handleSubmit = async (event) => {
    event.preventDefault();

    const destinationData = {
      name,
      state,
      description
    };

    try {

      // EDIT
      if (editingId) {

        const response = await fetch(
          `http://localhost:5000/api/destinations/${editingId}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify(destinationData)
          }
        );

        const data = await response.json();

        if (response.ok) {

          setDestinations(
            destinations.map((destination) =>
              destination._id === editingId
                ? data
                : destination
            )
          );

          clearForm();

        } else {
          alert(data.message);
        }

      }

      // ADD
      else {

        const response = await fetch(
          "http://localhost:5000/api/destinations",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify(destinationData)
          }
        );

        const data = await response.json();

        if (response.ok) {

          setDestinations([
            ...destinations,
            data
          ]);

          clearForm();

        } else {
          alert(data.message);
        }
      }

    } catch (error) {

      console.error(
        "Save error:",
        error
      );

      alert(
        "Unable to save destination."
      );
    }
  };


  // ===============================
  // EDIT BUTTON
  // ===============================

  const handleEdit = (destination) => {

    setEditingId(destination._id);

    setName(destination.name);

    setState(destination.state);

    setDescription(
      destination.description
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  // ===============================
  // DELETE
  // ===============================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this destination?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:5000/api/destinations/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (response.ok) {

        setDestinations(
          destinations.filter(
            (destination) =>
              destination._id !== id
          )
        );

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(
        "Delete error:",
        error
      );

      alert(
        "Unable to delete destination."
      );
    }
  };


  // ===============================
  // CLEAR FORM
  // ===============================

  const clearForm = () => {

    setName("");
    setState("");
    setDescription("");
    setEditingId(null);

  };


  // ===============================
  // LOGOUT
  // ===============================

  const handleLogout = () => {

    localStorage.removeItem(
      "adminLoggedIn"
    );

    navigate("/admin");

  };


  // ===============================
  // UI
  // ===============================

  return (
    <>
      <Navbar />

      <section className="dashboard-page">

        <div className="dashboard-header">

          <div>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Manage TravelBharat destinations.
            </p>

          </div>

          <button
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>


        {/* STATISTICS */}

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <h2>{stateCount}</h2>
            <p>States</p>
          </div>

          <div className="dashboard-card">
            <h2>
              {destinationCount}
            </h2>

            <p>Destinations</p>
          </div>

          <div className="dashboard-card">
            <h2>1</h2>
            <p>Admin</p>
          </div>

        </div>


        {/* ADD / EDIT FORM */}

        <div className="dashboard-section">

          <h2>
            {editingId
              ? "Edit Destination"
              : "Add New Destination"}
          </h2>

          <form
            className="destination-form"
            onSubmit={handleSubmit}
          >

            <input
              type="text"
              placeholder="Destination name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />


            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(event) =>
                setState(event.target.value)
              }
              required
            />


            <textarea
              placeholder="Destination description"
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              required
            />


            <div>

              <button type="submit">
                {editingId
                  ? "Update Destination"
                  : "Add Destination"}
              </button>


              {editingId && (
                <button
                  type="button"
                  onClick={clearForm}
                  style={{
                    marginLeft: "10px",
                    background: "#777"
                  }}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>


        {/* DESTINATIONS */}

        <div className="dashboard-section">

          <h2>
            Destinations
          </h2>

          <div className="destination-list">

            {destinations.map(
              (destination) => (

                <div
                  className="destination-admin-card"
                  key={destination._id}
                >

                  <div>

                    <h3>
                      {destination.name}
                    </h3>

                    <strong>
                      {destination.state}
                    </strong>

                    <p>
                      {destination.description}
                    </p>

                  </div>


                  <div>

                    <button
                      onClick={() =>
                        handleEdit(
                          destination
                        )
                      }
                      style={{
                        background: "#0b5ed7",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 20px",
                        marginRight: "10px",
                        cursor: "pointer"
                      }}
                    >
                      Edit
                    </button>


                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(
                          destination._id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

        <div className="dashboard-section">

  <div className="messages-header">
    <div>
      <h2>Contact Messages</h2>
      <p>Messages submitted by TravelBharat visitors.</p>
    </div>

    <span className="message-count">
      {messages.length} Messages
    </span>
  </div>


  {loadingMessages ? (

    <p className="message-loading">
      Loading messages...
    </p>

  ) : messages.length === 0 ? (

    <div className="no-messages">
      <h3>No messages yet</h3>
      <p>
        Contact form submissions will appear here.
      </p>
    </div>

  ) : (

    <div className="messages-list">

      {messages.map((item) => (

        <div
          className="message-card"
          key={item._id}
        >

          <div className="message-card-header">

            <div>
              <h3>{item.name}</h3>
              <span>{item.email}</span>
            </div>

            <small>
              {new Date(item.createdAt).toLocaleDateString()}
            </small>

          </div>

          <p>
            {item.message}
          </p>

        </div>

      ))}

    </div>

  )}

</div>

      </section>
    </>
  );
}

export default Dashboard;