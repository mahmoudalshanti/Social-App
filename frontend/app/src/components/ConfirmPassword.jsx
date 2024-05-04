import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ConfirmPassword = ({
  // eslint-disable-next-line react/prop-types
  setPwdConfirm,
  // eslint-disable-next-line react/prop-types
  setFocusPwdConfirm,
  // eslint-disable-next-line react/prop-types
  focusPwdConfirm,
}) => {
  return (
    <div>
      <div>
        <FontAwesomeIcon icon={faShieldHalved} />

        <input
          autoComplete="off"
          onChange={(e) => setPwdConfirm(e.target.value)}
          type="password"
          id="pwdConfirm"
          placeholder="Confirm Password"
          onFocus={() => setFocusPwdConfirm(true)}
          onBlur={() => setFocusPwdConfirm(false)}
        />
      </div>
      {focusPwdConfirm && <p className="wrn">must be confirm with password</p>}
    </div>
  );
};

export default ConfirmPassword;
