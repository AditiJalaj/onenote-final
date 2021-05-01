import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import {useState} from 'react'
import debounce from '../helpers';


const Editor = ({classes,selectedNote,noteUpdate}) => {
    const [text,setText]=useState('')
    const [title,setTitle]=useState('')
    const [id,setId]=useState('')

  
useEffect(()=>{
   setText(selectedNote.body)
   setTitle(selectedNote.title)
   setId(selectedNote.id)
  },[]) /////////////////////////////////////////////////


  useEffect(()=>{
    if(selectedNote.id!==id)
    {
      setText(selectedNote.body)
      setTitle(selectedNote.title)
      setId(selectedNote.id)
    }
  })


   const  updateBody = async (val) => {
     await setText(val)
     update();
    };

   const updateTitle = async (txt) => {
      await setTitle(txt);
      update();
    }

   const update = debounce(() => {
     noteUpdate(id, {
        title: title,
        body: text
      })
    }, 1500);

    
    return ( 
      <div className={classes.editorContainer}>
      <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
      <input
        className={classes.titleInput}
        placeholder='Note title...'
        value={title ? title : ''}
        onChange={(e) => updateTitle(e.target.value)}>
      </input>
      <ReactQuill 
        value={text} 
        onChange={updateBody}>
      </ReactQuill>
    </div>
     );
}
 
export default withStyles(styles)(Editor);