import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import data from "../data";
import axios from 'axios'

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "userId",
    headerName: "User ID",
    width: 150,
    editable: true
  },
  {
    field: "title",
    headerName: "Title",
    width: 150,
    editable: true
  },
  {
    field: "body",
    headerName: "Body",
    type: "number",
    width: 110,
    editable: true
  }
];

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: null,
      loadStatus : false,
    };
  }
  
  componentDidMount(){
    var config = {
      method: 'get',
      url: 'http://localhost:5000/posts',
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      this.setState({res:response.data,loadStatus:true})
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          // rowsPerPageOptions={[5, 10, 20, 50]}
        />
        <a href = "/fileupload"> Upload File </a>
      </div>
    );
  }
  
}

