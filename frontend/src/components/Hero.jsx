import heroImage from "../assets/Hero.jpg";
function Hero() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${heroImage})`,
      }}
    >
      <div className="hero-content">
        <h1>Explore India, One State at a Time 🇮🇳</h1>

        <p>
          Discover breathtaking destinations, historical monuments,
          temples, beaches, hill stations and cultural heritage across India.
        </p>

        <button>Explore States</button>
      </div>
    </section>
  );
}

export default Hero;