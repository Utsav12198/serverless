import React from 'react';
import { Container, Paper, Typography } from '@mui/material';

export default function InternalServerError() {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', mt: 5 }}>
        <Typography variant="h1" color="error">
          500
        </Typography>
        <Typography variant="h5" gutterBottom>
          Internal Server Error
        </Typography>
        <Typography variant="body1">
          Something went wrong on our side. Please try again later or contact support.
        </Typography>
      </Paper>
    </Container>
  );
}
