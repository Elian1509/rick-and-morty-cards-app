
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
const [characters, setcharacters] = useState([]); //guarda los personajes
const [loading, setLoading] = useState(true); //estado para indicar si los datos están cargando
const [error, setError] = useState(null); //estado para manejar errores

// useEffect se ejecuta después de que el componente se renderiza por primera vez
useEffect(() => {
  const fetchCharacters = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      if (!response.ok) { // verifica si la respuesta es correcta
        throw new Error(`Error HTTP: ${response.status}`); // lanza un error si la respuesta no es correcta
      }
      const data = await response.json();
      setcharacters(data.results); //actualiza el estado con los personajes obtenidos
    } catch (error) {
      setError(error.message); //actualiza el estado de error si ocurre un problema
    } finally {
      setLoading(false); //cambia el estado de loading a false una vez que se completa la solicitud
    }
  };
  
  fetchCharacters();
} , []); //el segundo argumento vacío significa que este efecto solo se ejecutará una vez al montar el componente

  if (loading) {
    return <div>Cargando personajes...</div>; //muestra un mensaje de carga mientras se obtienen los datos
  }

  if (error) {
    return <div className='App' style={{ color: 'red' }}>Error al cargar: {error}</div>; //muestra un mensaje de error si ocurre un problema
  }
return (
  <div className='App'>
    <header className='App-header'>
      <h1>Personajes de Rick y Morty</h1>
      </header>
    <div className='characters-grid'>
      {characters.map((character) => (
        <div key={character.id} className='character-card'>
          <img src={character.image} alt={character.name} />
          <h2>{character.name}</h2>
          <p>Especie: {character.species}</p>
          <p>Estado: {character.status}</p>
        </div>
      ))}
    </div>
  </div>
);
}

export default App;
