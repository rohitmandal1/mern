import React, { Component } from 'react';

class RestaurantSearch extends Component {
    constructor()
    {
        super();
        this.state={
            searchData:null,
            noData: false,
        }
    }
    search(key)
    {
        console.log(key)
        fetch('/posts?q=' + key).then((data)=>{
            data.json().then((resp)=>{
                console.log("resp",resp);
                if(resp.length>0){
                    this.setState({searchData:resp,noData:false})
                    console.log("1")
                }
                else{
                    this.setState({noData:true,searchData:null})
                    console.log("2")
                }
                
            })
        })
    }
    render() {
        return (
            <div>
                <h1>RestaurantSearch</h1>
                <input type="text" onChange={(event)=>this.search(event.target.value)} />
                <div>
                    {
                        this.state.searchData?
                        <div>
                            {
                                this.state.searchData.map((item)=>
                            <div className="search-row">{item.title}</div>
                                )
                            }
                        </div>
                        :""
                    }
                    {
                        this.state.noData?<h3>No Data Found</h3>:null
                    }
                </div>
            </div>
        );
    }
}

export default RestaurantSearch;