import {
	List,
	Toolbar,
	ListItem,
	ListItemButton,
	ListItemText,
	ListItemIcon,
} from '@mui/material'
import { NavLink } from 'react-router-dom'
import { dashboardLinks } from '../../utils/navigationsLinks'

const DashboardNavigation = () => {
  return (
    <Toolbar
      disableGutters
      sx={{
        position: 'sticky',
        flexDirection: 'column',
        boxShadow: 3,
        height: '100vh',
        top: 0,
        bottom: 0,
        background: 'white'
      }}
		>
      <List sx={{ width: '100%' }}>
        {dashboardLinks.map((link, index) => {
          return (
            <ListItem key={index} disablePadding>
              <NavLink to={link.path} style={{ width: '100%' }}>
                <ListItemButton>
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText sx={{display: {xs: 'none', sm: 'block' } }} primary={link.page_name} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          )
        })}
      </List>
    </Toolbar>
  )
}

export default DashboardNavigation
