import "./styles.css";
import { useReducer, useState } from "react";
const reducer = (state, action) => {
  if (action.type === "add") {
    state = [...state, action.value];
    return state;
  } else if (action.type === "delete") {
    return state.filter((item, index) => {
      return index !== action.value;
    });
  } else if (action.type === "edit") {
    state[action.value[1]] = action.value[0];
    state = [...state];
    return state;
  }
  return state;
};
export default function App() {
  const [item, setItem] = useState("");
  const [edit, setEdit] = useState("");
  const [list, dispatch] = useReducer(reducer, []);
  return (
    <div className="App">
      <input type="text" onChange={(e) => setItem(e.target.value)} />
      <button onClick={() => dispatch({ type: "add", value: item })}>
        Add
      </button>
      {list.map((item, index) => {
        return (
          <div key={`${item}-${index}`}>
            {item}{" "}
            <input type="text" onChange={(e) => setEdit(e.target.value)} />
            <button
              onClick={() =>
                dispatch({ type: "edit", value: { 0: edit, 1: index } })
              }
            >
              Edit
            </button>
            <button onClick={() => dispatch({ type: "delete", value: index })}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
