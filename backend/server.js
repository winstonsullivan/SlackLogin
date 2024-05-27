import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/slack/oauth_redirect', async (req, res) => {
  const { code } = req.body;

  console.log('Received Code:', code);
  console.log('Client ID:', process.env.VITE_SLACK_CLIENT_ID);
  console.log('Client Secret:', process.env.VITE_SLACK_CLIENT_SECRET);
  console.log('Redirect URI:', process.env.VITE_REDIRECT_URL);

  try {
    const response = await fetch('https://slack.com/api/oauth.v2.access', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.VITE_SLACK_CLIENT_ID,
        client_secret: process.env.VITE_SLACK_CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.VITE_REDIRECT_URL,
      }),
    });

    const data = await response.json();
    console.log('OAuth Response:', data);
    res.json(data);
  } catch (error) {
    console.error('Error during OAuth exchange:', error);
    res.status(500).json({ error: 'OAuth exchange failed' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
