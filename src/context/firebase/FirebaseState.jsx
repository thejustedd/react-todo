import {FirebaseContext} from "./firebaseContext";
import {useReducer} from "react";
import {firebaseReducer} from "./firebaseReducer";
import {ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER} from "../types";
import axios from "axios";

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({children}) => {
  const initialState = {
    notes: [],
    loading: false
  };

  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const showLoader = () => dispatch({type: SHOW_LOADER});

  const fetchNotes = async () => {
    showLoader();
    const res = await axios.get(`${url}/notes.json`);

    const payload = Object.keys(res.data).map(key => ({id: key, ...res.data[key]}));

    dispatch({type: FETCH_NOTES, payload});
  };

  const addNote = async (title) => {
    const note = {
      date: new Date().toJSON(),
      title
    };

    try {
      const res = await axios.post(`${url}/notes.json`, note);
      const payload = {id: res.data.name, ...note};

      dispatch({type: ADD_NOTE, payload});
    } catch (e) {
      throw  new Error(e.message);
    }
  };

  const removeNote = async id => {
    await axios.delete(`${url}/notes/${id}.json`);

    dispatch({type: REMOVE_NOTE, payload: id});
  };

  return (
    <FirebaseContext.Provider value={{
      showLoader, addNote, removeNote, fetchNotes,
      loading: state.loading,
      notes: state.notes
    }}>
      {children}
    </FirebaseContext.Provider>
  );
};
