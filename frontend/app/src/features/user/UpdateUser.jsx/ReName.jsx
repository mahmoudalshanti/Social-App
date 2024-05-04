import Loading from "../../../components/Loading";
import { useUser } from "../../../context/UserProvider";
import useInputs from "../../../hooks/useInputs";
import useUpdateUser from "../../../hooks/useUpdateUser";
import FName from "../../../components/FName";
import LName from "../../../components/LName";

const ReName = () => {
  const [
    fName,
    setFName,
    focusFName,
    setFocusFName,
    lName,
    setLName,
    focusLName,
    setFocusLName,
  ] = useInputs();

  const [error, isLoading, success, updateUser] = useUpdateUser();
  const { user } = useUser();

  const handelSubmit = async () => {
    const data = await updateUser({ id: user.id, fName, lName });
    console.log("DATA", data);
  };
  return (
    <main className="signup">
      <section>
        <h1>Update Name</h1>
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

          <FName
            setFName={setFName}
            setFocusFName={setFocusFName}
            focusFName={focusFName}
          />
          <LName
            setLName={setLName}
            setFocusLName={setFocusLName}
            focusLName={focusLName}
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

export default ReName;
