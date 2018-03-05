import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import { Throttle } from 'react-throttle';
import * as BooksAPI from './BooksAPI'
import Books from './Books' //导入新建的book组件

class Search extends Component{
    state = {
        searchBooks: []  
    }
    //用于查询图书信息
    updateQuery = (query)=>{
           if(query) {
            BooksAPI.search(query).then((books) => {
                if(!books.error){//
                    //判断图书是否已经存在书架
                    var currentShelfs = this.props.bookshelfs;
                    for(var book of books) {//搜索到的书
                        for(var currentShelf of currentShelfs) {//原来书架上的书
                            if( book.id === currentShelf.id){
                                book.shelf = currentShelf.shelf
                            }
                        }
                    }
                    console.log(books);
                    this.setState({searchBooks: books})
                }
            }); 
         }
   }
    render(){
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search" >Close</Link>
                    <div className="serch-books-input-wrapper">
                        <Throttle time="500" handler="onChange">
                            <input 
                                type="text" 
                                placeholder="Search by title or author"
                                onChange = {(event)=>this.updateQuery(event.target.value)}
                            />
                        </Throttle>
                    </div>
                </div>
                <div className="search-books-results">
                    <Books shelf={this.state.searchBooks } selectedShelf={this.props.chooseShelf}/>
                </div>
           </div> 
        )}
}
export default Search 
