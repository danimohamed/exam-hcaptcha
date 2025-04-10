// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [form, setForm] = useState({ oldPassword: '', newPassword: '' });
  const [csrfToken, setCsrfToken] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Fetch CSRF token from the backend
    axios.get('http://localhost:5000/api/csrf-token', { withCredentials: true })
      .then(res => {
        setCsrfToken(res.data.csrfToken);
      })
      .catch(() => {
        setResult({ type: 'error', message: 'Erreur lors de la récupération du token CSRF. -Dani Moahmed' });
      });S
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/change-password',
        form,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken
          },
          withCredentials: true
        }
      );

      setResult({ type: 'success', message: response.data.message });
      setForm({ oldPassword: '', newPassword: '' });
    } catch (error) {
      const msg = error.response?.data?.error || 'Erreur lors de la requête. Dani Moahmed';
      setResult({ type: 'error', message: msg });
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>Changer le mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="oldPassword"
          placeholder="Ancien mot de passe"
          value={form.oldPassword}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="newPassword"
          placeholder="Nouveau mot de passe"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Mettre à jour</button>
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
