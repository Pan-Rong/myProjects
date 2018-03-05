import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import Books from './Books' //导入新建的book组件

class Bookshelfs extends Component{
    
    render(){
        const { bookshelfs,chooseShelf } = this.props
        var classes = [ [],[],[]]; // 三个空数组的顺序依次是Current Reading，Want To Read，Read
        var titles = ["Current Reading","Want To Read","Read"];

        bookshelfs.map(( bookshelf ) => {
            if(bookshelf.shelf === "currentlyReading"){
                classes[0].push(bookshelf);
            }else if(bookshelf.shelf === "wantToRead") {
                classes[1].push(bookshelf);;
            }else if(bookshelf.shelf === "read" ) {
                classes[2].push(bookshelf);
            }         
        })
        var items = [];//用于存放书架信息
        for(var index in classes){
            var temp = 
                <div className="bookshelf" key={index} >
                    <h2 className="bookshelf-title">{titles[index]}</h2>
                    <div className="bookshelf-books">
                        <Books  shelf= {classes[index]} selectedShelf={ chooseShelf}/> 
                    </div>
                </div>
            items.push(temp);
        }
        return (
            <div>
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        {items}
                    </div>
                    <div className="open-search">
                        <Link to ="/search" >Add a book</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Bookshelfs 