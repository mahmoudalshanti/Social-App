import useInputs from "../../../hooks/useInputs";
import useUpdateUser from "../../../hooks/useUpdateUser";
import { useUser } from "../../../context/UserProvider";
import Loading from "../../../components/Loading";
import Email from "../../../components/Email";

const ReEmail = () => {
  const [email, setEmail, focusEmail, setFocusEmail] = useInputs();
  const [error, isLoading, success, updateUser] = useUpdateUser();
  const { user } = useUser();

  const handelSubmit = async () => {
    const data = await updateUser({ id: user.id, email });
    console.log("DATA", data);
  };

  return (
    <main className="signup">
      <section>
        <h1>Update Email</h1>

        <article>
          {isLoading ? (
            <p>
              {" "}
              <Loading zoom={"0.3"} />
            </p>
          ) : success ? (
            <h1 className="success">Done</h1>
          ) : (
            error && <p className="msg">{error}</p>
          )}

          <Email
            setEmail={setEmail}
            setFocusEmail={setFocusEmail}
            focusEmail={focusEmail}
          />
          <button
            onClick={handelSubmit}
            className="sign-button"
            style={{ marginTop: "40px" }}>
            Done
          </button>
        </article>
      </section>
    </main>
  );
};

export default ReEmail;
