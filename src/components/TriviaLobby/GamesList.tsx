import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Pagination,
  TextField,
  Typography,
} from '@mui/material';
import { GamePlay } from '../GameExperience/GamePlay';
interface GameWithStatus {
  gameName: string; 
  category: string;
  difficulty: string;
  numberOfQuestions: number; 
  duration: number; 
  id: string;
  time_to_start?: string; 
  participants?: string; 
}
import { useNavigate } from 'react-router-dom';

export default function GamesList() {
  const [allGames, setAllGames] = useState<GameWithStatus[]>([]);
  const [filteredGames, setFilteredGames] = useState<GameWithStatus[]>([]);
  const [searchCategory, setSearchCategory] = useState<string>('');
  
  const [difficultyFilter, setDifficultyFilter] = useState<{ easy: boolean; medium: boolean; hard: boolean }>({
    easy: false,
    medium: false,
    hard: false,
  });
  const [selectedGame, setSelectedGame] = useState<{ id: string; name: string } | null>(null);

  const [page, setPage] = useState(1);
  
  const itemsPerPage = 9;
  const apiUrl = 'https://4lqzs6o57b.execute-api.us-east-1.amazonaws.com/prod/getgamelist';
const navigate = useNavigate();
  useEffect(() => {
  
    const fetchGames = async () => {
      try {
        const response = await axios.get(apiUrl);
        setAllGames(response.data);
        setFilteredGames(response.data);
      } catch (error) {
        console.error('An error occurred while fetching games:', error);
      }
    };

    
    if(localStorage.getItem("team") == "undefined"){
      navigate("/home/addTeam")
    }
    fetchGames();
  }, []);

  useEffect(() => {
    let filtered = [...allGames];

    // Filter by category
    if (searchCategory) {
      filtered = filtered.filter((game) => game.category.toLowerCase().includes(searchCategory.toLowerCase()));
    }

    // Filter by difficulty
    if (difficultyFilter.easy || difficultyFilter.medium || difficultyFilter.hard) {
      filtered = filtered.filter((game) =>
        (difficultyFilter.easy && game.difficulty === 'easy') ||
        (difficultyFilter.medium && game.difficulty === 'medium') ||
        (difficultyFilter.hard && game.difficulty === 'hard')
      );
    }

    setFilteredGames(filtered);
  }, [searchCategory, difficultyFilter, allGames]);

  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
  const displayedGames = filteredGames.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (selectedGame) {
    return <GamePlay gameId={selectedGame.id} gameName={selectedGame.name} />;
}

  return (
    <Container>
      <Button size="small" variant="contained" sx={{float: 'right', margin: 2}} onClick={()=>{navigate("/home/leaderboard")}}>View Leaderboard</Button>
      <Box my={3}>
        <TextField
          fullWidth
          label="Search by Category"
          variant="outlined"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
      </Box>
      <Box my={3}>
        <FormControlLabel control={<Checkbox name="easy" onChange={(e) => setDifficultyFilter({...difficultyFilter, easy: e.target.checked})} />} label="Easy" />
        <FormControlLabel control={<Checkbox name="medium" onChange={(e) => setDifficultyFilter({...difficultyFilter, medium: e.target.checked})} />} label="Medium" />
        <FormControlLabel control={<Checkbox name="hard" onChange={(e) => setDifficultyFilter({...difficultyFilter, hard: e.target.checked})} />} label="Hard" />
      </Box>
      <Grid container spacing={3}>
        {displayedGames.map((game, index) => {
          const totalTimeInMinutes = game.numberOfQuestions / 2; // Calculating total time

          return (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">{game.gameName}</Typography>
                  <Typography variant="body2" color="text.secondary">Category: {game.category}</Typography>
                  <Typography variant="body2" color="text.secondary">Difficulty: {game.difficulty}</Typography>
                  <Typography variant="body2" color="text.secondary">Number of Questions: {game.numberOfQuestions}</Typography>
                  <Typography variant="body2" color="text.secondary">Total Time: {totalTimeInMinutes} minutes</Typography> {/* Displaying total time */}
                  {/* <Typography variant="body2" color="text.secondary">Time to Start: {game.time_to_start}</Typography>
                  <Typography variant="body2" color="text.secondary">Participants: {game.participants}</Typography> */}
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" onClick={() => setSelectedGame({ id: game.id, name: game.gameName })}>Join</Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Box my={3} display="flex" justifyContent="center">
        <Pagination count={totalPages} page={page} onChange={(_, value) => setPage(value)} />
      </Box>
    </Container>
  );


}
