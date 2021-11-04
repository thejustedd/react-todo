import {useState} from "react";

const Form = ({onAdd}) => {
  const [value, setValue] = useState('');

  const submitHandler = e => {
    e.preventDefault();

    onAdd(value);

    setValue('');
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="input-group">
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Введите название заметки"
        />
      </div>
    </form>
  );
};

export default Form;