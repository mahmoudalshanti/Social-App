import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

// eslint-disable-next-line react/prop-types
const Password = ({ setPwd, setFocusPwd, focusPwd, disable }) => {
  const refPwd = useRef();

  const [hide, setHide] = useState(true);

  if (hide) {
    if (refPwd.current?.type !== undefined) refPwd.current.type = "password";
  } else {
    if (refPwd?.current?.type !== undefined) refPwd.current.type = "text";
  }

  return (
    <div>
      <div>
        {" "}
        <FontAwesomeIcon icon={faLock} />
        <input
          autoComplete="off"
          onChange={(e) => setPwd(e.target.value)}
          type="text"
          id="pwd"
          ref={refPwd}
          placeholder="Password"
          onFocus={() => {
            disable ? null : setFocusPwd(true);
            return;
          }}
          onBlur={() => {
            disable ? null : setFocusPwd(false);
            return;
          }}
        />
        <button className="hide" onClick={() => setHide((prev) => !prev)}>
          {hide ? "Show" : "Hide"}
        </button>
      </div>
      {focusPwd && (
        <p className="wrn">
          password large than 7 and include number and lowercase & uppercase
          character
        </p>
      )}
    </div>
  );
};

export default Password;
