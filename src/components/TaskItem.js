import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class TaskList extends Component {
    constructor(props){
        super(props);

        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
      }

    onChangeStatus(){
        this.props.onChangeStatus(this.props.task.id)
    }
    onDelete(){
        this.props.onDelete(this.props.task.id)
    }
    onUpdate(){
        this.props.onUpdate(this.props.task.id)
    }
    
    submit = () => {
        confirmAlert({
          title: 'XÁC NHẬN !!!',
          message: 'Bạn có chắn chắn muốn xóa?',
          buttons: [
            {
              label: 'Có',
              onClick: this.onDelete 
            },
            {
              label: 'Không',
            }
          ]
        });
      };
    
    render(){
    
        let {task,index}= this.props;

    return (
        
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{task.name}</td>
            <td>
            <span 
                className= {task.status===true?'badge badge-success badge-focus':'badge badge-danger badge-focus'}
                onDoubleClick = {this.onChangeStatus}
            >
               {task.status===true?'Kích hoạt':'Ẩn'}
            </span>
            </td>
            <td>
            <button onClick={this.onUpdate} type="button" className="btn btn-dark btn-sm mr-1"><i className="icofont-ui-edit "></i></button>
            <button onClick={this.submit} type="button" className="btn btn-outline-dark btn-sm" ><i className="icofont-ui-delete"></i></button>
     
        
            </td>
        </tr>
                    
    );
  }
};

export default TaskList;






