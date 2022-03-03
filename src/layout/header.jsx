import { AppBar, Toolbar, Typography } from "@mui/material";
import "../styles.css";
import PetsIcon from '@mui/icons-material/Pets';

export default function Header() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <PetsIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          Dog Breeds
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
