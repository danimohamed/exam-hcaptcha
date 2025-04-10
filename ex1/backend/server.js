// server.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import csurf from 'csurf';

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());

// Configure CSRF protection middleware
const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

// Route to provide CSRF token
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Route de modification de mot de passe (à sécuriser)
app.post('/api/change-password', (req, res) => {
  const { oldPassword, newPassword } = req.body;

  // Simulation d'une vérification et mise à jour de mot de passe
  if (oldPassword === '123') {
    console.log(`Mot de passe changé en : ${newPassword}`);
    return res.json({ message: 'Mot de passe mis à jour avec succès. - Dani Moahmed' });
  } else {
    return res.status(400).json({ error: 'Ancien mot de passe incorrect. - Dani Moahmed' });
  }
});

app.listen(PORT, () => {
  console.log(`🟢 Serveur en écoute sur http://localhost:${PORT}`);
});
