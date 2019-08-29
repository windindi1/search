import React from 'react';
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux'
import {updateSearchData} from './redux/actions';
import {Table , Dropdown, Pagination} from './components'
import Button from 'react-bootstrap/Button';

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      query : '',
      selection: 'first_name',
      pageCount : 0,
      currentPage : 1,
    }
  }

  selectionMap = {
    first_name: 'First Name',
    last_name: 'Last Name',
    phone: 'Phone',
    email: 'Email'
  }

  handleInputChange = () => {
    this.setState({...this.state, query: this.search.value})
  }

  fetchData = async () => {
    const response =
      await axios.get("https://gorest.co.in/public-api/users",
          { params: {[this.state.selection]: this.state.query, page: this.state.currentPage},
          headers: {'Authorization': "Bearer UMbMtaQZUXjQTPYnFFdtXFcu_TAge23B2rVp"}
        },
      )
    console.log(response.data._meta)
    this.state.pageCount = response.data._meta.pageCount;
    this.props.dispatch(updateSearchData(response.data));
  }

  btnSearchPressed = async (e) => {
    e.preventDefault();
    // console.log('Pressed');
    this.fetchData();
  }

  btnDropdownPressed = (selection) => {
    let element = selection.substring(2,selection.length);
    console.log(this.search);
    this.setState({...this.state, selection: element, query: ''});
    this.search.value = '';
  }

  btnPageChange = (e) => {
    const text = e.target;
    // console.log('Page changed', text);
    let temp = this.state;
    
    switch (text) {
      case 'Next':
          temp.currentPage += 1;
        break;
      case 'Last':
          temp.currentPage = temp.pageCount;
        break;
      case 'Previous':
          temp.currentPage -= 1;
        break;
      case 'First':
          temp.currentPage = 1;
        break;
      default:
        temp.currentPage = Number(text);
        break;
  }
  this.setState(temp);
  this.fetchData();
  }

  responseBasedRender = () => {
    if (this.props.searchData === null ) {
      return null;
    } else if(this.props.searchData.data._meta.code === 200) {
      if (this.props.searchData.data.result.length > 0) {
        return (<div>
          {this.state.pageCount > 1 ? <Pagination 
            pageCount={this.state.pageCount} 
            currentPage={this.state.currentPage}
            onPageChange={this.btnPageChange}
          ></Pagination> : null}
          <Table searchResult={this.props.searchData.data.result}></Table>
          {this.state.pageCount > 1 ? <Pagination 
            pageCount={this.state.pageCount} 
            currentPage={this.state.currentPage}
            onPageChange={this.btnPageChange}
          ></Pagination> : null}
        </div>)
      } else {
        return (<p>User not found</p>)
      }
    } else {
      return (<p>{this.props.searchData.data._meta.message}</p>)
    }
  }

  render() {
    // console.log('Store is ', this.props.searchData)
    return (
    <div className="App">
      <header className="App-header">
          <input
            placeholder="Search user"
            ref={input => this.search = input}
            onChange={this.handleInputChange}
            className = "Search-element-bar"
          />
          <p className = "Search-element">by</p>
          <Dropdown 
            className = "Search-element" 
            onClick={this.btnDropdownPressed}
            currentSelection = {this.selectionMap[this.state.selection]}
          ></Dropdown>
          <Button variant="primary" onClick={(e) => this.btnSearchPressed(e)} className = "Search-element">Search</Button>
      </header>
      {this.responseBasedRender()}
    </div>
    );
  }
}

const mapStateToProps = state => ({
  searchData: state.searchData,
})

export default connect(
  mapStateToProps,
)(App)
