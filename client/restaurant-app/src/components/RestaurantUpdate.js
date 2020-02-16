import React, { Component } from 'react';

class RestaurantUpdate extends Component {

    constructor()
    {
        super();
        this.state= {
            title:null,
            content:null
        }
    }
    componentDidMount()
    {
        fetch('/posts/'+this.props.match.params.id).then((response) => {
            response.json().then((result) => {
                //console.log(result);
                this.setState({ 
                    title: result.title,
                    content: result.content,
                    id:result._id
                 })
            })
        })
    }
    update()
    {
        fetch("/posts/"+this.state.id,{
            method:"PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body:JSON.stringify(this.state)
        }).then((result)=>{
            result.json().then((resp)=>{
                alert("Data Updeted Succesfully");
            })
        })
    }
    render() {
        return (
            <div>
                <h1>RestaurantUpdate</h1>
                <div>
                    <input onChange={(event) => { this.setState({ title: event.target.value }) }} value={this.state.title} placeholder="Add Title" /><br /><br />
                    <input onChange={(event) => { this.setState({ content: event.target.value }) }} value={this.state.content} placeholder="Add Content" /><br /><br />
                    <button onClick={() => { this.update() }}>Update Resturant</button>
                </div>
            </div>
        );
    }
}

export default RestaurantUpdate;