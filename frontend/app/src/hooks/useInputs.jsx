import { useState } from "react";

const useInputs = () => {
  const [email, setEmail] = useState("");
  const [focusEmail, setFocusEmail] = useState(false);

  const [username, setUsername] = useState("");
  const [focusUsername, setFocusUsername] = useState(false);

  const [pwd, setPwd] = useState("");
  const [focusPwd, setFocusPwd] = useState(false);

  const [pwdConfirm, setPwdConfirm] = useState("");
  const [focusPwdConfirm, setFocusPwdConfirm] = useState(false);

  const [fName, setFName] = useState("");
  const [focusFName, setFocusFName] = useState(false);

  const [lName, setLName] = useState("");
  const [focusLName, setFocusLName] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  return [
    email,
    setEmail,
    focusEmail,
    setFocusEmail,
    username,
    setUsername,
    focusUsername,
    setFocusUsername,
    pwd,
    setPwd,
    focusPwd,
    setFocusPwd,
    pwdConfirm,
    setPwdConfirm,
    focusPwdConfirm,
    setFocusPwdConfirm,
    fName,
    setFName,
    focusFName,
    setFocusFName,
    lName,
    setLName,
    focusLName,
    setFocusLName,
    selectedFile,
    setSelectedFile,
  ];
};

export default useInputs;
