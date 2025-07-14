// src/pages/UrlShortener.jsx

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Grid } from '@mui/material';
import { saveShortLink, getAllLinks } from '../utils/urlStore';
import { recordLog } from '../middleware/logger';

function generateCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function UrlShortener() {
  const [forms, setForms] = useState([
    { url: '', code: '', time: '', error: '' }
  ]);

  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newForms = [...forms];
    newForms[index][field] = value;
    setForms(newForms);
  };

  const addForm = () => {
    if (forms.length < 5) {
      setForms([...forms, { url: '', code: '', time: '', error: '' }]);
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = () => {
    const allLinks = getAllLinks();
    let validForms = [];

    const updatedForms = forms.map((form) => {
      if (!isValidUrl(form.url)) {
        return { ...form, error: 'Enter a valid URL' };
      }
      if (form.time && isNaN(form.time)) {
        return { ...form, error: 'Time must be a number' };
      }
      const code = form.code || generateCode();
      if (allLinks[code]) {
        return { ...form, error: 'Shortcode already exists. Choose another.' };
      }
      if (form.code && !/^[a-zA-Z0-9]{3,12}$/.test(form.code)) {
        return { ...form, error: 'Shortcode must be 3–12 alphanumeric characters.' };
      }

      const duration = form.time ? parseInt(form.time) : 30;
      saveShortLink(code, form.url, duration);
      recordLog('Short URL created', { url: form.url, code });

      validForms.push({
        url: form.url,
        shortUrl: `http://localhost:3000/${code}`,
        expiresAt: new Date(Date.now() + duration * 60 * 1000).toLocaleString(),
      });

      return { url: '', code: '', time: '', error: '' };
    });

    setForms(updatedForms);
    setResults(validForms);
  };

  return (
    <Box p={4}>
      <Typography variant="h5" mb={3}>URL Shortener</Typography>

      {forms.map((form, idx) => (
        <Paper key={idx} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Original URL"
                fullWidth
                value={form.url}
                onChange={(e) => handleChange(idx, 'url', e.target.value)}
                error={!!form.error}
                helperText={form.error}
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <TextField
                label="Validity (min)"
                type="number"
                fullWidth
                value={form.time}
                onChange={(e) => handleChange(idx, 'time', e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                label="Custom Shortcode"
                fullWidth
                value={form.code}
                onChange={(e) => handleChange(idx, 'code', e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button variant="contained" onClick={handleSubmit} sx={{ mr: 2 }}>
        Shorten All
      </Button>

      {forms.length < 5 && (
        <Button variant="outlined" onClick={addForm}>
          + Add Another URL
        </Button>
      )}

      <Box mt={4}>
        <Typography variant="h6">Shortened URLs:</Typography>
        {results.map((r, i) => (
          <Paper key={i} sx={{ p: 2, mt: 2 }}>
            <Typography><strong>Original:</strong> {r.url}</Typography>
            <Typography><strong>Short Link:</strong> <a href={r.shortUrl} target="_blank" rel="noopener noreferrer">{r.shortUrl}</a></Typography>
            <Typography><strong>Expires At:</strong> {r.expiresAt}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default UrlShortener;
