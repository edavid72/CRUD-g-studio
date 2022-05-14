import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/coding.png';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#112B3C' }}>
        <Toolbar>
          <Box>
            <Link to="/">
              <img src={logo} alt="logo" className="logo" />
            </Link>
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Geek Studio Developers ~ CRUD ~
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            sx={{ backgroundColor: '#0AA1DD' }}
            onClick={() => navigate('/add')}
          >
            Add
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
