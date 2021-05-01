import { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase";
import SideBar from "./side-bar/sidebar";
import Editor from "./editor/editor";
import { debounce } from "@material-ui/core";

const App = () => {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState(null);

  const selectNote = (note, index) => {
    setSelectedNote(note);
    setSelectedNoteIndex(index);
    console.log(`notes index set to ${selectedNoteIndex} & 
    notes set to ${selectedNote}`);
  };

  const noteUpdate = (id, noteObj) => {
    firebase.firestore()
    .collection("notes")
    .doc(id).update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  };

  const newNote = (title) => {
    const note = {
      title: title,
      body: ""
    };

    const newFromDB = firebase
    .firestore().collection("notes")
    .add({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    // const timestamp=firebase.firestore.FieldValue.serverTimestamp();
    // firebase.firestore.collection('notes').orderBy('timestamp')

    const newID = newFromDB.id;
    setNotes([...notes, note]);
    const newNoteIndex = notes.indexOf(notes.filter((n) => n.id === newID)[0]);
    setSelectedNote(notes[newNoteIndex]);
    setSelectedNoteIndex(newNoteIndex);
  };

  const deleteNote = async (note) => {
    const noteIndex = notes.indexOf(note);
    await setNotes(notes.filter((n) => n !== note));

    if (selectedNoteIndex === noteIndex) {
      setSelectedNoteIndex(null);
      setSelectedNote(null);
    } else {
      notes.length > 1
        ? selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1)
        : setSelectedNoteIndex(null);
      setSelectedNote(null);
    }

    firebase
    .firestore()
    .collection("notes")
    .doc(note.id)
    .delete();
  };

  let counter = 0;
  useEffect(() => {
    console.log(counter++);
    console.log("useEffect ran");
    firebase
      .firestore()
      .collection("notes")
      .orderBy('timestamp','desc')
      .onSnapshot((serverUpdate) => {
        const notes = serverUpdate.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        console.log(notes);
        setNotes(notes);
      });
  }, []);

  return (
    <div className="app-container">
      <SideBar
        selectedNoteIndex={selectedNoteIndex}
        notes={notes}
        deleteNote={deleteNote}
        selectNote={selectNote}
        newNote={newNote}
      />

      {selectedNote ? (
        <Editor
          selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          noteUpdate={noteUpdate}
        />
      ) : null}
    </div>
  );
};

export default App;
