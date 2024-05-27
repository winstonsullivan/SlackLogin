import React from 'react';

function App() {
  const handleSignIn = () => {
    const clientId = import.meta.env.VITE_SLACK_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URL;
    const scope = 'identity.basic';

    console.log('Client ID:', clientId);
    console.log('Redirect URI:', redirectUri);

    const slackOAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;

    window.location.href = slackOAuthUrl;
  };

  return (
    <div>
      <h1>Slack Login App</h1>
      <button onClick={handleSignIn}>Sign in with Slack</button>
    </div>
  );
}

export default App;
