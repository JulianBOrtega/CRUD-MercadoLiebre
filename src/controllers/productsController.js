const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); //! no seriously wth is this

const controller = {
	//! Root - Show all products
	index: (req, res) => {
		return res.render('products', { products, toThousand });
	},

	//! Detail - Detail from one product
	detail: (req, res) => {
		const product = products.find(p => p.id === +req.params.id);

		return res.render('detail', { product, toThousand });
	},

	//! Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form');
	},
	
	//! Create -  Method to store
	store: (req, res) => {
		const id = products[products.length - 1].id + 1;
		const newProduct = {
			id,
			name: req.body.name.trim(),
			price: +req.body.price,
			discount: +req.body.discount,
			category: req.body.category,
			description: req.body.description.trim(),
			image: req.file.filename
		}
		const newProducts = [...products, newProduct];

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, 3), 'utf-8');

		return res.render('products', { products: newProducts, toThousand });
	},

	//! Update - Form to edit
	edit: (req, res) => {
		const product = products.find(p => p.id === +req.params.id);
		return res.render('product-edit-form', { product });
	},
	//! Update - Method to update
	update: (req, res) => {
		const productIndex = products.findIndex((p) => p.id === +req.params.id);
		products[productIndex] = {
			id: +req.params.id,
			name: req.body.name.trim(),
			price: +req.body.price,
			discount: +req.body.discount,
			category: req.body.category,
			description: req.body.description.trim(),
			image: req.file.filename
		}

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 3), 'utf-8');
		return res.render('products', { products, toThousand });
	},

	//! Delete - Delete one product from DB
	destroy : (req, res) => {
		const productIndex = products.findIndex((p) => p.id === +req.params.id);
        products.splice(productIndex, 1);

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 3), 'utf-8');
		return res.render('products', { products, toThousand });
	}
};

module.exports = controller;