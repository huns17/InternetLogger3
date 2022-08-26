import React from "react";
import Note from "./NoteEn";
import "./NoteList.css";

const NoteListEn = (props: { note: any[] }) => {
  return (
    <ul className="note-list">
      {props.note.map((note) => (
        <Note
          key={note.id}
          title={note.title}
          date={note.date}
          text={note.text}
        />
      ))}
    </ul>
  );
};

export default NoteListEn;
