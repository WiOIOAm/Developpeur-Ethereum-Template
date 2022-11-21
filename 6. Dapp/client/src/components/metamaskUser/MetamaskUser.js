import PropTypes from "prop-types";
// @mui
import { styled, alpha } from "@mui/material/styles";
import { Box, Link, Typography, Avatar } from "@mui/material";
// components
import truncateEthAddress from "../../utils/truncate-eth-address";

// ----------------------------------------------------------------------
const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

MetamaskUser.propTypes = {
  me: PropTypes.shape({
    photoURL: PropTypes.string,
    address: PropTypes.string,
    role: PropTypes.string,
  }),
};

export default function MetamaskUser({ me }) {
  return (
    <>
      <Link underline="none">
        <StyledAccount>
          <Avatar
            src={
              me?.isOwner
                ? "/assets/images/avatars/avatar_default.jpg"
                : me?.isRegistered
                ? "/assets/images/avatars/avatar_13.jpg"
                : ""
            }
            alt="photoURL"
          />

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
              {me?.address && truncateEthAddress(me.address)}
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {me.isRegistered ? "Votant" : ""} {me.isOwner ? "Animateur" : ""}
              {!me.isRegistered && !me.isOwner
                ? "utilisateur non enregistré"
                : ""}
            </Typography>
          </Box>
        </StyledAccount>
      </Link>
    </>
  );
}
