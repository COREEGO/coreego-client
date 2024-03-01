import {
	Box,
	Button,
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	SpeedDial,
	SpeedDialAction,
	Tooltip,
	Stack
} from '@mui/material'
import { FACEBOOK_ICON, LINK_ICON, MAIL_ICON, REDDIT_ICON, SHARE_ICON, WHATSAPP_ICON, X_ICON } from '../../utils/icon'
import {
	EmailShareButton,
	FacebookShareButton,
	GabShareButton,
	HatenaShareButton,
	InstapaperShareButton,
	LineShareButton,
	LinkedinShareButton,
	LivejournalShareButton,
	MailruShareButton,
	OKShareButton,
	PinterestShareButton,
	PocketShareButton,
	RedditShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from 'react-share'
import React from 'react'
import { useLocation } from 'react-router'
import { toast } from 'react-toastify'

const ShareButton = () => {
  const [anchorShare, setAnchorShare] = React.useState(null)

    const location = useLocation()

    const url = window.location.origin + location.pathname

  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title='Facebook'>
        <FacebookShareButton url={url}>
            <FACEBOOK_ICON />
        </FacebookShareButton>
      </Tooltip>
      <Tooltip title='X'>
        <TwitterShareButton url={url}>

            <X_ICON />

        </TwitterShareButton>
      </Tooltip>
      <Tooltip title='Whatsapp'>
        <WhatsappShareButton url={url}>
            <WHATSAPP_ICON />
        </WhatsappShareButton>
      </Tooltip>
      <Tooltip title='Reddit'>
        <RedditShareButton url={url}>

            <REDDIT_ICON />

        </RedditShareButton>
      </Tooltip>
	  <Tooltip title='Email'>
        <EmailShareButton url={url}>

            <MAIL_ICON />

        </EmailShareButton>
      </Tooltip>
	  <Tooltip title='Copier le lien'>
          <IconButton onClick={() => {
			navigator.clipboard.writeText(url)
			toast.success('Lien copier')
		  }}>
            <LINK_ICON />
          </IconButton>
      </Tooltip>
    </Stack>
	)
}

export default ShareButton
