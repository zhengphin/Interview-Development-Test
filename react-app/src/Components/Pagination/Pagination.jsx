import React from 'react'
import './Pagination.css';

export default function Pagination({ totalItems, currentPage, itemsPerPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    // Calculate the start and end items for the current page
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="clearfix">
            <div className="hint-text">
                Showing <b>{startItem}-{endItem}</b> out of <b>{totalItems}</b> entries
            </div>
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a href="#" className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                        <i className="fa fa-angle-double-left"></i>
                    </a>
                </li>
                {Array.from({ length: totalPages }, (v, i) => (
                    <li className={`page-item ${i + 1 === currentPage ? 'active' : ''}`} key={i}>
                        <a href="#" className="page-link" onClick={() => handlePageChange(i + 1)}>
                            {i + 1}
                        </a>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a href="#" className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                        <i className="fa fa-angle-double-right"></i>
                    </a>
                </li>
            </ul>
        </div>
    );
}               