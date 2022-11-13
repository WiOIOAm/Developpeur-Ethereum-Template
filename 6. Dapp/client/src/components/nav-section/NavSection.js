import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Box, List, ListItemText } from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "./styles";

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
  isOwner: PropTypes.bool,
  isRegistered: PropTypes.bool,
  isNonRegistered: PropTypes.bool,
};
NavSection.defaultProps = {
  data: [],
  isOwner: false,
  isRegistered: false,
  isNonRegistered: true,
};
export default function NavSection({
  data = [],
  isOwner,
  isRegistered,
  isNonRegistered,
  ...other
}) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem
            key={item.title}
            item={item}
            isOwner={isOwner}
            isRegistered={isRegistered}
            isNonRegistered={isNonRegistered}
          />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};
function NavItem({ item, isOwner, isRegistered, isNonRegistered }) {
  const {
    title,
    path,
    icon,
    info,
    href,
    showToOwner,
    showToRegistered,
    showToNonRegistred,
  } = item;

  return (isOwner && showToOwner) ||
    (isRegistered && showToRegistered) ||
    (isNonRegistered && showToNonRegistred) ? (
    <StyledNavItem
      component={!!href ? "a" : RouterLink}
      target={!!href ? "_blank" : ""}
      to={path}
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />
      {info && info}
    </StyledNavItem>
  ) : null;
}
