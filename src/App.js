import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  // Importa las rutas
import Chatbot from './chatbot';  // El chatbot original
import HelpPage from './HelpPage'; // Importa el componente HelpPage

function App() {
  const [showChatbot, setShowChatbot] = useState(false); // Controla la visibilidad del Chatbot
  const [showEmotions, setShowEmotions] = useState(false); // Controla la visibilidad de las emociones

  // Manejador de clic en el botón "Emociones"
  const handleEmotionsClick = () => {
    console.log("Botón Emociones presionado");
    setShowEmotions(!showEmotions); // Alterna la visibilidad de las emociones
    setShowChatbot(true); // Muestra el chatbot cuando se haga clic en "Emociones"
    console.log("Estado showEmotions:", !showEmotions);
  };

  const handleQuestionsClick = () => {
    // Aquí puedes agregar la lógica para las preguntas, si es necesario
    setShowChatbot(true); // Asegúrate de que el chatbot se muestre cuando se haga clic en Preguntas
  };

  return (
    <div className="app-container">
      <h1 className="title">🌟 Bienvenido a mi CasaAzul 🌟</h1>
      <p className="description">Hola! Soy tu amigo. Vamos a aprender sobre emociones y resolver algunas preguntas.</p>

      <div className="button-container">
        <button className="button" onClick={handleEmotionsClick}>
          😊 Emociones
        </button>
        <button className="button" onClick={handleQuestionsClick}>
          ❓ Preguntas
        </button>
      </div>

      {/* Renderiza el componente Chatbot cuando se selecciona */}
      {showChatbot && (
        <div className="chatbot-section">
          <Chatbot showEmotions={showEmotions} />
        </div>
      )}

      <footer className="footer">
        <p className="footer-text">¡Estoy aquí para ayudarte!</p>
      </footer>
    </div>
  );
}

export default App;
