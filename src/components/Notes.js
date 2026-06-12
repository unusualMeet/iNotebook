import noteContext from '../context/notes/noteContext'
import React, { useContext } from "react";
import Noteitem from './Noteitems'
const Notes = () => {
    const context=useContext(noteContext);
    const {notes,setNotes}= context;
  return (
    <div className="row my-3">
      <h2>your notes </h2>
      {notes.map((note) => {
        return <Noteitem note={note}/>;
      })}
    </div>
  );
};

export default Notes;
