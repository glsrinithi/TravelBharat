const mongoose = require("mongoose");
require("dotenv").config();

const Destination = require("./models/Destination");

const destinations = [

  // =========================
  // TAMIL NADU
  // =========================

  {
    name: "Ooty",
    state: "Tamil Nadu",
    description:
      "A beautiful hill station famous for tea gardens, cool weather and scenic mountain views."
  },

  {
    name: "Chennai",
    state: "Tamil Nadu",
    description:
      "The capital city of Tamil Nadu, known for Marina Beach, temples, culture and delicious South Indian food."
  },

  {
    name: "Madurai",
    state: "Tamil Nadu",
    description:
      "A historic city famous for the magnificent Meenakshi Amman Temple and rich Tamil culture."
  },

  {
    name: "Kodaikanal",
    state: "Tamil Nadu",
    description:
      "A peaceful hill station surrounded by forests, lakes and beautiful valleys."
  },

  {
    name: "Mahabalipuram",
    state: "Tamil Nadu",
    description:
      "A UNESCO World Heritage destination famous for ancient rock-cut temples and monuments."
  },


  // =========================
  // ASSAM
  // =========================

  {
    name: "Kaziranga National Park",
    state: "Assam",
    description:
      "A famous wildlife destination known for its one-horned rhinoceroses and diverse wildlife."
  },

  {
    name: "Guwahati",
    state: "Assam",
    description:
      "The largest city in Assam, known for the Kamakhya Temple and the Brahmaputra River."
  },

  {
    name: "Majuli",
    state: "Assam",
    description:
      "A beautiful river island known for Assamese culture, traditions and scenic surroundings."
  },

  {
    name: "Manas National Park",
    state: "Assam",
    description:
      "A spectacular national park famous for wildlife, forests and natural beauty."
  },

  {
    name: "Sivasagar",
    state: "Assam",
    description:
      "A historic town known for ancient Ahom monuments, temples and cultural heritage."
  },


  // =========================
  // JAMMU & KASHMIR
  // =========================

  {
    name: "Srinagar",
    state: "Jammu & Kashmir",
    description:
      "Known for Dal Lake, beautiful valleys, houseboats and traditional gardens."
  },

  {
    name: "Gulmarg",
    state: "Jammu & Kashmir",
    description:
      "A stunning mountain destination famous for snow, skiing and breathtaking landscapes."
  },

  {
    name: "Pahalgam",
    state: "Jammu & Kashmir",
    description:
      "A scenic valley surrounded by mountains, rivers and lush green landscapes."
  },

  {
    name: "Sonamarg",
    state: "Jammu & Kashmir",
    description:
      "A beautiful mountain destination known for glaciers, meadows and snow-covered peaks."
  },

  {
    name: "Jammu",
    state: "Jammu & Kashmir",
    description:
      "A historic city known for temples, cultural heritage and beautiful surroundings."
  },


  // =========================
  // RAJASTHAN
  // =========================

  {
    name: "Jaipur",
    state: "Rajasthan",
    description:
      "The Pink City famous for magnificent forts, palaces and royal heritage."
  },

  {
    name: "Udaipur",
    state: "Rajasthan",
    description:
      "The City of Lakes, known for beautiful palaces, lakes and romantic scenery."
  },

  {
    name: "Jodhpur",
    state: "Rajasthan",
    description:
      "The Blue City famous for the majestic Mehrangarh Fort and colourful streets."
  },

  {
    name: "Jaisalmer",
    state: "Rajasthan",
    description:
      "A golden desert city famous for its fort, sand dunes and traditional architecture."
  },

  {
    name: "Pushkar",
    state: "Rajasthan",
    description:
      "A historic town famous for its sacred lake, temples and colourful annual fair."
  },


  // =========================
  // PUNJAB
  // =========================

  {
    name: "Amritsar",
    state: "Punjab",
    description:
      "A famous cultural destination and home to the magnificent Golden Temple."
  },

  {
    name: "Ludhiana",
    state: "Punjab",
    description:
      "A major Punjabi city known for its vibrant markets, culture and industrial heritage."
  },

  {
    name: "Patiala",
    state: "Punjab",
    description:
      "A historic city famous for its royal heritage, palaces and traditional Punjabi culture."
  },

  {
    name: "Jalandhar",
    state: "Punjab",
    description:
      "A lively city known for its historical sites, sports culture and traditional Punjabi lifestyle."
  },

  {
    name: "Anandpur Sahib",
    state: "Punjab",
    description:
      "An important cultural and spiritual destination surrounded by scenic landscapes."
  },


  // =========================
  // ODISHA
  // =========================

  {
    name: "Puri",
    state: "Odisha",
    description:
      "A famous coastal destination known for the Jagannath Temple and beautiful beaches."
  },

  {
    name: "Bhubaneswar",
    state: "Odisha",
    description:
      "The capital of Odisha, famous for ancient temples and rich architectural heritage."
  },

  {
    name: "Konark",
    state: "Odisha",
    description:
      "A historic destination famous for the magnificent Sun Temple and ancient architecture."
  },

  {
    name: "Chilika Lake",
    state: "Odisha",
    description:
      "A beautiful coastal lagoon known for migratory birds, dolphins and scenic surroundings."
  },

  {
    name: "Cuttack",
    state: "Odisha",
    description:
      "A historic city known for its cultural heritage, ancient forts and traditional crafts."
  }
];


async function seedDatabase() {

  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected.");

    // Remove old 6 destinations
    await Destination.deleteMany({});

    // Insert all 30 destinations
    await Destination.insertMany(destinations);

    console.log(
      `Successfully added ${destinations.length} destinations.`
    );

    await mongoose.disconnect();

    console.log("Database connection closed.");

  } catch (error) {

    console.error("Seeding error:", error);

  }
}


seedDatabase();