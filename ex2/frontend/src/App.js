// App.js
import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

const App = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [result, setResult] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setResult({ type: 'error', message: 'Veuillez valider le reCAPTCHA.' });
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/signup',
        { ...form, recaptchaToken },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      setResult({ type: 'success', message: `Inscription réussie par mahdi ben ali.` });
      setForm({ name: '', email: '', password: '' });
      setRecaptchaToken(null);
    } catch (error) {
      const msg = error.response?.data?.error || 'Erreur inconnue.';
      setResult({ type: 'error', message: msg });
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>Formulaire d'inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br />
        <ReCAPTCHA
          sitekey="6LfPqBIrAAAAAHqyHYqvHsahPHcz3FZDfBIgrTVX"
          onChange={handleRecaptchaChange}
        />
        <button type="submit">S'inscrire</button>
      </form>
      {result && (
        <p style={{ color: result.type === 'error' ? 'red' : 'green' }}>
          {result.message}
        </p>
      )}
    </div>
  );
};

export default App;
