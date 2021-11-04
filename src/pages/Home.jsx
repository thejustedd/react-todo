import Form from "../components/Form";
import Notes from "../components/Notes";
import {useContext, useEffect} from "react";
import {FirebaseContext} from "../context/firebase/firebaseContext";
import Loader from "../components/Loader";
import {AlertContext} from "../context/alert/alertContext";

export const Home = () => {
  const {loading, notes, fetchNotes, removeNote, addNote} = useContext(FirebaseContext);
  const {show} = useContext(AlertContext);

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, []);

  const removeHandler = (id) => {
    removeNote(id);
    show('Заметка была удалена', 'danger');
  }

  const addHandler = (value) => {
    const text = value.trim();

    if (text) {
      addNote(text).then(() => {
        show('Заметка была создана', 'success');
      }).catch(() => {
        show('Что-то пошло не так', 'danger');
      });
    } else {
      show('Введите название заметки', 'warning');
    }
  }

  return (
    <>
      <Form onAdd={addHandler}/>
      <hr/>
      {loading
        ? <Loader/>
        : <Notes notes={notes} onRemove={removeHandler}/>
      }
    </>
  )
}
