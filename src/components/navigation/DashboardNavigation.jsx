import {
	List,
	Toolbar,
	ListItem,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	Collapse
} from '@mui/material'
import { NavLink } from 'react-router-dom'
import { dashboardLinks } from '../../utils/navigationsLinks'
import {
	ANALITICS_PAGE_ICON,
	BACK_ICON,
	COMMENT_ICON,
	FORUM_ICON,
	MARKET_PLACE_ICON,
	PROFIL_ICON,
	PUBLICATION_ICON,
	REPORT_ICON,
	STAR_ICON,
	EXPLORE_ICON
} from '../../utils/icon'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import React from 'react'

const DashboardNavigation = () => {
  const [openMenuPublications, setOpenMenuPublications] =
		React.useState(false)

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
        background: 'white',
        '.active': {
          background: 'var(--coreego-blue)',
          '*': {
            color: 'white',
            fill: 'white'
          }
        }
      }}
		>
      <List sx={{ width: '100%' }}>
        <ListItem disablePadding>
          <NavLink to='/' style={{ width: '100%' }}>
            <ListItemButton>
              <ListItemIcon>
                <BACK_ICON />
              </ListItemIcon>
              <ListItemText
                sx={{ display: { xs: 'none', sm: 'block' } }}
                primary='Retourner sur le site'
							/>
            </ListItemButton>
          </NavLink>
        </ListItem>

        <ListItem disablePadding>
          <NavLink
            to='/dashboard/analyse-des-donnees'
            style={{ width: '100%' }}
					>
            <ListItemButton>
              <ListItemIcon>
                <ANALITICS_PAGE_ICON />
              </ListItemIcon>
              <ListItemText
                sx={{ display: { xs: 'none', sm: 'block' } }}
                primary='Analyse des données'
							/>
            </ListItemButton>
          </NavLink>
        </ListItem>

        <ListItem disablePadding>
          <NavLink to='/dashboard/utilisateurs' style={{ width: '100%' }}>
            <ListItemButton>
              <ListItemIcon>
                <PROFIL_ICON />
              </ListItemIcon>
              <ListItemText
                sx={{ display: { xs: 'none', sm: 'block' } }}
                primary='utilisateurs'
							/>
            </ListItemButton>
          </NavLink>
        </ListItem>

        <ListItem disablePadding>
          <NavLink to='/dashboard/signalements' style={{ width: '100%' }}>
            <ListItemButton>
              <ListItemIcon>
                <REPORT_ICON />
              </ListItemIcon>
              <ListItemText
                sx={{ display: { xs: 'none', sm: 'block' } }}
                primary='Signalements'
							/>
            </ListItemButton>
          </NavLink>
        </ListItem>

        <ListItemButton
          onClick={() =>
						setOpenMenuPublications(!openMenuPublications)
					}
				>
          <ListItemIcon>
            <PUBLICATION_ICON />
          </ListItemIcon>
          <ListItemText
            primary='Publications'
            sx={{ display: { xs: 'none', sm: 'block' } }}
					/>
          {openMenuPublications ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse
          in={openMenuPublications}
          timeout='auto'
          unmountOnExit
				>
          <List component='div' disablePadding>
            <ListItem>
              <NavLink
                to='/dashboard/publication/discussions'
                style={{ width: '100%' }}
							>
                <ListItemButton>
                  <ListItemIcon>
                  <FORUM_ICON />
                </ListItemIcon>
                  <ListItemText
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                  primary='Discussions'
									/>
                </ListItemButton>
              </NavLink>
            </ListItem>

            <ListItem>
              <NavLink
                to='/dashboard/publication/produits'
                style={{ width: '100%' }}
							>
                <ListItemButton>
                  <ListItemIcon>
                  <MARKET_PLACE_ICON />
                </ListItemIcon>
                  <ListItemText
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                  primary='Produits'
									/>
                </ListItemButton>
              </NavLink>
            </ListItem>

            <ListItem>
              <NavLink
                to='/dashboard/publication/lieux'
                style={{ width: '100%' }}
							>
                <ListItemButton>
                  <ListItemIcon>
                  <EXPLORE_ICON />
                </ListItemIcon>
                  <ListItemText
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                  primary='Lieux'
									/>
                </ListItemButton>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                to='/dashboard/publication/commentaires'
                style={{ width: '100%' }}
							>
                <ListItemButton>
                  <ListItemIcon>
                  <COMMENT_ICON />
                </ListItemIcon>
                  <ListItemText
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                  primary='Commentaires'
									/>
                </ListItemButton>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                to='/dashboard/publication/avis'
                style={{ width: '100%' }}
							>
                <ListItemButton>
                  <ListItemIcon>
                  <STAR_ICON />
                </ListItemIcon>
                  <ListItemText
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                  primary='Reviews'
									/>
                </ListItemButton>
              </NavLink>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Toolbar>
  )
}

export default DashboardNavigation
