
const router = require("express").Router();
const fs = require('fs');
const bcrypt = require('bcryptjs');
const {check, validationResult}= require('express-validator');
var bodyParser = require('body-parser');

const customer = require('./../models/customer');

app.use(bodyParser.json());