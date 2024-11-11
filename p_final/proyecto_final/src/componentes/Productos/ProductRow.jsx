import React from 'react';

const ProductRow = ({ product, index, onEdit, onDelete }) => {
    return (
        <tr>
            <td>{index}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>
                {product.image && <img src={product.image} alt={product.name} style={{ width: "50px" }} />}
            </td>
            <td>
                <button onClick={onEdit} className="btn btn-edit">✏️</button>
                <button onClick={onDelete} className="btn btn-delete">🗑️</button>
            </td>
        </tr>
    );
};


export default ProductRow;