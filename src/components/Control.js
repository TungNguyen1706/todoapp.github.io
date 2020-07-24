import React, { Component } from 'react';


import Search from './Search';
import Sort from './Sort';

class Control extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
        <div>
            <div className="row mt-3">
                <Search 
                  onSearch={this.props.onSearch}
                 
                />
                {/* end Search */}
                    
                <Sort 
                    onSort  ={this.props.onSort}
                    sortBy  ={this.props.sortBy} 
                    sortValue  ={this.props.sortValue} 
                />
                    {/* end Sort */}  
            </div>
            {/* end row */}
        </div>
        
         
    );
  }
}

export default Control;
