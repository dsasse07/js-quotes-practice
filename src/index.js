const quoteList = document.querySelector('#quote-list')
const newForm = document.querySelector("#new-quote-form")
const getUrl = "http://localhost:3000/quotes?_embed=likes"
const quotesUrl = "http://localhost:3000/quotes"
const fetchAllQuotes = _ => {
  fetch(getUrl)
  .then( r => r.json() )
  .then(quotesArray => {
    for (quote of quotesArray) {
      renderQuote(quote)
    }
  })
}

const renderQuote = quote => {
    let card = document.createElement("li")
    card.dataset.id = quote.id

    let blockQuote = document.createElement("blockquote")
    blockQuote.className = "blockquote"

    let text = document.createElement("p")
    text.className = "mb-0"
    text.textContent = quote.quote

    let author = document.createElement("footer")
    author.className = "blockquote-footer"
    author.textContent = quote.author

    let br = document.createElement("br")

    let likeButton = document.createElement("button")
    likeButton.className = "btn-success"
    likeButton.textContent = "Likes: "

    let likesNum = document.createElement("span")
    likesNum.textContent = quote.likes ? quote.likes.length : 0

    let deleteButton = document.createElement("button")
    deleteButton.className = "btn-danger"
    deleteButton.textContent = "Delete"

    likeButton.append(likesNum)
    blockQuote.append(text, author, br, likeButton, deleteButton)
    card.append(blockQuote)
    quoteList.append(card)
}

fetchAllQuotes()

const postQuote = e => {
  e.preventDefault()

    let formData = {
      "quote": e.target[0].value,
      "author": e.target[1].value
    }

  let config = {
    method:"POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(formData)
  }
  console.log(config)
  fetch(quotesUrl, config)
  .then( r => r.json() )
  .then( quote => renderQuote(quote))

  e.target.reset()
}

const deleteQuote = quote => {

  fetch(quotesUrl+`/${quote.dataset.id}`, {method:"DELETE"})
  .then( r => quote.remove() )
}

const addLike = quote => {
  let likes = quote.querySelector("span")
  likes.textContent =  parseInt(likes.textContent) + 1

  let data = {
    quoteId: parseInt(quote.dataset.id),
    createdAt: Date.now()
  }

  let config = {
    method: "POST",
    headers: {
      "Content-type":"application/json"
    },
    body: JSON.stringify(data)
  }
fetch('http://localhost:3000/likes', config)
.then( r => console.log( r.json() ) )
// .then ( console.log ("yayy"))

}


const handleClicks = e => {
  switch (true){
    case (e.target.className === "btn-danger"):
      deleteQuote(e.target.closest("li"))
      break
    case (e.target.className === "btn-success"):
      addLike(e.target.closest("li"))
      break
  }
}



newForm.addEventListener('submit', postQuote)
quoteList.addEventListener('click', handleClicks)