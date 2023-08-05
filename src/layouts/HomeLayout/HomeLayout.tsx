import { Outlet } from "react-router-dom";
import NavBar from '../../components/NavBar/NavBar';
import { Grid,Box } from "@mui/material";

function HomeLayout(){
    return <>
    <NavBar isAuth={true}/>
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        // justifyContent="center"
        sx={{ minHeight: '100vh', padding: 2 }}
      >
           {/* <Grid item xs={3}> */}
         {/* <Box
        sx={{
          height: '70vh',
          width: '80vw',
          py: 20,
          px: 10,
          maxWidth: '100%',
          boxShadow: 12,
          border: "1px solid grey",
        }}
      > */}
         <Outlet/>
         {/* </Box> */}
        {/* </Grid> */}
         
        
      </Grid>
    
    </>
}

export default HomeLayout;