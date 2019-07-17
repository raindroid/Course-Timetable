import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {DialogContent, DialogContentText, DialogActions} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    PinterestShareButton,
    VKShareButton,
    OKShareButton,
    RedditShareButton,
    TumblrShareButton,
    LivejournalShareButton,
    MailruShareButton,
    ViberShareButton,
    WorkplaceShareButton,
    LineShareButton,
    PocketShareButton,
    InstapaperShareButton,
    EmailShareButton,
  } from 'react-share';
  import {
    FacebookIcon,
    TwitterIcon,
    TelegramIcon,
    WhatsappIcon,
    LinkedinIcon,
    PinterestIcon,
    VKIcon,
    OKIcon,
    RedditIcon,
    TumblrIcon,
    LivejournalIcon,
    MailruIcon,
    ViberIcon,
    WorkplaceIcon,
    LineIcon,
    PocketIcon,
    InstapaperIcon,
    EmailIcon,
  } from 'react-share';

 
class SaveDoneDialog extends Component {
    state = { open: false }
    handleClickOpen = () => {
        let open = true
        this.setState({open})  
        
        this.props.saveProfile()
    }

    handleClickClose = () => {
        let open = false
        this.setState({open})        
    }

    render() { 
        let {link} = this.props 
        link = link || "loading"
        return ( 
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Save & Share
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClickClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        Share Link:
                    </DialogTitle>
                    <DialogContent>
                        <div className="row justify-content-center">
                            <FacebookShareButton
                                url={link}
                                quote="GO share me">
                                    <FacebookIcon size={32} round={true} />
                            </FacebookShareButton>
                        </div>

                        <DialogContentText>
                            <a href={link}>{link}</a>	&nbsp;
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                        <CopyToClipboard text={link}>
                            <Button color="primary" autoFocus>Copy</Button>
                        </CopyToClipboard>
                        <Button onClick={this.handleClickClose} color="primary" autoFocus>
                            Close
                        </Button>
                </DialogActions>
            </Dialog> 
          </div>);
    }
}
 
export default SaveDoneDialog;