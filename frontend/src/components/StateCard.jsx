import "../styles/StateCard.css";
import { Link } from "react-router-dom";

function StateCard(props) {
  return (
    <div className="state-card">

      <img src={props.image} alt={props.name} />

      <div className="state-card-content">

        <h3>{props.name}</h3>

        <p>{props.description}</p>

        <Link to={`/states/${props.name.toLowerCase().replace(/\s+/g, "-")}`}>
          <button>Explore</button>
        </Link>

      </div>

    </div>
  );
}

export default StateCard;