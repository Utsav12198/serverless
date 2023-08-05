import React from 'react'
import {Button, Stack} from "@mui/material";
import { useNavigate } from 'react-router-dom';
export default function LeaderBoardPage() {
  const navigate = useNavigate();  
  const iframeStyle = {
        width: '100%',
        height: '100vh',
        border: '1',
      };
    
      return (
        <Stack sx={{width: '100%'}}>
        <div>
        <Button size="small" variant="contained" sx={{margin: 2}} onClick={()=>{navigate("/home/gamesList")}}>View Games</Button>
        </div>
        <iframe
          width="600"
          height="450"
          src="https://lookerstudio.google.com/embed/reporting/3e1a62ee-64f6-4b78-b9ee-d97cf5e96066/page/p_tr4xam1j8c"
          frameBorder="0"
          style={iframeStyle} // Use the React style object here
          allowFullScreen
        ></iframe>
        </Stack>
        
      );
    }
