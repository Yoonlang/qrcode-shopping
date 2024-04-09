import { black, primary } from "@/constants/colors";
import { Badge, styled } from "@mui/material";

const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    color: ${black};
    background-color: ${primary};
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
  }
`;

export { StyledBadge };
