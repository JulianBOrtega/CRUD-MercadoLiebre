const fs = require('fs');
const path = require('path');

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
};

module.exports = controller;
