import { Helmet } from "react-helmet-async";

import { Grid, Container, Typography } from "@mui/material";

// context
import useEth from "../contexts/EthContext/useEth";
// components
import { EventsVirtualizedTable } from "../components/eventsTable";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const {
    state: { me, oldEvents },
  } = useEth();

  return (
    <>
      <Helmet>
        <title> Dashboard | Easy Voting DApp </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Evènements de l'application
        </Typography>
        {!me && (
          <Typography variant="body2" sx={{ mb: 5, color: "red" }}>
            <span>Connectez votre MetaMask pour utiliser l'application</span>
          </Typography>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {oldEvents && <EventsVirtualizedTable rows={oldEvents} />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
