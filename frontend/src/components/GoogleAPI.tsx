import { useEffect } from 'react'
const clientId = "730850247904-r7pt6498ko4jljr9j08mje74jtb40nuk.apps.googleusercontent.com"

declare global {
  interface Window {
    gapi: any; // Declare gapi as part of window object
  }
}

const GoogleAPIComponent = () => {
  useEffect(() => {
    const loadGapi = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error('GAPI script load error'));
        document.body.appendChild(script);
      });
    };

    const initializeGapi = () => {
      window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
          clientId: clientId,
          scope: 'profile email',
        }).then(() => {
          console.log('GAPI initialized');
        }).catch((error: any) => {
          console.error('Error initializing GAPI', error);
        });
      });
    };

    loadGapi()
      .then(() => {
        window.gapi && initializeGapi();
      })
      .catch((error) => {
        console.error('Failed to load GAPI script:', error);
      });
  }, []);
};

export default GoogleAPIComponent;