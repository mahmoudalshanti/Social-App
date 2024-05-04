/* eslint-disable react/prop-types */
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LName = ({ setLName, setFocusLName, focusLName }) => {
  return (
    <div>
      <div>
        <FontAwesomeIcon icon={faCheckDouble} />
        <input
          autoComplete="off"
          onChange={(e) => setLName(e.target.value)}
          type="text"
          id="lName"
          placeholder="Last Name"
          onFocus={() => setFocusLName(true)}
          onBlur={() => setFocusLName(false)}
        />
      </div>
      {focusLName && <p className="wrn">last name must be character only</p>}
    </div>
  );
};

export default LName;
