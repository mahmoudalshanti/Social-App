import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
const Email = ({ setEmail, setFocusEmail, focusEmail }) => {
  const refEm = useRef();

  useEffect(() => {
    refEm.current.focus();
  }, []);

  return (
    <div>
      <div>
        <FontAwesomeIcon icon={faEnvelope} />
        <input
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          id="email"
          ref={refEm}
          placeholder="Mail"
          onFocus={() => setFocusEmail(true)}
          onBlur={() => setFocusEmail(false)}
        />
      </div>
      {focusEmail && <p className="wrn">first name must be character only</p>}
    </div>
  );
};

export default Email;
