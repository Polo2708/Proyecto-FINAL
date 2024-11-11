import React from 'react';
import ProductRow from './ProductRow';

const ProductList = ({ products, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Imagen</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <ProductRow
                        key={product.id}
                        product={product}
                        index={index + 1}
                        onEdit={() => onEdit(product)}
                        onDelete={() => onDelete(product.id)}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ProductList;
