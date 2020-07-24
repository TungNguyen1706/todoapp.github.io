import React, { Component } from 'react';

import TaskItem from './TaskItem';

class TaskList extends Component {
    constructor(props){
        super(props);

        this.state = {
            filterName : '',
            filterStatus: -1 
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(event){
        let target = event.target;
        let name = target.name;
        let value = target.value;
     

        this.setState({
            [name] : value
        });
        this.props.onFilter(
            name === "filterName" ? value : this.state.filterName,
            name === "filterStatus" ? value : this.state.filterStatus
        )

        // console.log(this.state)

    }
    
  render(){
    let {tasks}= this.props;
    let elmTask = tasks.map((task,index)=>{
        return  < TaskItem 
                    key={task.id}
                    index = {index}
                    task = {task}
                    onChangeStatus={this.props.onChangeStatus}
                    onDelete={this.props.onDelete}
                    onUpdate={this.props.onUpdate}
                    
                />
    })
    return (
        <div className="row">
            <div className="col-12">
                <div className="row ml-1">
                    <table className="table table-hover table-striped text-center">
                        <thead className="thead-dark">
                        <tr>
                            <th className="w-10" scope="col">STT</th>
                            <th className="w-45" scope="col">Tên</th>
                            <th className="w-20" scope="col">Trạng thái</th>
                            <th className="w-25" scope="col">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row" />
                            <td><input value={this.state.filterName} onChange={this.onChange} name="filterName" className="form-control" /></td>
                            <td>
                            <select value={this.state.filterStatus} onChange={this.onChange} name="filterStatus" className="form-control">
                                <option value={-1}>Tất Cả</option>
                                <option value={1}>Kích Hoạt</option>
                                <option value={0}>Ẩn</option>
                            </select>
                            </td>
                            <td />
                        </tr>
                           {elmTask}
                       
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
  }
};

export default TaskList;






