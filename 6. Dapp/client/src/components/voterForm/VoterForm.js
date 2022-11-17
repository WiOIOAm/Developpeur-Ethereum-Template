// @mui
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function VoterForm({ handleSubmit, isLoading }) {
  return (
    <form onSubmit={handleSubmit}>
      <Stack marginBottom={3}>
        <TextField
          inputProps={{ pattern: "0x[a-fA-F0-9]{40}" }}
          name="ethAddress"
          label="Adresse Ethereum"
          type="text"
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
        Enregistrer ce votant
      </LoadingButton>
    </form>
  );
}
