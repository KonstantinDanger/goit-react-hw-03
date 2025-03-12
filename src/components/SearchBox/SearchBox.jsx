import { useId } from "react";

import css from "./SearchBox.module.css";

export default function SearchBox({ value, onChange }) {
  const findFieldId = useId();

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className={css.searchBox}>
      <label htmlFor={findFieldId}>Find contacts by name</label>
      <input value={value} id={findFieldId} onChange={handleChange}></input>
    </div>
  );
}
