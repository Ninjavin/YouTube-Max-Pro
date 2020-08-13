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
    }

    handleSubmit1 = (e) => {
        e.preventDefault();
        this.props.handleSubmit1(this.state.inputValue);
    }

    render(){
        return(
            <div className="SearchBarClass">
                <form onSubmit={this.handleSubmit1} noValidate >
                    <Input endAdornment={
                        <InputAdornment position="end">
                            <IconButton color="primary" justify="center" aria-label="Search" onClick={this.handleSubmit1} ><SearchIcon /></IconButton>
                        </InputAdornment>
                    } placeholder="Search for a video here or..." required={true} color="primary" fullWidth={true} onChange={this.handleInputChange} value={this.state.inputValue} />
                </form>
            </div>
        )
    }
}

export default SearchBar;