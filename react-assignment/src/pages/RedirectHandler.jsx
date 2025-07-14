import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOriginalUrl, logClick } from '../utils/urlStore';
import { recordLog } from '../middleware/logger';
import { Typography, Box } from '@mui/material';

function RedirectHandler() {
  const { shortcode } = useParams();
  const [message, setMessage] = useState('Redirecting...');

  useEffect(() => {
    const result = getOriginalUrl(shortcode);

    if (!result) {
      setMessage('Invalid or unknown shortcode.');
      recordLog('Invalid shortcode access', shortcode);
      return;
    }

    if (result === 'expired') {
      setMessage('This link has expired.');
      recordLog('Expired link access', shortcode);
      return;
    }

    // Log click
    logClick(shortcode, 'direct', 'local');
    recordLog('Redirecting to', result);

    // Perform redirect
    window.location.href = result;
  }, [shortcode]);

  return (
    <Box p={4}>
      <Typography variant="h6">{message}</Typography>
    </Box>
  );
}

export default RedirectHandler;
