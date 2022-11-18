// @mui
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function ProposalForm({ handleSubmit, isLoading }) {
  return (
    <form onSubmit={handleSubmit}>
      <Stack marginBottom={3}>
        <TextField name="proposal" label="Proposition" type="text" required />
      </Stack>
      <LoadingButton
        loading={isLoading}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
      >
        Faire une proposition
      </LoadingButton>
    </form>
  );
}
