import { Helmet } from "react-helmet-async";
import {
  Grid,
  Container,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";

// components
import { VerticalLinearStepper } from "../components/VerticalLinearStepper";

// sections
import { AppWidgetSummary } from "../sections/@dashboard/app";

import steps from "../_mock/steps";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Easy Voting DApp </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Bienvenue !
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Voters"
              total={714000}
              icon={"ant-design:smile-twotone"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Proposals"
              total={1352831}
              color="info"
              icon={"ant-design:comment-outlined"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Votes"
              total={1723315}
              color="warning"
              icon={"ant-design:edit-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Phase"
              total={234}
              color="error"
              icon={"ant-design:file-protect-outlined"}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}></Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardHeader title="Etapes du vote" />

              <CardContent
                sx={{
                  "& .MuiTimelineItem-missingOppositeContent:before": {
                    display: "none",
                  },
                }}
              >
                <VerticalLinearStepper steps={steps} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
