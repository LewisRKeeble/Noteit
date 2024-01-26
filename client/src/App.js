import { useEffect, useState } from "react";
import Note from "./components/Note";
import "./App.css";
import Header from "./components/Header";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";
import IntroHeader from "./components/IntroHeader";

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;

  const [notes, setNotes] = useState(null);
  const authToken = cookies.AuthToken;

  const getData = async () => {
    try {
      const response = await fetch(`/todos/${userEmail}`);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  const sortedNotes = notes?.sort(
    (b, a) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div>
      {!authToken && (
        <>
          {" "}
          <IntroHeader />
          <Auth />
        </>
      )}
      {authToken && (
        <>
          <Header getData={getData} />
          <p className="welcome">Welcome back {userEmail}</p>
          {sortedNotes?.map((note) => (
            <Note note={note} key={note.id} getData={getData} />
          ))}
        </>
      )}
    </div>
  );
}
