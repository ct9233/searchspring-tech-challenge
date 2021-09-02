import React from "react";

const Product = ({ product }) => {
    return (
			<div className='product'>
				<div>
					<img
						width='200'
						alt={product.name}
						src={product.thumbnailImageUrl}
						onError={(e) => {
							e.target.src = '/no-image.jpg';
						}}
					/>
				</div>
				<p className="product-name">{product.name}</p>
				<p className="cost">
					<span className="msrp">
						{product.msrp > product.price ? `$${product.msrp}` : null}
					</span>
					<span className="price">${product.price}</span>
				</p>
			</div>
		);
}

export default Product;