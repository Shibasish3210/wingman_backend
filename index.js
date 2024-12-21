import express from "express";
import products from "./data.js"; // Assuming data.js exports the products array

const app = express();
app.use(express.json());

app.get("/products", (req, res) => {
	const { field, order, page = 1, limit = 5 } = req.query;
	let sortedProducts = [...products];

	// Sorting
	sortedProducts.sort((a, b) => {
		if (order === "asc") {
			return a[field] > b[field] ? 1 : -1;
		} else {
			return a[field] < b[field] ? 1 : -1;
		}
	});

	// Pagination
	const startIndex = (page - 1) * limit;
	const paginatedProducts = sortedProducts.slice(
		startIndex,
		startIndex + limit,
	);

	res.json(paginatedProducts);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
