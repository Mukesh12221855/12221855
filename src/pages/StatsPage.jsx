import React from 'react';
import { getAllLinks } from '../utils/urlStore';
import { Box, Typography, Paper, Divider } from '@mui/material';

function StatsPage() {
  const data = getAllLinks();
  const codes = Object.keys(data);

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>Short URL Statistics</Typography>

      {codes.length === 0 && <Typography>No URLs shortened yet.</Typography>}

      {codes.map((code, index) => {
        const item = data[code];
        return (
          <Paper key={index} sx={{ p: 2, mb: 3 }}>
            <Typography><strong>Short URL:</strong> http://localhost:3000/{code}</Typography>
            <Typography><strong>Original:</strong> {item.url}</Typography>
            <Typography>
              <strong>Created:</strong> {new Date(item.createdAt).toLocaleString()}
            </Typography>
            <Typography>
              <strong>Expires:</strong> {new Date(item.expiresAt).toLocaleString()}
            </Typography>
            <Typography>
              <strong>Total Clicks:</strong> {item.clicks.length}
            </Typography>

            {item.clicks.length > 0 && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1">Click Details:</Typography>
                {item.clicks.map((click, i) => (
                  <Box key={i} sx={{ ml: 2, mt: 1 }}>
                    <Typography>- Time: {click.time}</Typography>
                    <Typography>  Source: {click.source}</Typography>
                    <Typography>  Location: {click.location}</Typography>
                  </Box>
                ))}
              </>
            )}
          </Paper>
        );
      })}
    </Box>
  );
}

export default StatsPage;
