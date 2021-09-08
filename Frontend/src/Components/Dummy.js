import React,{Component} from 'react'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'
import axios from 'axios'
import config from '../config';
import { Loading } from 'react-admin';
import InputLabel from '@material-ui/core/InputLabel';
import { push,showNotification } from 'react-router-redux';
class MasterProductCreate extends Component{
    constructor(props){
        super(props);
            this.state = {
                name : '',
                slug : '',
                desc : '',
                brand : '',
                categories : null,
                category : '',
                isService : false,
                loadStatus1 : true,
                loadStatus2 : true,
                loadStatus3 : true,
                loadStatus4 : true,
                clicked : false,
                clicked2 : false,
                selectedFile : null,
                imageUrl : null
            }
           this.handleNameChange = this.handleNameChange.bind(this)
           this.handleSlugChange = this.handleSlugChange.bind(this)
           this.handleDescChange = this.handleDescChange.bind(this)
           this.handleBrandChange = this.handleBrandChange.bind(this)
           this.handleisServiceChange = this.handleisServiceChange.bind(this)
           this.handleSubmit = this.handleSubmit.bind(this)
           this.handleFileChange = this.handleFileChange.bind(this)
           this.handleUpload = this.handleUpload.bind(this)
    }
    componentDidMount(){
        axios.get(`${config.apiUrl}/category/all`)
        .then((response) => {
            console.log(response)
            this.setState({loadStatus2 : false,categories : response.data.info.categories})
        }).catch(err => console.log(err))
    }

handleSubmit(){
        const {push} = this.props
        var category = this.refs.category.value
        this.setState({clicked : true})
        var data = JSON.stringify({"name":`${this.state.name}`,
        "slug":`${this.state.slug}`,
        "description":`${this.state.desc}`,
        "isService":`${this.state.isService}`,
        "brand":`${this.state.brand}`,
        "category":[`${category}`],
        "profileImage":{"name":"profile image",
        "url":`${this.state.imageUrl}`},
        "images":[{"name":"image","url":`${this.state.imageUrl}`}]
    });
    var config = {
        method: 'post',
        url: 'https://secure-mobikode.glolooktest.tk/master/add/product',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
    axios(config)
    .then((response) => {
        this.setState({loadStatus1 : false})
        console.log(JSON.stringify(response.data));
        alert("Submitted Successfully")
        push("/Master%20Product")
    })
    .catch((error) => {
        this.setState({loadStatus1 : false})
        console.log(error);
        alert("Some Error Occured")
    });
}
    handleUpload(){
        this.setState({clicked1 : true})
        var data = new FormData()
        data.append('file',this.state.selectedFile)
        axios.post(`${config.apiUrl}/fileupload/image`,data)
        .then(res => {
            this.setState({imageUrl : res.data.response_data.Location,loadStatus4 : false})
            console.log(this.state.imageUrl)
        }).catch(err => console.log(err))
    }
    handleNameChange(e){
        this.setState({name : e.target.value})
    }
    handleSlugChange(e){
        this.setState({slug : e.target.value})
    }
    handleDescChange(e){
        this.setState({desc : e.target.value})
    }
    handleBrandChange(e){
        this.setState({brand : e.target.value})
    }
    handleisServiceChange(e){
        this.setState({isService : !this.state.isService})
    }
    handleFileChange(e){
        const file = e.target.files[0]
        this.setState({selectedFile : file,loadStatus3:false})
    }
    loading = () => {
        if(this.state.loadStatus1 && this.state.clicked){
            return(
                <Loading/>
            )
        }
    }
    render(){
        var categories = this.state.categories
        if(!this.state.loadStatus2){
            categories = categories.map(function(category){
                return(
                <option value = {category._id}>{category.name}</option>
                )
            })
        }
        if(this.state.loadStatus2){
            return(
                <Loading/>
            )
        }
        else{
            const submitButton = () => {
                if(this.state.clicked1){
                    if(this.state.loadStatus4){
                        return(
                            <div>
                                Please Wait while your image is being uploaded
                            </div>
                        )
                    }
                    else{
                        return(
                            <Button label = "Submit" onClick={this.handleSubmit} color="primary">Submit</Button>            
                        )
                    }
                }
            }
            return(
                <form>
                <div>
                <TextField id="outlined-basic" label="Name" variant="outlined" onChange={this.handleNameChange}/>
                </div>
                <br/>
                <div>
                <TextField id="outlined-basic" label="Slug" variant="outlined" onChange= {this.handleSlugChange} />
                </div>
                <br/>
                <div>
                <TextField id="outlined-basic" label="Description" variant="outlined" multiline onChange = {this.handleDescChange}/>
                </div>
                <br/>
                <div>
                <TextField id="outlined-basic" label="Brand" variant="outlined" onChange={this.handleBrandChange}/>
                </div>
                <br/>
                <div>
                <FormControlLabel value="isService" control={<Switch color="primary"  onChange={this.handleisServiceChange}/>} label="Enable Service" labelPlacement="start"/>
                </div>
                <br/>
                <div>
                    <InputLabel>Add Category</InputLabel>
                    <select ref = "category">
                        {categories}
                    </select>
                </div>
                <br/>
                <div>
                    <InputLabel>Upload Image</InputLabel>
                    <input type = "file" onChange = {this.handleFileChange}/>
                    <br/>
                    <Button label = "Upload" onClick = {this.handleUpload} color = "primary">Upload</Button>
                </div>
                <br/>
                <div>
                    {submitButton()}
                </div>
                {this.loading()}
            </form>
            )
        }
    }
}


MasterProductCreate.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification,
    push,
})(MasterProductCreate);