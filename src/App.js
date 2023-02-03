import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

const port = "1234"

function App() {
  const [users, setUsers] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState("default");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/").then((response) =>
      response.json()
    ).then(json => setUsers(json));
  }, []);

  const onSubmit = (submitEvent) => {
    submitEvent.preventDefault()
    console.log(selectedUserName)
    console.log(selectedInfo)
    const user = users.filter(user => user.name === selectedUserName)[0]
    console.log(user)
    window.open(`http://localhost:${port}/search?user=${user.id}&info=${selectedInfo}`)
  }

  if (users === null) {
    return <div className="App">Cargando...</div>;
  }
  return (
    <div className="App">
      <form className="App-form" onSubmit={onSubmit}>
        <label htmlFor="users">
          Nombre del usuario
          <input placeholder="Nombre" id="users" list="usersList" onChange={(e) => setSelectedUserName(e.target.value)} />
          <datalist id="usersList">
            {users.map((user) => (
              <option key={user.id} value={user.name} />
            ))}
          </datalist>
        </label>
        <label htmlFor="info">
          Informacion del usuario
          <select id="info" value={selectedInfo} onChange={(e) => setSelectedInfo(e.target.value)}>
            <option disabled value="default">Informacion del usuario</option>
            <option value="albums">Albums</option>
            <option value="todos">Lista de tareas</option>
            <option value="post">Publicaciones</option>
          </select>
        </label>
        <button type="submit" disabled={selectedUserName === null || selectedInfo === "default"} >Buscar</button>
      </form>
    </div>
  );
}

export default App;
