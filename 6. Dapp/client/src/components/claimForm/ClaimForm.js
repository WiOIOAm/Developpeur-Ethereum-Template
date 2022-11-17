import { useState } from "react";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// components
import Iconify from "../iconify";
// ----------------------------------------------------------------------

export default function ClaimForm({ handleSubmit, isLoading, isClaimSended }) {
  const [showAddress, setShowAddress] = useState(false);

  return (
    <>
      {!isClaimSended && (
        <form onSubmit={handleSubmit}>
          <Stack marginBottom={3}>
            <TextField
              inputProps={{
                pattern: "0x[a-fA-F0-9]{40}",
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
              name="ethAddress"
              label="Adresse Ethereum"
              type={showAddress ? "text" : "password"}
              required
            />
          </Stack>

          <LoadingButton
            loading={isLoading}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Réclamer le droit de vote
          </LoadingButton>
        </form>
      )}
      {isClaimSended && (
        <Typography variant="body2">
          Votre demande a bien été envoyée
        </Typography>
      )}
    </>
  );
}
