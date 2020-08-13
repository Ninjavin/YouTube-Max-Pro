import React from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { Input } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import GetAppIcon from '@material-ui/icons/GetApp';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import './Download.css';

const optionsVideo = ["144p", "240p", "360p", "480p", "720p", "1080p"];

class Download extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            videoLink: "",
            open: false,
            selectedIndex: 3
        }
        this.anchorRef = React.createRef();
        this.handleInputChangeVideoLink = this.handleInputChangeVideoLink.bind(this);
        this.handleSubmitAudio = this.handleSubmitAudio.bind(this);
        this.handleSubmitVideo = this.handleSubmitVideo.bind(this);
    }

    handleInputChangeVideoLink(event){
        this.setState({ videoLink: event.target.value })
    }

    downloadVideo = () => {
        axios.get("http://localhost:5000/downloadVideo", {
            params: {videoLink: this.state.videoLink, qualityLabel: optionsVideo[this.state.selectedIndex]},
            responseType: "blob"
        }).then((response) => {
            fileDownload(response.data, "Youtube-Video.mp4")
        }).catch(err => console.log(err))
    }

    downloadAudio = () => {
        axios.get("http://localhost:5000/downloadAudio", {
            params: {audioLink: this.state.videoLink},
            responseType: "blob"
        }).then((response) => {
            fileDownload(response.data, "Youtube-Audio.mp3")
        }).catch(err => console.log(err))
    }

    handleSubmitVideo = function(event){
        event.preventDefault();
        this.downloadVideo();
    }

    handleSubmitAudio = function(event){
        event.preventDefault();
        this.downloadAudio();
    }

    handleClick = () => {
        console.log(`You clicked ${optionsVideo[this.state.selectedIndex]}`);
    }

    handleMenuItemClick = (event, index) => {
        this.setState({ selectedIndex: index, open: false });
    }

    handleToggle = () => {
        this.setState({ open: !this.state.open});
    }

    render(){
        return(
            
            <div className="masterClass">
            <div className="downloadClass">
                <Typography variant="overline" align="center" color="primary" display="block" gutterBottom>...paste a video link here</Typography>
                <Typography variant="h5" align="center" color="primary" component="h2" gutterBottom>Download Audio/Video</Typography>
                <br />
                <br />
                <div className="downloader">
                    <form className="youtubeVideo">
                        <Input placeholder="Enter videolink" value={ this.state.videoLink } onChange={ this.handleInputChangeVideoLink } required={true} color="primary" fullWidth={true} />
                        <br />
                        <br />
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <ButtonGroup fullWidth={true} variant="contained" color="primary" ref={this.anchorRef} aria-label="split button">
                                    <Button onClick={this.handleToggle}>{optionsVideo[this.state.selectedIndex]}</Button>
                                    <Button color="primary" size="small" aria-controls={this.state.open ? 'split-button-menu' : undefined} aria-expanded={this.state.open ? 'true' : undefined} aria-label="1 2 3 4 5 6" aria-haspopup="menu" onClick={this.handleSubmitVideo} ><GetAppIcon /></Button>
                                    <Popper open={this.state.open} anchorEl={this.anchorRef.current} role={undefined} transition disablePortal>
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                            }}
                                            >
                                            <Paper>
                                                <ClickAwayListener onClickAway={this.handleToggle}>
                                                <MenuList id="split-button-menu">
                                                    {optionsVideo.map((option, index) => (
                                                    <MenuItem
                                                        key={option}
                                                        selected={index === this.state.selectedIndex}
                                                        onClick={(event) => this.handleMenuItemClick(event, index)}
                                                    >
                                                        {option}
                                                    </MenuItem>
                                                    ))}
                                                </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </ButtonGroup>
                            </Grid>
                            <Grid item xs={8}>
                                <ButtonGroup fullWidth={true} variant="contained" color="primary" ref={this.anchorRef} aria-label="split button">
                                    <Button>Only Audio</Button>
                                    <Button color="primary" size="small" onClick={this.handleSubmitAudio} ><GetAppIcon /></Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </form>
                    
                </div>
                
            </div>
            </div>
        )
    }
}

export default Download;