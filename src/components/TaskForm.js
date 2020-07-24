import React, { Component } from 'react';


class TaskForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            id   :'',
            name : '',
            status: false,
        };
        
        this.closeForm = this.closeForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClear = this.onClear.bind(this);
      }
      UNSAFE_componentWillMount(){
        let {taskEditting} = this.props;
          if(taskEditting){
              this.setState({
                  id : taskEditting.id,
                  name  : taskEditting.name,
                  status : taskEditting.status
              })
          }
      }
      componentWillReceiveProps(nextProps){
        let {taskEditting} = this.props;
          if(nextProps && nextProps.taskEditting){  
              this.setState({
                id : nextProps.taskEditting.id,
                name  : nextProps.taskEditting.name,
                status : nextProps.taskEditting.status
              })
          }else if(!nextProps.taskEditting){
            this.setState({
                id   :'',
                name : '',
                status: false,
              })
          }
      }
      closeForm (){
        this.props.onCloseForm() 
      }
      onChange(event){
        let target = event.target;
        let value = target.value;
        let name = target.name;

        //ep kieu
        if( name === "status" ){
             value = target.value === 'true' ? true : false
        };
        this.setState({
            [name]: value
        });
      }
      onSubmit(event){  
        event.preventDefault();
        // this.props.onSubmit(this.state.name,this.state.status==='true'?true:false)
        this.props.onSubmit(this.state);
        this.onClear();
        this.closeForm();


      }
      onClear(){
        this.setState({
            name : '',
            status: false,
        })
      }


  render(){
    let {id} = this.state;

    return (
        <div className="card">
            <div className="card-header bg-warning text-danger">
                {id===''?'Thêm công việc':'Cập nhật'}
                <button type="button" className="close text-right" aria-label="Close">
                    <span onClick={this.closeForm} aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="card-body">
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Tên : </label>
                    <input value={this.state.name} onChange={this.onChange} className="form-control" name="name"/>
                </div>
                <div className="form-group">
                    <label>Trạng thái : </label>
                    <select value={this.state.status} onChange={this.onChange} className="form-control" name="status">
                    <option value={true} >Kích Hoạt</option>
                    <option value={false}>Ẩn</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-danger">Thêm</button>
                <button onClick={this.onClear} type="button" className="btn btn-warning">Hủy bỏ</button>
                </form>
            </div>
        </div>
    );
  }
};

export default TaskForm;
