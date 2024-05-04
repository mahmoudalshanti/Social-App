import Button from "../../components/Button";
import Logo from "../../components/Logo";
import SignUpGoogle from "./SignUpGoogle";
import { GoogleOAuthProvider } from "@react-oauth/google";
const MainAuth = () => {
  return (
    <main className="Main-auth">
      <aside className="logo">
        <Logo classType={"auth-logo"} />
      </aside>
      <aside className="buttons">
        <p>Enjoy with tag your friends.</p>
        <div className="btns">
          <div className="google-btns">
            <GoogleOAuthProvider clientId="999421405399-kbec2jp2k32klccfs1to7guil39ao1m1.apps.googleusercontent.com">
              <SignUpGoogle />
            </GoogleOAuthProvider>
          </div>
          <Button
            to="/signup"
            classType="auth-button"
            word="Create tag account"
          />
          <p>Already Have Account?</p>
          <Button to="/signin" classType="sign-button" word="Sign in" />
        </div>
      </aside>
    </main>
  );
};

export default MainAuth;
