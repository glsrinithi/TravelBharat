const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Destination = require("./models/Destination");

const app = express();
const Message = require("./models/Message");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// ===============================
// MONGODB CONNECTION
// ===============================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });


// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "TravelBharat Backend is running!"
  });
});

// ===============================
// GET SINGLE DESTINATION
// ===============================

app.get("/api/destinations/:id", async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found."
      });
    }

    res.json(destination);

  } catch (error) {
    console.error("Error fetching destination:", error);

    res.status(500).json({
      message: "Failed to fetch destination."
    });
  }
});


// ===============================
// STATES
// ===============================

const states = [
  {
    id: "tamil-nadu",
    name: "Tamil Nadu"
  },
  {
    id: "assam",
    name: "Assam"
  },
  {
    id: "jammu-kashmir",
    name: "Jammu & Kashmir"
  },
  {
    id: "rajasthan",
    name: "Rajasthan"
  },
  {
    id: "punjab",
    name: "Punjab"
  },
  {
    id: "odisha",
    name: "Odisha"
  }
];

app.get("/api/states", (req, res) => {
  res.json(states);
});


// ===============================
// GET DESTINATIONS
// ===============================

app.get("/api/destinations", async (req, res) => {
  try {
    const destinations = await Destination.find();

    res.json(destinations);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch destinations"
    });
  }
});


// ===============================
// ADD DESTINATION
// ===============================

app.post("/api/destinations", async (req, res) => {
  try {
    const {
      name,
      state,
      description
    } = req.body;

    if (!name || !state || !description) {
      return res.status(400).json({
        message: "All fields are required."
      });
    }

    const newDestination = new Destination({
      name,
      state,
      description
    });

    const savedDestination =
      await newDestination.save();

    res.status(201).json(savedDestination);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add destination"
    });
  }
});


// ===============================
// DELETE DESTINATION
// ===============================

app.delete(
  "/api/destinations/:id",
  async (req, res) => {

    try {

      const deletedDestination =
        await Destination.findByIdAndDelete(
          req.params.id
        );

      if (!deletedDestination) {
        return res.status(404).json({
          message: "Destination not found."
        });
      }

      res.json({
        message: "Destination deleted successfully."
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message: "Failed to delete destination"
      });

    }
  }
);

// ===============================
// UPDATE DESTINATION
// ===============================

app.put(
  "/api/destinations/:id",
  async (req, res) => {
    try {
      const {
        name,
        state,
        description
      } = req.body;

      if (!name || !state || !description) {
        return res.status(400).json({
          message: "All fields are required."
        });
      }

      const updatedDestination =
        await Destination.findByIdAndUpdate(
          req.params.id,
          {
            name,
            state,
            description
          },
          {
            new: true,
            runValidators: true
          }
        );

      if (!updatedDestination) {
        return res.status(404).json({
          message: "Destination not found."
        });
      }

      res.json(updatedDestination);

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to update destination"
      });
    }
  }
);


// ===============================
// ADMIN LOGIN
// ===============================

app.post("/api/admin/login", (req, res) => {

  const {
    username,
    password
  } = req.body;

  if (
    username === "admin" &&
    password === "admin123"
  ) {

    return res.json({
      success: true,
      message: "Login successful"
    });

  }

  res.status(401).json({
    success: false,
    message: "Invalid username or password"
  });

});

// ===============================
// CONTACT MESSAGES
// ===============================

app.post("/api/messages", async (req, res) => {
  try {
    const {
      name,
      email,
      message
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required."
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      message
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: newMessage
    });

  } catch (error) {
    console.error(
      "Message error:",
      error
    );

    res.status(500).json({
      message: "Failed to send message."
    });
  }
});

// ===============================
// START SERVER
// ===============================

// ===============================
// GET CONTACT MESSAGES
// ===============================

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 });

    res.json(messages);

  } catch (error) {
    console.error("Error fetching messages:", error);

    res.status(500).json({
      message: "Failed to fetch messages."
    });
  }
});

// ===============================
// START SERVER
// ===============================

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `TravelBharat server running on port ${PORT}`
  );
});