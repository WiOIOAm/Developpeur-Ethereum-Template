import { useState } from "react";
// @mui
import { Stack, IconButton, InputAdornment, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../iconify";

// ----------------------------------------------------------------------

export default function VoterForm() {
  const handleClick = () => {
    // TODO Add voter
  };

  return (
    <>
      <Stack marginBottom={3}>
        <TextField name="ethAddress" label="Adresse Ethereum" type="text" />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
      >
        Enregistrer ce votant
      </LoadingButton>
    </>
  );
}
