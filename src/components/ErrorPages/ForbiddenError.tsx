import React from 'react';
import { Container, Paper, Typography } from '@mui/material';

export default function ForbiddenError() {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', mt: 5 }}>
        <Typography variant="h1" color="error">
          403
        </Typography>
        <Typography variant="h5" gutterBottom>
          Forbidden
        </Typography>
        <Typography variant="body1">
          You don't have permission to access this page.
        </Typography>
      </Paper>
    </Container>
  );
}
