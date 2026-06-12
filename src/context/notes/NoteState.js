import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
    const notesInitial=[
        {
            "_id": "6a2a9f48e48d183ce7c90188",
            "user": "6a2a9ef4e48d183ce7c90187",
            "title": "My First Note",
            "description": "This is a note created by my new user",
            "tag": "personal",
            "date": "2026-06-11T11:43:04.702Z",
            "__v": 0
        },
        {
            "_id": "6a2aa29ceb9f82616f7aa844",
            "user": "6a2a9ef4e48d183ce7c90187",
            "title": "My First Note",
            "description": "This is a note created by my new user",
            "tag": "personal",
            "date": "2026-06-11T11:57:16.394Z",
            "__v": 0
        },
        {
            "_id": "6a2aa2afeb9f82616f7aa845",
            "user": "6a2a9ef4e48d183ce7c90187",
            "title": "My second Note",
            "description": "This is a note created by my new user",
            "tag": "personal",
            "date": "2026-06-11T11:57:35.204Z",
            "__v": 0
        },
        {
            "_id": "6a2a9f48e48d183ce7c90188",
            "user": "6a2a9ef4e48d183ce7c90187",
            "title": "My First Note",
            "description": "This is a note created by my new user",
            "tag": "personal",
            "date": "2026-06-11T11:43:04.702Z",
            "__v": 0
        },
        {
            "_id": "6a2aa29ceb9f82616f7aa844",
            "user": "6a2a9ef4e48d183ce7c90187",
            "title": "My First Note",
            "description": "This is a note created by my new user",
            "tag": "personal",
            "date": "2026-06-11T11:57:16.394Z",
            "__v": 0
        },
        {
            "_id": "6a2aa2afeb9f82616f7aa845",
            "user": "6a2a9ef4e48d183ce7c90187",
            "title": "My second Note",
            "description": "This is a note created by my new user",
            "tag": "personal",
            "date": "2026-06-11T11:57:35.204Z",
            "__v": 0
        }
        ]
    const [notes,setNotes]=useState(notesInitial)
    const s1 = {
        name: "meet",
        class: "5b"
    };
    const [state, setState] = useState(s1);
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
};
export default NoteState;