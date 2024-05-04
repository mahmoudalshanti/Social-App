import Loading from "../../../components/Loading";
import Username from "../../../components/Username";
import { useUser } from "../../../context/UserProvider";
import useInputs from "../../../hooks/useInputs";
import useUpdateUser from "../../../hooks/useUpdateUser";

const ReUsername = () => {
  const [username, setUsername, focusUsername, setFocusUsername] = useInputs();
  const [error, isLoading, success, updateUser] = useUpdateUser();
  const { user } = useUser();

  const handelSubmit = async () => {
    const data = await updateUser({ id: user.id, username });
    console.log("DATA", data);
  };

  console.log(success);
  return (
    <main className="signup">
      <section>
        <h1>Update Username</h1>

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

          <Username
            setUsername={setUsername}
            setFocusUsername={setFocusUsername}
            focusUsername={focusUsername}
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

export default ReUsername;
