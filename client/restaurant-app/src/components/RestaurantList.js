import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
    Link
  } from 'react-router-dom';
class RestaurantList extends Component {
    constructor() {
        super();
        this.state = {
            list: null,
        }
    }
    componentDidMount() {
        this.getData()
    }
    getData()
    {
        fetch("/posts").then((response) => {
            response.json().then((result) => {
                //console.log(result);
                this.setState({ list: result })
            })
        })
    }
    delete(id)
    {
        fetch('/posts/'+id,{
            method:"DELETE",
            //headers: {
                //'Content-type': 'application/json'
            //},
        }).then((result)=>{
            result.json().then((resp)=>{
                alert("Data Deleted Succesfully");
                this.getData();
            })
        })
    }
    render() {
        //console.log(this.state);
        var num = 1;
        return (
            <div>
                <h1>RestaurantList</h1>
                {
                    this.state.list ?
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Sno.</th>
                                        <th>Name</th>
                                        <th>Title</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.list.map((item, i) =>
                                            <tr>
                                                <td>{num++}</td>
                                                <td>{item.title}</td>
                                                <td>{item.content}</td>
                                                <td><Link to={"/update/"+item._id}><FontAwesomeIcon icon={faEdit} color="orange" /></Link> &nbsp;
                                                <span onClick={()=>this.delete(item._id)} ><FontAwesomeIcon icon={faTrash} color="red" /></span>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </div>
                        : <p>Please wait...</p>

                }
            </div>
        );
    }
}

export default RestaurantList;