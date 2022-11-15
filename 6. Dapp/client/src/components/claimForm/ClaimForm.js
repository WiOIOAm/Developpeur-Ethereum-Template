import { useState } from "react";
// @mui
import { Stack, IconButton, InputAdornment, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../iconify";

// ----------------------------------------------------------------------

export default function ClaimForm() {
  const [showAddress, setShowAddress] = useState(false);

  const handleClick = () => {
    // TODO send email
  };

  return (
    <>
      <Stack marginBottom={3}>
        <TextField
          name="ethAddress"
          label="Adresse Ethereum"
          type={showAddress ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowAddress(!showAddress)}
                  edge="end"
                >
                  <Iconify
                    icon={showAddress ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
      >
        Réclamer le droit de vote
      </LoadingButton>
    </>
  );
}
