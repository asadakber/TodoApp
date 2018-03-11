import React, { Component } from 'react';
import * as firebase from 'firebase';
import '../Css/todo.css';

class Todo extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const rootRef = firebase.database().ref();
        const childRef = rootRef.child('data');
        let arrData = [];
        childRef.on('value', snap => {
            arrData = [];
            snap.forEach(ev => {
                let obj = ev.val();
                obj.id = ev.key;
                arrData.push(obj)
                this.setState({data:arrData});
            });
        });
    }

    addItem() {
        if(this.refs.item.value !== "") {
            let fireData = {
                name: this.refs.item.value,
                isTrue: false
            }
            const rootRef = firebase.database().ref();
            rootRef.child('data').push(fireData)
            this.refs.item.value = "";
        } else {
            console.log('Enter Item');
        }
    }

    deleteItem(key) {
        const rootRef = firebase.database().ref();
        if(this.state.data.length == 1) {
            rootRef.child(`data/${this.state.data[key].id}`).remove();
            this.setState({data: []})
        } else {
            rootRef.child(`data/${this.state.data[key].id}`).remove();
        }
    }

    editItem(key) {
        let data = this.state.data;
        data[key].isTrue = true;
        this.setState({data:data});
    }

    cancelEdit(key) {
        let data = this.state.data;
        data[key].isTrue = false;
        this.setState({data:data});
    }
    
    saveItem(key) {
        if(this.refs["edit" + key].value !== ""){
            let item = this.refs["edit" + key].value;
            const rootRef = firebase.database().ref();
            rootRef.child(`data/${this.state.data[key].id}`).set({name:item, isTrue:false});
            this.refs["edit" + key].value = "" ;
        } else {
            console.log("Enter some Item")
        }
    }   

    renderTodo() {
        return(
            <div className="container">
            <div className="row justify-content-md-center">
            <div className="col-md-4">
            <div>
            <div>
                <h2>Todo App</h2>
                <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" type="text" placeholder="Title" ref="item" />
                <button className="btn btn-primary" onClick={this.addItem.bind(this)}>Add Todo</button>
            </div>
        
            <ul className = "App-intro">
            {this.state.data.map((val, index) => {
                return <li key = {index}>{val.name}
                   <button className = " btn btn-primary edit" onClick={this.editItem.bind(this,index)}>EditTodo
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                   </button>
                   <button className = "btn btn-primary close" onClick={this.deleteItem.bind(this,index)}>DeleteTodo</button>   
                   <br/>
                      {this.state.data[index].isTrue ? (
                        [<div className = "row">
                            <div className = "col-6 col-md-6">
                              <input type="text" className="form-control input" placeholder="Enter text..." ref = {"edit" +index} />
                              <button className = " btn btn-primary save" onClick = {this.saveItem.bind(this,index)} ><i className="fa fa-floppy-o" aria-hidden="true"></i>SaveTodo</button>
                              <button className = " btn btn-primary edit-close" onClick={this.cancelEdit.bind(this,index)}><i className="fa fa-times" aria-hidden="true"></i>CancelTodo</button>                         
                            </div>
                        </div>
                        ]
                      ) : (
                        <button className = "btn btn-primary edit" onClick={this.editItem.bind(this,index)}> EditTodo
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                      )}             
                </li>
              })
            }
  </ul>

  </div>
            </div>
            </div>
            </div>
        );
    }

    render() {
        return(
            <div>
                {this.renderTodo()}
            </div>
        );
    }
}

export default Todo;