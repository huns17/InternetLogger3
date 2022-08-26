import React, { useState, useEffect, useCallback } from "react";
import AddNoteKr from "./AddNoteKr";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { usersActions } from "../../store/userSlice";
import NoteListKr from "./NoteListKr";
const MessageLogFormKr = () => {
  const reduxUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [note, setNote] = useState<
    { id: string; title: any; text: any; date: string }[]
  >([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const fetchNoteHandlerKr = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://react-http-2887f-default-rtdb.firebaseio.com/notes2.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const loadedNotes: { id: string; title: any; text: any; date: string }[] =
        [];
      for (const key in data) {
        loadedNotes.push({
          id: key,
          title: data[key].title,
          text: data[key].text,
          date: `${data[key].logger}님이 ${data[key].date}에 남기셨습니다..`,
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

  async function addNoteHandlerKr(note: {
    id?: string;
    title?: any;
    text?: any;
    date?: string;
  }) {
    const response = await fetch(
      "https://react-http-2887f-default-rtdb.firebaseio.com/notes2.json",
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
    alert(`메세지가 성공적으로 추가되었습니다.`);
    fetchNoteHandlerKr();
  }

  useEffect(() => {
    fetchNoteHandlerKr();
  }, [fetchNoteHandlerKr]);

  let content = <p style={{ color: "white" }}>Found no Notes.</p>;

  if (note.length > 0) {
    content = <NoteListKr note={note} />;
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
        <h3 style={{ color: "white" }}>반갑습니다.. {reduxUser}님.... </h3>
        <button onClick={fetchNoteHandlerKr}>메세지 업데이트</button>
      </section>
      <section>
        <h3 style={{ color: "white" }}>메세지 양식</h3>
        <AddNoteKr AddNote={addNoteHandlerKr} logger={reduxUser}></AddNoteKr>
      </section>
      <section>
        <h3 style={{ color: "white" }}>메세지 로그</h3>
        {content}
      </section>
    </div>
  );
};

export default MessageLogFormKr;
