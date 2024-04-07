const express = require('express')
const {open} = require('sqlite')
let path = require('path')
let dbpath = path.join(__dirname, 'goodreads.bd')
let sqlite3 = require('sqlite3')

const app = express()

let db = null

let intializeDBAndServer = async () => {
  try {
    bd = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server is running at http://localhost:3000')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

intializeDBAndServer()

app.get('/books/', async (request, response) => {
  const getBookQuery = `
  SELECT * FROM book ORDER BY book_id`
  const booksArray = await db.all(getBookQuery)
  response.send(booksArray)
})
