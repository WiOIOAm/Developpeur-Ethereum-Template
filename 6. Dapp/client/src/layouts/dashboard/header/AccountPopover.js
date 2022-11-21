import { useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import { Box, Typography, Avatar, IconButton, Popover } from "@mui/material";
// components
import truncateEthAddress from "../../../utils/truncate-eth-address";

// context
import useEth from "../../../contexts/EthContext/useEth";

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const {
    state: { me },
  } = useEth();

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
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
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        {!!me && (
          <Box sx={{ my: 1.5, px: 2.5 }}>
            <Typography variant="subtitle2" noWrap>
              {truncateEthAddress(me.address)}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              {me.isRegistered ? "Votant" : ""} {me.isOwner ? "Animateur" : ""}
              {!me.isRegistered && !me.isOwner
                ? "utilisateur non enregistré"
                : ""}
            </Typography>
          </Box>
        )}
      </Popover>
    </>
  );
}
