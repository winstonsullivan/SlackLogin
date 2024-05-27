import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Callback = () => {
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (code) {
      fetch('https://localhost:5001/slack/oauth_redirect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('OAuth Response:', data);
          
        })
        .catch(error => {
          console.error('Error during OAuth exchange:', error);
        });
    }
  }, [location]);

  return <div>OAuth Callback</div>;
};

export default Callback;
