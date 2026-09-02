import "../styles/About.css";
import Navbar from "../components/Navbar";

function About() {
  return (
    <>
      <Navbar />

      <section className="about-page">

        <div className="about-hero">
          <h1>About TravelBharat</h1>
          <p>Discover India. Experience its diversity.</p>
        </div>

        <div className="about-content">

          <h2>Discover the Beauty of India</h2>

          <p>
            TravelBharat is a tourism platform created to help travellers
            discover the diverse states, destinations, culture, heritage and
            natural beauty of India.
          </p>

          <p>
            From ancient temples and historic monuments to beautiful beaches,
            hill stations, wildlife and vibrant cultural experiences,
            TravelBharat brings India's destinations together in one place.
          </p>

          <div className="about-features">

            <div className="about-card">
              <h3>🇮🇳 Explore India</h3>
              <p>
                Discover destinations across different regions of India.
              </p>
            </div>

            <div className="about-card">
              <h3>🏛️ Heritage & Culture</h3>
              <p>
                Learn about India's rich history, traditions and heritage.
              </p>
            </div>

            <div className="about-card">
              <h3>🌄 Diverse Experiences</h3>
              <p>
                Explore mountains, beaches, wildlife, temples and more.
              </p>
            </div>

          </div>

        </div>

      </section>
    </>
  );
}

export default About;