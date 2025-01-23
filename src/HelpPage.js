import React, { useState } from 'react';
import { sendMessageToChatGPT } from './chatgptapi';
import './HelpPage.css';

const HelpPage = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    setLoading(true);
    const newMessage = { role: 'user', content: userMessage };
    setChatHistory([...chatHistory, newMessage]);

    try {
      const chatResponse = await sendMessageToChatGPT(userMessage);
      const assistantMessage = { role: 'assistant', content: chatResponse };
      setChatHistory((prevHistory) => [...prevHistory, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'Lo siento, hubo un problema al procesar tu mensaje. Intenta nuevamente.',
      };
      setChatHistory((prevHistory) => [...prevHistory, errorMessage]);
    } finally {
      setLoading(false);
      setUserMessage('');
    }
  };

  return (
    <div className="help-page-container">
      <h1>Preguntas Frecuentes</h1>
      <p>Hola, soy tu asistente virtual. Escribe tu pregunta y te responderé lo mejor que pueda.</p>

      <div className="chat-container">
      <div className="chat-history">
  {chatHistory.map((msg, index) => (
    <div key={index} className={`message ${msg.role}`}>
      {msg.role === 'assistant' && (
        <img 
          src="public\LogoTEAmigoS.png" 
          alt="Asistente" 
          className="assistant-avatar" 
        />
      )}
      <div className="bubble">{msg.content}</div>
    </div>
  ))}
</div>


        <div className="chat-input">
          <textarea
            placeholder="Escribe tu pregunta aquí..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          ></textarea>
          <button onClick={handleSendMessage} disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
