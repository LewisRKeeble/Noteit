import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import Modal from "./Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function Header({ getData }) {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [showModal, setShowModal] = useState(false);

  function signOut() {
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  }

  return (
    <header>
      <div className="logo">
        <h1>NoteIt</h1>
      </div>
      <div className="create">
        <Button
          variant="contained"
          color="success"
          onClick={() => setShowModal(true)}
        >
          Create New
        </Button>
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          color="secondary"
          onClick={signOut}
        >
          Sign Out
        </Button>
      </div>
      {showModal && (
        <Modal mode={"create"} setShowModal={setShowModal} getData={getData} />
      )}
    </header>
  );
}
