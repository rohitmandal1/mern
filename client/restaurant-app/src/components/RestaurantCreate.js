import React, { Component } from 'react';

class RestaurantCreate extends Component {
    constructor()
    {
        super();
        this.state= {
            title:null,
            content:null
        }
    }
    create()
    {
        console.log(this.state);
        fetch("/posts/send",{
            method:"Post",
            headers: {
                'Content-type': 'application/json'
            },
            body:JSON.stringify(this.state)
        }).then((result)=>{
            //console.log(result);
            result.json().then((resp)=>{
                //console.log(resp);
                alert("Data Added Succesfully");
            })
        })
    }
    render() {
        return (
            <div>
                <h1>RestaurantCreate</h1>
                <div>
                    <input onChange={(event)=>{this.setState({title:event.target.value})}} placeholder="Add Title" /><br/><br/>
                    <input onChange={(event)=>{this.setState({content:event.target.value})}} placeholder="Add Content" /><br/><br/>
                    <button onClick={()=>{this.create()}}>Add Resturant</button>
                </div>
            </div>
        );
    }
}

export default RestaurantCreate;