import "../App.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StateCard from "../components/StateCard";

import tamilNadu from "../assets/images/tamilnadu.jpg";
import assam from "../assets/images/assam.png";
import jammuKashmir from "../assets/images/jammuKashmir.png";
import rajasthan from "../assets/images/rajasthan.png";
import punjab from "../assets/images/punjab.jpg";
import odisha from "../assets/images/odisha.jpg";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <section className="states">
        <h2>Popular States</h2>

        <div className="state-container">
          <StateCard
            id="tamil-nadu"
            image={tamilNadu}
            name="Tamil Nadu"
            description="Explore ancient temples, historic sites, beaches, hill stations and the rich cultural heritage of Tamil Nadu."
          />

          <StateCard
            id="assam"
            image={assam}
            name="Assam"
            description="Discover lush tea gardens, the Brahmaputra River, wildlife and the natural beauty of Northeast India."
          />

            <StateCard
              id="jammu-kashmir"
              image={jammuKashmir}
              name="Jammu & Kashmir"
              description="Experience breathtaking Himalayan landscapes, scenic valleys, lakes and beautiful mountain destinations."
            />

            <StateCard
              image={rajasthan}
              name="Rajasthan"
              description="Discover magnificent forts, grand palaces, historic cities, desert landscapes and the vibrant culture of Rajasthan."
            />
             <StateCard
            image={punjab}
            name="Punjab"
            description="Experience vibrant culture, historic sites, delicious cuisine and the warm hospitality of Punjab."
          />

          <StateCard
            image={odisha}
            name="Odisha"
            description="Explore ancient temples, beautiful beaches, traditional art and the rich cultural heritage of Odisha."
          />
        </div>
      </section>
    </>
  );
}

export default Home;