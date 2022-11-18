import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";
// context
import useEth from "../../../contexts/EthContext/useEth";
// components
import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const {
    state: { me, freshEvent },
  } = useEth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const totalUnRead = notifications?.length || 0;

  useEffect(() => {
    if (freshEvent) {
      const notifs = [...notifications];
      notifs.push(freshEvent);
      setNotifications(notifs);
    }
  }, [freshEvent]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications([]);
  };

  return (
    !!me &&
    (me.isOwner || me.isRegistered) && (
      <>
        <IconButton
          color={open ? "primary" : "default"}
          onClick={handleOpen}
          sx={{ width: 40, height: 40 }}
        >
          <Badge badgeContent={totalUnRead} color="error">
            <Iconify icon="eva:bell-fill" />
          </Badge>
        </IconButton>

        <Popover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              mt: 1.5,
              ml: 0.75,
              width: 360,
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">Evènements</Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Il y a eu {totalUnRead} évènements récents.
              </Typography>
            </Box>

            {totalUnRead > 0 && (
              <Tooltip title=" Tout marquer comme lu">
                <IconButton color="primary" onClick={handleMarkAllAsRead}>
                  <Iconify icon="eva:done-all-fill" />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          <Divider sx={{ borderStyle: "dashed" }} />

          {!!notifications && (
            <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}>
              <List
                disablePadding
                subheader={
                  <ListSubheader
                    disableSticky
                    sx={{ py: 1, px: 2.5, typography: "overline" }}
                  >
                    Actus
                  </ListSubheader>
                }
              >
                {notifications.slice(0, 2).map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </List>

              <List
                disablePadding
                subheader={
                  <ListSubheader
                    disableSticky
                    sx={{ py: 1, px: 2.5, typography: "overline" }}
                  >
                    Avant cela
                  </ListSubheader>
                }
              >
                {notifications.slice(2, 5).map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </List>
            </Scrollbar>
          )}

          <Divider sx={{ borderStyle: "dashed" }} />

          <Box sx={{ p: 1 }}>
            <Button fullWidth disableRipple onClick={() => navigate("/events")}>
              Voir tous les évènements
            </Button>
          </Box>
        </Popover>
      </>
    )
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    eevent: PropTypes.string,
    value: PropTypes.string,
  }),
};

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        bgcolor: "action.selected",
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={title} />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.event}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        &nbsp; {notification.value}
      </Typography>
    </Typography>
  );

  if (notification.event === "VoterRegistered") {
    return {
      avatar: (
        <img
          alt={notification.event}
          src="/assets/icons/ic_notification_package.svg"
        />
      ),
      title,
    };
  }
  if (notification.event === "WorkflowStatusChange") {
    return {
      avatar: (
        <img
          alt={notification.event}
          src="/assets/icons/ic_notification_shipping.svg"
        />
      ),
      title,
    };
  }
  if (notification.event === "ProposalRegistered") {
    return {
      avatar: (
        <img
          alt={notification.event}
          src="/assets/icons/ic_notification_mail.svg"
        />
      ),
      title,
    };
  }
  if (notification.event === "Voted") {
    return {
      avatar: (
        <img
          alt={notification.event}
          src="/assets/icons/ic_notification_chat.svg"
        />
      ),
      title,
    };
  }
  return {
    avatar: notification.avatar ? (
      <img alt={notification.title} src={notification.avatar} />
    ) : null,
    title,
  };
}
