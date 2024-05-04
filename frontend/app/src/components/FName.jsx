import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// eslint-disable-next-line react/prop-types
const FName = ({ setFName, setFocusFName, focusFName }) => {
  return (
    <div>
      <div>
        <FontAwesomeIcon icon={faCheck} />
        <input
          autoComplete="off"
          onChange={(e) => setFName(e.target.value)}
          type="text"
          id="fName"
          placeholder="First Name"
          onFocus={() => setFocusFName(true)}
          onBlur={() => setFocusFName(false)}
        />
      </div>
      {focusFName && <p className="wrn">first name must be character only</p>}
    </div>
  );
};

export default FName;
