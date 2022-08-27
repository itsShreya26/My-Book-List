let form = document.querySelector("#book-form")
// console.log(form)
let tbody = document.querySelector("#book-list")

window.addEventListener("load",showBook)



form.addEventListener("submit",(e)=>{
    e.preventDefault()
   let title = document.getElementById("title").value 
   let author= document.querySelector("#author").value 
   let isbn = document.querySelector("#isbn").value
   if(title == ""|| author == "" || isbn == "")
   {
    showAlert("Fill all the details","warning")
    return;
   } 
   addBookToList(title,author,isbn) //for showing in the table
   addBookToStore(title,author,isbn) //for inserting the data in local storage
   showAlert("Book Added","success")
})


tbody.addEventListener("click",function(e){
   deleteBook(e)
})



function addBookToList(title,author,isbn){
    let tablebody = document.querySelector("#book-list")
    // console.log(tablebody)
    let tr = document.createElement("tr");
    tr.innerHTML=`
    <td>${title}</td>
    <td>${author}</td>
    <td>${isbn}</td>
    <td><a href="#" class="btn btn-danger btn-right delete">Delete</a></td>
    `

    tablebody.appendChild(tr)
    clearFields()
    // alert("Book Added Successfully")
  
}

function clearFields(){
    document.querySelector("#title").value=''
    document.querySelector("#author").value=''
    document.querySelector("#isbn").value=''
}

function deleteBook(e){
   if(e.target.classList.contains("delete")){
    tbody.removeChild(e.target.parentElement.parentElement)
//    alert("Book Deleted Successfully")  
showAlert("Book Deleted","danger") 


}
}

function showAlert(msg,className){
    const div = document.createElement("div")
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    // vanish in 3 sec
setTimeout(function (){
    document.querySelector('.alert').remove();
},3000
)   
}

function addBookToStore(title,author,isbn){
  
  let book = {title,author,isbn}
  let prevArray = getBooktoStore()
  if(prevArray == null){
    prevArray = []
    // localStorage.setItem("book",JSON.stringify(prevArray))
  }

//   if(prevArray.length!=0){
    prevArray.push(book)
    localStorage.setItem("book",JSON.stringify(prevArray))
//   }

   

}



function getBooktoStore(){
    let books = JSON.parse(localStorage.getItem("book"))
    return books
}

function showBook(){
    let allBooks = getBooktoStore()
    console.log("Array",allBooks)
    allBooks.forEach(function(book,idx){
       addBookToList(book.title,book.author,book.isbn)
    })

}


