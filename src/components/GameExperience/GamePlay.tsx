import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinearProgress, Typography, Container, Box, Avatar, Grid, Card, CardContent } from '@mui/material';

interface GamePlayProps {
  gameId: string;
  gameName: string;
}

interface TeamMember {
  username: string;
  profile_pic: string;
  inviteStatus: string;
}

interface TeamDetails {
  team_name: string;
  team_id: string;
  members: TeamMember[];
}

export const GamePlay = ({ gameId, gameName }: GamePlayProps) => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(10); // 10 seconds
  const [progress, setProgress] = useState(0);

  // Retrieve team details from local storage
  const teamDetailsString = localStorage.getItem('team');
  const teamDetails = teamDetailsString ? JSON.parse(teamDetailsString) as TeamDetails : null;

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
        setProgress((prevProgress) => prevProgress + 100 / 10);
      } else {
        clearInterval(interval);
        navigate('/home/quizgame/' + gameId, { state: { gameName } });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, navigate, gameId, gameName]);

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" p={3}>
        <Typography variant="h4" gutterBottom>Game Name: {gameName}</Typography>
        <Typography variant="h5" gutterBottom>Starting in: {timer} seconds</Typography>
        <LinearProgress variant="determinate" value={progress} style={{ width: '100%', marginBottom: '20px' }} />
        <Typography variant="body1" gutterBottom>Please wait. The game will start soon.</Typography>
        {teamDetails && (
          <Card variant="outlined" style={{ marginTop: '20px', width: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Team: {teamDetails.team_name}</Typography>
              <Container>
                {teamDetails.members.map((member, index) => (
                  <Box display="flex" flexDirection="row" alignItems="center" mb={1} key={index}>
                    <Avatar alt={member.username} src={member.profile_pic} />
                    <Typography variant="body2" color="text.secondary" style={{ marginLeft: '10px' }}>{member.username}</Typography>
                  </Box>
                ))}
              </Container>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
  
  
};
