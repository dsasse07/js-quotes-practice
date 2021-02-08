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
  
  config = {
    "method":"POST",
    "header": {
      "Content-Type":"application/json",
    },
    "body": JSON.stringify(formData)
  }
  console.log(config)
  fetch(quotesUrl, config)
  .then( r => r.json() )
  .then( quote => {console.log(quote)})

  e.target.reset()
}

newForm.addEventListener('submit', postQuote)