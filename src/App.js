import React, { Component } from 'react';
import './App.css';

import Control from './components/Control';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

import { v4 as uuidv4 } from 'uuid';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks        :[],
            isDislayForm : false,
            taskEditting : null,
            filter : {
                name : '',
                status : -1
            },
            keyword : '',
            sortBy : 'name',
            sortValue : 1
             
        }

        this.onDislayForm = this.onDislayForm.bind(this);
        this.onCloseForm = this.onCloseForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.findIndex = this.findIndex.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onSort = this.onSort.bind(this);
    }
    //toggle 
    onDislayForm(){
        let {taskEditting} = this.state;
        if(this.state.isDislayForm && taskEditting !== null){
            this.setState({
                isDislayForm : true,
                taskEditting : null
            })
        }else{
            this.setState({
                isDislayForm : !this.state.isDislayForm,
                taskEditting : null
            })
        }
       
    };
    onCloseForm(){
        this.setState({
            isDislayForm : false
        })
    };
    onShowForm(){
        this.setState({
            isDislayForm : true
        })
    };
    UNSAFE_componentWillMount(){
        if(localStorage && localStorage.getItem('tasks')){
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks : tasks
            });
    
        }
    
    };
    // onGenerateData(){
    //         let tasks = [
    //             {
    //                 id : uuidv4(),
    //                 name: 'Hoc lap trinh',
    //                 status : true
    //             },
    //             {
    //                 id : uuidv4(),
    //                 name: 'Hoc thuat toan',
    //                 status : false
    //             },
    //             {
    //                 id : uuidv4(),
    //                 name: 'Rua chen',
    //                 status : true
    //             }
    //         ]
    //         this.setState({
    //             tasks : tasks
    //         });
    //     localStorage.setItem('tasks',JSON.stringify(tasks));
    // };

    onSubmit(data){
       let {tasks} = this.state;
       if(data.id === ''){
        data.id = uuidv4();
        tasks.push(data);
       }
       else{
           //edit
           let index = this.findIndex(data.id);
           tasks[index] = data;

       }
      
       this.setState({
           tasks : tasks,
           taskEditting : null 
       })

       localStorage.setItem('tasks', JSON.stringify(tasks))

        // console.log(this.state)
    }
    onChangeStatus(id){
     
        let {tasks} = this.state;
        let index = this.findIndex(id);
        if(index !== -1){
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks:tasks
            })
            localStorage.setItem('tasks' , JSON.stringify(tasks))
           
        }
        
    }
    onDelete(id){

        let {tasks} = this.state;
        let index = this.findIndex(id);
        if(index !== -1){
           tasks.splice(index,1);
            this.setState({
                tasks:tasks
            })
            localStorage.setItem('tasks' , JSON.stringify(tasks))
           
        }
        this.onCloseForm();
    }
    onUpdate(id){
        let {tasks} = this.state;
        let index = this.findIndex(id);
        let taskEditting = tasks[index];
        if(index !== -1)
        {
            this.setState({
                taskEditting : taskEditting
            })
            this. onShowForm();
            // console.log(taskEditting)
        }

    }
    findIndex(id){
        let {tasks} = this.state;
        let result = -1;

        tasks.forEach((task,index)=>{
            if(task.id === id){
                // console.log(index)
                return result = index;
                
            }
        })
        return result;
    }
    onFilter(filterName, filterStatus){
        // console.log(filterName , filterStatus)
        filterStatus  = parseInt(filterStatus,10);
        this.setState({
            filter : {
                name : filterName.toLowerCase() , 
                status : filterStatus
            }
        })
    }

    onSearch(keyword){
        this.setState({
            keyword : keyword
        })
    }
    onSort(sortBy , sortValue){
        this.setState({
            sortBy : sortBy,
            sortValue :sortValue
        })
    }

    render(){
    
        let {tasks , 
            isDislayForm, 
            taskEditting, 
            filter, 
            keyword,
            sortBy,
            sortValue
            } = this.state;
        
        if(filter){
            if(filter.name){
                tasks = tasks.filter((task)=>{
                    return task.name.toLowerCase().indexOf(filter.name) !== -1 ;
                })
            }
            tasks = tasks.filter((task)=>{
                if(filter.status === -1 ){
                    return task;
                }
                else {
                    return task.status === (filter.status === 1 ? true : false);
                }
            })
        }
        if(keyword){
            tasks = tasks.filter((task)=>{
                return task.name.toLowerCase().indexOf(keyword) !== -1 ;
            })
        }
        // sort ----------
        if(sortBy === 'name'){
            tasks.sort((a,b)=>{
                if(a.name.toLowerCase()>b.name.toLowerCase()) return sortValue;
                else if (a.name.toLowerCase()<b.name.toLowerCase()) return -sortValue;
                else return 0;
            })
        }else{
            tasks.sort((a,b)=>{
                if(a.status>b.status) return -sortValue;
                else if (a.status<b.status) return sortValue;
                else return 0;
            })
        }
        let  elmTaskForm = isDislayForm 
                    ? <TaskForm 
                            onCloseForm={this.onCloseForm}
                            onSubmit = {this.onSubmit}
                            taskEditting = {taskEditting}
                      /> : '';

    return (

      <div>
          <div className="row">
            <div className= {isDislayForm ? 'col-xs-12 col-md-4': ''} >
              {elmTaskForm}
              
            </div>
            {/* end them cong viec */}
            <div className= {isDislayForm ? 'col-xs-12 col-md-8': 'col-xs-12 col-md-12'}>
              <div className="row ml-1">
                <button onClick={this.onDislayForm} type="button" className={isDislayForm?'btn btn-danger':'btn btn-dark'}>
                    <i className="icofont-ui-add">&nbsp;</i>
                    Thêm công việc
                </button>
                {/* <button onClick={this.onGenerateData} type="button" className="btn btn-danger ml-3">Generate Data</button> */}
              </div>
                < Control
                    onSearch={this.onSearch}
                    onSort  ={this.onSort}
                    sortBy  ={sortBy}
                    sortValue  ={sortValue}
                />
              
                <TaskList 
                    tasks={tasks} 
                    onChangeStatus={this.onChangeStatus}
                    onDelete= {this.onDelete}
                    onUpdate= {this.onUpdate}
                    onFilter ={this.onFilter}
                />
            </div>
            {/* end right */}
          </div>
          {/* end row tong */}
      </div>
    );
  }
}

export default App;
