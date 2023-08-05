import { Outlet } from "react-router-dom";
import NavBar from '../../components/NavBar/NavBar';
import { Grid,Box } from "@mui/material";

function AuthLayout(){
    return <>
    <NavBar isAuth={false}/>
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
         <Outlet/>
         </Box>
        </Grid>
      </Grid>
    
    </>
}

export default AuthLayout;