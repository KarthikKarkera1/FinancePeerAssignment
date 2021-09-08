import React, { Component } from "react";
import { Button } from "@material-ui/core";
import axios from 'axios'

export default class FileUpload extends Component {
  state = {
    selectedFile: null
  };
  handleFileChange = (e) => {
    const file = e.target.files[0];
    this.setState({ selectedFile: file });
  };
  handleUpload=()=>{
    var data = new FormData()
    data.append('data',this.state.selectedFile)
    axios.post("http://localhost:5000/upload",data)
    .then((res)=>{
      alert("File uploaded Successfuly")
      window.location.href = "localhost:3000/posts"
      console.log(res.data)
    })
    
}
  render() {
    return (
      <div>
        <input type="file" onChange={this.handleFileChange} /><br/>
        <Button  onClick = {this.handleUpload} variant="contained" color="primary" component="span">
          Submit
        </Button>
        <br/>
        <a href = "/posts"> View Posts </a>
      </div>
    );
  }
}
