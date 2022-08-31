const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); //! what is this

const controller = {
	index: (req, res) => {
		return res.render('index', { products, toThousand });
	},
	search: (req, res) => {
		return res.render('results', { products, toThousand });
	},
	register: (req, res) =>
	{
		return res.render('register');
	},
	processRegister: (req, res) =>
	{
		let errors = validationResult(req);

		if(errors.isEmpty())
		{
			return res.redirect('/');
		}
		else
		{
			return res.render('register', { errors: errors.mapped(), old: req.body });
		}
	}
};

module.exports = controller;
