import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import Modal from "./Modal";

function Note({ note, getData }) {
  const [showModal, setShowModal] = useState(false);

  async function deleteNote() {
    try {
      const result = await fetch(`/todos/${note.id}`, {
        method: "DELETE",
      });
      if (result.status === 200) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="note-container">
      <div className="note">
        <h1 className="note-title">{note.title}</h1>
        <p className="note-info">{note.info}</p>
        <p className="note-date">{note.date}</p>
        <button onClick={deleteNote} aria-label="delete">
          <DeleteIcon />
        </button>
        <button onClick={() => setShowModal(true)} aria-label="edit">
          <EditIcon />
        </button>
        {showModal && (
          <Modal
            mode={"edit"}
            setShowModal={setShowModal}
            note={note}
            getData={getData}
          />
        )}
      </div>
    </section>
  );
}

export default Note;
