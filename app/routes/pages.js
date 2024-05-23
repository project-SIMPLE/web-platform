const data = require("../data/integer_memory_store.js")

class Pages {
  constructor(express, next) {
    this.express = express
    this.next = next
  }

  init() {
    this.initCustomPages()
    this.initDefaultPages()
  }

  initCustomPages() {
    /* With a monolith api+frontend, it's possible to serve pages with preloaded data */
    this.express.get('/preload_data', (req, res) => {
      res.pageParams = {
        value: data.value
      }
      return this.next.render(req, res, `/preload_data`)
    })

    // ROUTES FOR THE MIDDLEWARE PAGES
    this.express.get('/monitor', (req, res) => {
      return this.next.render(req, res, '/monitor', req.query)
    })


    // ROUTES FOR THE MIDDLEWARE PAGES
    this.express.get('/monitor', (req, res) => {
      return this.next.render(req, res, '/monitor', req.query)
    })

    // ROUTES FOR THE PLAYERS PAGES
    this.express.get('/player', (req, res) => {
      return this.next.render(req, res, '/player', req.query)
    })

     // ROUTES FOR THE PLAYERS PAGES
     this.express.get('/waiting_room_of_players', (req, res) => {
      return this.next.render(req, res, '/waiting_room_of_players', req.query)
    })

   // -------------------------------------------------------------------
    /* Special-purpose routing example */
    this.express.get('/large_or_small/:special_value', (req, res) => {
      const intValue = parseInt(req.params.special_value)
      if(isNaN(intValue)) {
        return this.next.render(req, res, `/invalid_value`, req.query)
      }
      if(intValue < 5) {
        return this.next.render(req, res, `/special_small`, req.query)
      } else {
        return this.next.render(req, res, `/special_large`, req.query)
      }
    })
  }

  initDefaultPages() {
    this.express.get('/', (req, res) => {
      return this.next.render(req, res, `/main`, req.query)
    })

    this.express.get('*', (req, res) => {
      return this.next.render(req, res, `${req.path}`, req.query)
    })
  }
}

module.exports = Pages
