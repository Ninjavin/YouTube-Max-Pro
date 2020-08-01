import React from 'react';

import { Input } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import './SearchBar.css';

class SearchBar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            inputValue: ""
        }
    }

    handleInputChange = (e) => {
        e.preventDefault();
        this.setState({ inputValue: e.target.value });
        // console.log(e.target.value);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit(this.state.inputValue);
    }

    render(){
        return(
            <div className="SearchBarClass">
                <form onSubmit={this.handleSubmit} noValidate >
                    {/* <Grid container spacing={3}>
                        <Grid item xs={11}>
                            <Input placeholder="Search for a video" required={true} color="primary" fullWidth={true} onChange={this.handleInputChange} value={this.state.inputValue} />
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton color="primary" justify="center" aria-label="Search" onClick={this.handleSubmit} ><SearchIcon /></IconButton>
                        </Grid>
                    </Grid> */}
                    <Input endAdornment={
                        <InputAdornment position="end">
                            <IconButton color="primary" justify="center" aria-label="Search" onClick={this.handleSubmit} ><SearchIcon /></IconButton>
                        </InputAdornment>
                    } placeholder="Search for a video" required={true} color="primary" fullWidth={true} onChange={this.handleInputChange} value={this.state.inputValue} />
                </form>
            </div>
        )
    }
}

export default SearchBar;