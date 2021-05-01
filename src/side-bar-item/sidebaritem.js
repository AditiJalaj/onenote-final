import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../helpers";

const SideBarItem = ({
  _index,
  _note,
  classes,
  selectedNoteIndex,
  selectNote,
  deleteNote
}) => {
  
  //removed const here
  // selectNote = (n, i) => { called on click
  //   selectNote(n, i);
  // };

  //removed cosnt here
  const deleteNotecall = (note) => {
    if (window.confirm(`Are you sure you want to delete : ${note.title}`))
      deleteNote(note);
  };

  return (
    <div key={_index} onClick={() => selectNote(_note, _index)}>
      <ListItem
        className={classes.listItem}
        selected={selectedNoteIndex === _index}
        alignItems="flex-start"
      >
        <div className={classes.textSection}>
          <ListItemText
            primary={_note.title}
            secondary={
              _note.body
                ? removeHTMLTags(_note.body.substring(0, 30)) + "..."
                : null
            }
          ></ListItemText>
        </div>
        <DeleteIcon
          onClick={() => deleteNotecall(_note)}
          className={classes.deleteIcon}
        ></DeleteIcon>
      </ListItem>
    </div>
  );
};

export default withStyles(styles)(SideBarItem);
