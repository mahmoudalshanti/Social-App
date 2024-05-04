import { GoogleLogin } from "@react-oauth/google";
import { useRegister } from "../../context/RegisterProvider";
import { useNavigate } from "react-router-dom";
const SignUpGoogle = () => {
  const { setRegister } = useRegister();
  const navigate = useNavigate();

  const onSuccess = (credentialResponse) => {
    setRegister({ accessToken: credentialResponse.credential });
    navigate("/completeinfo");
  };

  const onError = () => {};
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onError}
      locale="en"
      shape="circle"
      logo_alignment="center"
      text="signup_with"
      width={"350px"}
    />
  );
};

export default SignUpGoogle;
