// ----------------------------------------------------------------------
const rows = [
  createData("Frozen yoghurt", 159),
  createData("Ice cream sandwich", 237),
  createData("Eclair", 262),
  createData("Cupcake", 305),
  createData("Gingerbread", 356),
];

function createData(description, voteCount) {
  return { description, voteCount };
}
export default rows;
