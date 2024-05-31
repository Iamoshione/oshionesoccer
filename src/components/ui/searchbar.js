import UseCustomState from "../../hooks/usecustomstate";
import { AsyncPaginate } from "react-select-async-paginate";
import "../../styles/searchbar.css";
import { Link } from "react-router-dom";
import { teamsapi } from "../../services/api";
import { validation } from "../../utils/validation";

function Searchbar() {
  const [value, setValue] = UseCustomState("");
  const handleOnChange = (searchValue) => {
    setValue(searchValue);
  };
  const loadOptions = (inputValue) => {
    if (inputValue.trim() !== "") {
      if (validation.test(inputValue)) {
        return fetch(
          `
              ${teamsapi}/${inputValue}?key=c31aeae5ee5a4d48aecbd09e94ebc7fc
              `
        )
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            return {
              options: response.map((club) => {
                return {
                  value: `${club.key} ${club.TeamId}`,
                  label: (
                    <Link
                      to={`/soccer/team/${club.TeamId}/${inputValue}/${club.Name}`}
                    >
                      <div>
                        <img
                          src={club.WikipediaLogoUrl}
                          alt={club.Name}
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "5px",
                          }}
                        />
                        {club.Name}
                      </div>
                    </Link>
                  ),
                };
              }),
            };
          })
          .catch((err) => console.log(err));
      } else {
        return {
          options: [],
        };
      }
    } else {
      return {
        options: [],
      };
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #121212",
      borderRadius: "50px",
      backgroundColor: "white",
      width: "8cm",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "gray", // Set placeholder color to white
      fontWeight: "lighter",
    }),
  };
  return (
    <>
      <div className="search-container">
        <div className="search-bar">
          <AsyncPaginate
            placeholder="Search for leauge e.g epl"
            debounceTimeout={600}
            onChange={handleOnChange}
            value={value}
            loadOptions={loadOptions}
            styles={customStyles}
          />
        </div>
      </div>
    </>
  );
}
export default Searchbar;