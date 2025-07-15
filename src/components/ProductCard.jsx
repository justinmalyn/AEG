import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        const itemToAdd = {
            ...product,
            variant: selectedVariant
        };
        dispatch(addCart(itemToAdd));
        toast.success('Added to cart');
    };

    // For fakestoreapi products, we'll assume they're in stock unless explicitly set to out of stock
    const isOutOfStock = product.stock === 0;

    return (
        <div className="card h-100 product-card shadow-sm">
            <div className="position-relative">
                <img
                    src={product.image || product.images?.[0]?.url}
                    className="card-img-top p-3"
                    alt={product.title || product.name}
                    style={{
                        height: '200px',
                        objectFit: 'contain'
                    }}
                />
                {isOutOfStock && (
                    <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-danger">Out of Stock</span>
                    </div>
                )}
            </div>

            <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate mb-1">
                    {product.title || product.name}
                </h5>

                <div className="mb-2">
                    <span className="h5 text-primary mb-0">
                        ${product.price?.toString() || '0'}
                    </span>
                    {product.cuttedPrice && (
                        <small className="text-muted text-decoration-line-through ms-2">
                            ${product.cuttedPrice}
                        </small>
                    )}
                </div>

                {product.variants && product.variants.length > 0 && (
                    <select
                        className="form-select mb-3"
                        value={selectedVariant}
                        onChange={(e) => setSelectedVariant(e.target.value)}
                        disabled={isOutOfStock}
                    >
                        {product.variants.map((variant, index) => (
                            <option key={index} value={variant}>
                                {variant}
                            </option>
                        ))}
                    </select>
                )}

                <div className="mt-auto d-flex gap-2">
                    <Link
                        to={`/product/${product.id}`}
                        className="btn btn-outline-primary flex-grow-1"
                    >
                        View Details
                    </Link>
                    <button
                        className={`btn ${isOutOfStock ? 'btn-secondary' : 'btn-primary'} flex-grow-1`}
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                    >
                        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard; 