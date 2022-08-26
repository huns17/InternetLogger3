import React, { useRef } from "react";
import "./AddNote.css";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

type AddNoteKRProps = {
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

function AddNoteKr(props: AddNoteKRProps) {
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

    console.log(notes);
    props.AddNote(notes);
    props.setIsbuttonPressed(false);
    titleRef.current!.value = "";
    textRef.current!.value = "";
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="control">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          ref={titleRef}
          style={{ color: "white" }}
          placeholder="제목을 입력하시오."
        />
      </div>
      <div className="control">
        <label htmlFor="text-log">내용</label>
        <textarea
          rows={5}
          id="text-log"
          ref={textRef}
          style={{ color: "white" }}
          placeholder="남기고 싶은 말을 적으시오.."
        ></textarea>
      </div>
      <button>제출</button>
    </form>
  );
}

export default AddNoteKr;
