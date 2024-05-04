import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// eslint-disable-next-line react/prop-types
const Username = ({
  // eslint-disable-next-line react/prop-types
  setUsername,
  // eslint-disable-next-line react/prop-types
  setFocusUsername,
  // eslint-disable-next-line react/prop-types
  focusUsername,
  // eslint-disable-next-line react/prop-types
  disable,
}) => {
  return (
    <div>
      <div>
        <FontAwesomeIcon icon={faUser} />
        <input
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
          type="text"
          id="username"
          placeholder="Username"
          onFocus={() => {
            disable ? null : setFocusUsername(true);
            return;
          }}
          onBlur={() => {
            disable ? null : setFocusUsername(false);
            return;
          }}
        />
      </div>
      {focusUsername && (
        <p className="wrn">
          username must be character and can be include number
        </p>
      )}
    </div>
  );
};

export default Username;
