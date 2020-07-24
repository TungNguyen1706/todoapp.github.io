import React, { Component } from 'react';



class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
        keyword : ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }
  onChange(event){
      let target = event.target;
      let name   = target.name;
      let value  = target.value;

      this.setState({
          [name] : value
      });
  }
  onSearch(){
      this.props.onSearch(this.state.keyword);
  }

  render(){
    return (
        <div className="col-8">
        <div className="input-group mb-3">
          <input value={this.state.keyword} onChange={this.onChange} name=
          "keyword" type="text" className="form-control" placeholder="Nhập từ khóa..." />
          <div className="input-group-append">
            <button onClick={this.onSearch} className="btn btn-info" type="button" id="button-addon2"><i className="icofont-search-1"></i></button>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
