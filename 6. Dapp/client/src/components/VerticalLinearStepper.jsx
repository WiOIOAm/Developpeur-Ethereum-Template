import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const VerticalLinearStepper = ({
  steps,
  activeStep,
  handleNext,
  isOwner,
}) => {
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  {!!isOwner && (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Résultat" : "Continuer   "}
                    </Button>
                  )}
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>
            Toutes les sessions sont terminées - le résultat est disponible
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

VerticalLinearStepper.propTypes = {
  steps: PropTypes.shape({}),
  activeStep: PropTypes.number,
  isOwner: PropTypes.bool,
  handleNext: PropTypes.func.isRequired,
};

VerticalLinearStepper.defaultProps = {
  steps: [],
  activeStep: 0,
  isOwner: false,
};
