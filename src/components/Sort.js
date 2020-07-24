import React, { Component } from 'react';
import { sortBy } from 'lodash';


class Sort extends Component {
  constructor(props){
    super(props);
   
  }

 
  onClick = (sortBy,sortValue) =>{
    this.props.onSort(sortBy,sortValue);
  }

  render(){
    let {sortBy,sortValue} = this.props;
    return (
        <div className="col-4">
            <div className="dropdown">
                <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="icofont-chart-histogram-alt"></i>  Sắp xếp
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a onClick={()=>this.onClick('name',1)} type="button" 
                        className={(sortBy==='name'&&sortValue===1)?'dropdown-item sort-selected':'dropdown-item'}>
                      Từ A-&gt;Z
                    </a>
                    <a  onClick={()=>this.onClick('name',-1)} type="button" 
                        className={(sortBy==='name'&&sortValue===-1)?'dropdown-item sort-selected':'dropdown-item'}> 
                       Từ Z-&gt;A
                    </a>
                    <a  onClick={()=>this.onClick('status',1)}type="button" 
                       className={(sortBy==='status'&&sortValue===1)?'dropdown-item sort-selected':'dropdown-item'} >
                      Trạng thái Kích hoạt
                    </a>
                    <a  onClick={()=>this.onClick('status',-1)} type="button" 
                         className={(sortBy==='status'&&sortValue===-1)?'dropdown-item sort-selected':'dropdown-item'}>
                      Trạng thái Ẩn
                    </a>
                </div>
            </div>
      </div>
    );
  }
}

export default Sort;
