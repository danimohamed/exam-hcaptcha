// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Route d'inscription avec vérification CAPTCHA
app.post('/api/signup', async (req, res) => {
  const { name, email, password, recaptchaToken } = req.body;
  é
  if (!recaptchaToken) {
    return res.status(400).json({ error: 'Token reCAPTCHA manquant.' });
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: '6LfPqBIrAAAAAP-vx4UMD7Prgd-aGE7oSo676SBT',
          response: recaptchaToken,
        },
      }
    );

    if (!response.data.success) {
      return res.status(400).json({ error: 'Échec de la vérification reCAPTCHA.' });
    }

    console.log(`Nouvel utilisateur inscrit : ${name} - ${email}`);
    res.json({ message: 'Inscription réussie par  mahdi ben ali..' });
  } catch (error) {
    console.error('Erreur lors de la vérification reCAPTCHA:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la vérification reCAPTCHA.' });
  }
});

app.listen(PORT, () => {
  console.log(`🟢 Serveur démarré sur http://localhost:${PORT}`);
});
