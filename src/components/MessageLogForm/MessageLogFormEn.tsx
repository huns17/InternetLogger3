import React, { useState, useEffect, useCallback } from "react";
import AddNoteEn from "./AddNoteEn";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { usersActions } from "../../store/userSlice";
import NoteListEn from "./NoteListEn";
const MessageLogFormEn = () => {
  const reduxUser: string = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [note, setNote] = useState<
    { id: string; title: any; text: any; date: string }[]
  >([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const fetchNoteHandlerEn = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://react-http-2887f-default-rtdb.firebaseio.com/notes.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data);
      const loadedNotes: { id: string; title: any; text: any; date: string }[] =
        [];
      for (const key in data) {
        loadedNotes.push({
          id: key,
          title: data[key].title,
          text: data[key].text,
          date: `${data[key].logger} logged message at ${data[key].date}....`,
        });
      }
      loadedNotes.reverse();
      console.log(loadedNotes);
      setNote(loadedNotes);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
    setIsLoading(false);
  }, []);

  async function addNoteHandlerEn(note: {
    id?: string;
    title?: string;
    text?: string;
    date?: string;
  }) {
    const response = await fetch(
      "https://react-http-2887f-default-rtdb.firebaseio.com/notes.json",
      {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "appication/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    alert(`Message is successfully added..!`);
    fetchNoteHandlerEn();
  }

  useEffect(() => {
    fetchNoteHandlerEn();
  }, [fetchNoteHandlerEn]);

  let content = <p style={{ color: "white" }}>Found no Notes.</p>;

  if (note.length > 0) {
    content = <NoteListEn note={note} />;
  }

  if (error) {
    content = <p style={{ color: "white" }}>{error}</p>;
  }

  if (isLoading) {
    content = <p style={{ color: "white" }}>Loading...</p>;
  }

  return (
    <div>
      <section>
        <h3 style={{ color: "white" }}>Welcome..! {reduxUser} </h3>
      </section>
      <section>
        <h3 style={{ color: "white" }}>Log Format</h3>
        <AddNoteEn AddNote={addNoteHandlerEn} logger={reduxUser}></AddNoteEn>
      </section>
      <section>
        <button onClick={fetchNoteHandlerEn}>Update Notes</button>
      </section>
      <section>
        <h3 style={{ color: "white" }}>Log</h3>
        {content}
      </section>
    </div>
  );
};

export default MessageLogFormEn;
