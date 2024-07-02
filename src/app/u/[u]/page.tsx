import { Container, Box, Typography, Grid, Paper } from '@mui/material';

interface PlayerProfile {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  userName: string,
  mouse: string,
  mousePad: string,
  keyBoard: string,
  headSet: string,
  monitor: string
}

const player: PlayerProfile = {
  id: 'John Doe',
  firstName: "Jordan",
  lastName: "Sheldon",
  email: "Jordanhsheldon@gmail.com",
  userName: "NADROJ",
  mouse: "GproWireless",
  mousePad: "Razer Goliath",
  keyBoard: "Razer BlackWidow Chroma",
  headSet: "Razer Krakens",
  monitor: "LG 27 inch"
};

const Profile = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {player.userName}: {player.firstName}  {player.lastName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Location: NA
        </Typography>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Peripherals
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Resolution
                </Typography>
                {/* <Typography>{player.settings.resolution}</Typography> */}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Sensitivity
                </Typography>
                {/* <Typography>{player.settings.sensitivity}</Typography> */}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Key Bindings
                </Typography>
                {Object.entries(player).map(([action, key]) => (
                  <Typography key={action}>
                    {action}: {key}
                  </Typography>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
