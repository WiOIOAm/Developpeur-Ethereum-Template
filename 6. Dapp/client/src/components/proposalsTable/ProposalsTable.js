import { LoadingButton } from "@mui/lab";
// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";

export default function ProposalsTable({
  votedId,
  proposals,
  isLoading,
  handleSubmit,
  voteIsOpen,
  winnerIsKnow,
}) {
  const [currentVoteId, setCurrentVoteId] = useState(null);
  const handleVote = (id) => {
    setCurrentVoteId(id);
    handleSubmit();
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Proposition </TableCell>
            {winnerIsKnow && (
              <TableCell align="center">Nombre de votes</TableCell>
            )}
            {voteIsOpen && <TableCell align="center">Voter</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {proposals.map((row, id) => (
            <TableRow
              key={row.description + id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.description}</TableCell>
              {winnerIsKnow && (
                <TableCell align="center">{row.voteCount}</TableCell>
              )}
              {voteIsOpen && (
                <TableCell align="center">
                  <>
                    {votedId !== id && (
                      <LoadingButton
                        loading={isLoading && currentVoteId === id}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        disabled={!!votedId}
                        onClick={() => handleVote(id)}
                      >
                        Voter
                      </LoadingButton>
                    )}

                    {votedId === id && <span>Votre vote</span>}
                  </>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
