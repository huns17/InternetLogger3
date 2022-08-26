import { string } from "@inovua/reactdatagrid-community/filterTypes";
import React, { useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import "./AddNote.css";

type AddNoteENProps = {
  //optional chianing
  AddNote: (notes: {
    title?: string;
    text?: string;
    date?: string;
    logger?: string;
  }) => void;

  logger: string;
  setIsbuttonPressed: (boolean: boolean) => void;
};

function AddNoteEn(props: AddNoteENProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const now = new Date();

  const reduxUserInfo = useAppSelector((state) => state.user);
  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    const notes = {
      title: titleRef.current?.value,
      text: textRef.current?.value,
      date: now.toLocaleString(),
      logger: reduxUserInfo,
    };

    props.AddNote(notes);
    props.setIsbuttonPressed(false);
    titleRef.current!.value = "";
    textRef.current!.value = "";
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          ref={titleRef}
          style={{ color: "white" }}
          placeholder="Log the title here..!"
        />
      </div>
      <div className="control">
        <label htmlFor="text-log">Text Log</label>
        <textarea
          rows={5}
          id="text-log"
          ref={textRef}
          style={{ color: "white" }}
          placeholder="Log the past event that you want to mention.."
        ></textarea>
      </div>
      <button>Submit</button>
    </form>
  );
}

export default AddNoteEn;
