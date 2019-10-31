'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API: '"http://localhost:3000"',
  API: '"https://thef2e-chatroom.herokuapp.com"',
})
