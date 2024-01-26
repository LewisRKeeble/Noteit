import { useState } from "react";
import { useCookies } from "react-cookie";

export default function Modal({ mode, setShowModal, getData, note }) {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [error, setError] = useState(null);
  const editMode = mode === "edit" ? true : false;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const newDate = day + "/" + month + "/" + year;

  const [data, setData] = useState({
    user_email: editMode ? note.user_email : cookies.Email,
    title: editMode ? note.title : null,
    info: editMode ? note.info : null,
    date: newDate,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  async function postData() {
    try {
      const result = await fetch(`/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (result.detail) {
        setError(result.detail);
        return;
      }
      if (result.status === 200) {
        console.log("Submitted");
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function editData(e) {
    e.preventDefault();
    try {
      const result = await fetch(`/todos/${note.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (result.detail) {
        setError(result.detail);
        return;
      }
      if (result.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title">
          <h3>Lets {mode} a note!</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form>
          <input
            required
            maxLength={30}
            placeholder="Title of your note ..."
            name="title"
            value={data.name}
            onChange={handleChange}
          />
          <br />
          <input
            required
            placeholder="Content of your note ..."
            name="info"
            value={data.info}
            onChange={handleChange}
          />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? editData : postData}
          />
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}
