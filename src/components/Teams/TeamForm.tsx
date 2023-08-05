import React, { useState, useCallback,  } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper, Grid, Box,  Typography } from '@mui/material';
import {auth} from "../../../firebaseconfig.js";
import { useNavigate } from "react-router-dom";

export default function TeamForm() {
  // const adminEmail = localStorage.getItem('adminEmail');
  const navigate = useNavigate();

  const [members, setMembers] = useState(['']);

  const handleMemberChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  const addMemberField = () => {
    if (members.length < 3) {
      setMembers([...members, '']);
    }
  };


  const createTeam = async (data, idToken) =>{
    let response = await fetch('https://6418qzn2i7.execute-api.us-east-1.amazonaws.com/dev/app/team', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorizationToken: idToken
      },
      body: JSON.stringify(data),
    })
    let json = await response.json();
    return json;
  }
  const formHandler = useCallback(async (event) => {
    event.preventDefault();
    let user = localStorage.getItem("user");
    if (user && auth.currentUser) {
      user = JSON.parse(localStorage.getItem("user"));
      let idToken = await auth.currentUser.getIdToken();
      const data = {
        admin: user['email'],
        members: members.filter((member) => member !== ''), // Filter out any empty members
      };
      let createdTeamResponse = await createTeam(data, idToken);
      if (createdTeamResponse) {
        localStorage.setItem("team", JSON.stringify(createdTeamResponse));
        navigate("/home/gamesList");
      }
    }
  }, [members, navigate]);


  return (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: '100vh' }}
  >
     <Grid item xs={3}>
     <Box
    sx={{
      width: 500,
      py: 20,
      px: 10,
      maxWidth: '100%',
      boxShadow: 12,
      border: "1px solid grey",
    }}
  >
    <Typography variant="h6" gutterBottom>
          Create a Team
        </Typography>
        <form onSubmit={formHandler}>
          {members.map((email, index) => (
            <TextField
              key={index}
              fullWidth
              label={`Member ${index + 1} Email`}
              value={email}
              onChange={(e) => handleMemberChange(index, e.target.value)}
              sx={{ mb: 2 }}
            />
          ))}
          {members.length < 3 && (
            <Button onClick={addMemberField} variant="outlined" sx={{ mb: 2 }}>
              Add Team Member
            </Button>
          )}
          <Button sx={{ mb: 2, py: 1 }} type="submit" variant="contained" fullWidth>
            Create Team
          </Button>
        </form>
     </Box>
    </Grid>
  </Grid>

    // <Container maxWidth="xs">
    //   <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', mt: 5 }}>
        
    //   </Paper>
    // </Container>
  );
}
