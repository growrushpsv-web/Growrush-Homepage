// pages/api/checkstatus.js

import http from 'http';

export default async function handler(req, res) {
  // IP DAN PORT SERVER GROWRUSHPS
  const serverIP = '15.235.227.241'; 
  const serverPort = 17455; 

  const options = {
    host: serverIP,
    port: serverPort,
    timeout: 3000 // 3 seconds timeout
  };

  const request = http.request(options, (response) => {
    res.status(200).json({
      success: true,
      server: { status: 'online' }
    });
    request.destroy(); 
  });

  request.on('error', (err) => {
    res.status(200).json({
      success: false,
      server: { status: 'offline', message: err.code }
    });
  });

  request.on('timeout', () => {
    request.destroy();
    res.status(200).json({
      success: false,
      server: { status: 'offline', message: 'Timeout' }
    });
  });

  request.end();
}
