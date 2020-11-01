import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    get all the products
// @access  Public
// @route   GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  // throw new Error("Testing Error");
  res.json(products);
});

// @desc    get product by id
// @access  Public
// @route   GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    create a product
// @access  Private/Admin
// @route   POST /api/products/
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, brand, category, countInStock } = req.body;
  const image = req.body.image || "/images/sample.jpg";

  const newProduct = await Product.create({
    name,
    description,
    price,
    image,
    brand,
    category,
    countInStock,
    user: req.user._id,
  });

  if (newProduct) {
    res.status(201);
    res.json({
      _id: newProduct._id,
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      image: newProduct.image,
      brand: newProduct.brand,
      category: newProduct.category,
      countInStock: newProduct.countInStock,
      user: newProduct.user,
    });
  } else {
    res.status(400);
    throw new Error("Invalid product data");
  }
});

// @desc    update a product
// @access  Private/Admin
// @route   PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  const { name, description, price, brand, category, countInStock } = req.body;
  const image = req.body.image || "/images/sample.jpg";

  if (product) {
    product.name = name;
    product.description = description;
    product.price = price;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.image = image;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

// @desc    update a product
// @access  Private
// @route   PUT /api/products/:id/reviews
const addProductReview = asyncHandler(async (req, res) => {
  const { comments, rating } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const review = {
      name: req.user.name,
      comments: comments,
      rating: Number(rating),
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    delete a product
// @access  Private/Admin
// @route   DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed." });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  addProductReview,
};
