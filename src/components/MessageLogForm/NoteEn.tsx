import styled from "@emotion/styled";
import React from "react";

import "./Note.css";

const NoteEn = (props: {
  title:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  text:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  date:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return (
    <div>
      <StyledLi>
        <h3>{props.title}</h3>
        <p>{props.text}</p>
        <h6>{props.date}</h6>
      </StyledLi>
    </div>
  );
};

interface IStyledLi {
  margin?: number;
}

const StyledLi = styled.li<IStyledLi>`
  margin: ${(props) => (props.margin ? props.margin + "px" : "1rem;")};
  padding: 1rem;
  background-color: transparent;
  background-repeat: no-repeat;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  text-align: center;
  color: white;
`;

export default NoteEn;
