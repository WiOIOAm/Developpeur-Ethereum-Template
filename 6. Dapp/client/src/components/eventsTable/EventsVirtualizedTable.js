import Paper from "@mui/material/Paper";

import { VirtualizedTable } from "./MuiVirtualizedTable";

export default function EventsVirtualizedTable({ rows }) {
  return (
    <Paper style={{ height: 400, width: "100%", overflowX: "auto" }}>
      <VirtualizedTable
        width={1000}
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: 150,
            label: "ID",
            dataKey: "id",
            numeric: true,
          },
          {
            width: 200,
            label: "Nom de l'évènement",
            dataKey: "event",
          },
          {
            width: 350,
            label: "Valeur",
            dataKey: "value",
          },
          {
            width: 150,
            label: "Numéro du block",
            dataKey: "blockNumber",
            numeric: true,
          },
          {
            width: 150,
            label: "Hash du block",
            dataKey: "blockHash",
          },
        ]}
      />
    </Paper>
  );
}
