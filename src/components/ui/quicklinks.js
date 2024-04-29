import { soccerClubs } from "../../leauges/quickclubs";

function QuickLinks() {
    return (
      <>
        <div class="card" style={{ width: "18rem" }}>
          <ul class="list-group list-group-flush">
            {soccerClubs.map((team) => (
              <li class="list-group-item">
                <img src={team.logo} style={{ width: "20px" }} alt=""></img> {team.name}
              </li>
            ))}
          </ul>
        </div>
        
      </>
    );
  }

  export default QuickLinks;