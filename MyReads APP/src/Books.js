import React,{Component} from 'react'

class Books extends Component {
        
    render() {
        var temp,that = this;
        return (
            <ol className="books-grid">
            {
                this.props.shelf.map(function(book) {
                    //显示每本书的信息,并判断是否每本书的封面都存在 
                    book.imageLinks ? temp = book.imageLinks.thumbnail : temp = "replacePicture.jpg";
                temp =
                    <li key= {book.id}>
                    <div className="book">
                       <div className="book-top">
                           <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url( " + temp + " )"}}></div>
                           <div className="book-shelf-changer">
                               <select defaultValue= {book.shelf||"none"} onChange={(event) => that.props.selectedShelf(book,event.target.value)}>
                                   <option value="none" disabled>Move to...</option>
                                   <option value="currentlyReading">Currently Reading</option>
                                   <option value="wantToRead">Want to Read</option>
                                   <option value="read">Read</option>
                                   <option value="none">None</option>
                               </select>
                           </div>
                       </div>
                       <div className="book-title">{book.title}</div>
                       <div className="book-authors">{book.authors}</div> 
                    </div>
                   </li>;
                    return temp;
                })
            }
           </ol>
        )
    }
}
//, backgroundImage: "url("+book.imageLinks.thumbnail+")"
export default Books