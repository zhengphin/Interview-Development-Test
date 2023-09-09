import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Customers.css';
import Pagination from '../Pagination/Pagination';
import { API_BASE_URL } from '../../../config.js';


export default function Customers({ selectedNode }) {
    const [customersData, setCustomersData] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5; 

    useEffect(() => {
        const fetchData = async () => {
          try {
            let response = await axios.get(`${API_BASE_URL}/customers`);
            let filteredData = response.data;
            
            if (selectedNode) {
                filteredData = response.data.filter((customer) => {
                  if (selectedNode.type === 'country') {
                    return customer.country.countryId === selectedNode.id;
                  } else if (selectedNode.type === 'state') {
                    return customer.state.stateId === selectedNode.id;
                  } else if (selectedNode.type === 'city') {
                    return customer.city.cityId === selectedNode.id;
                  }
                  return false; 
                });
              }
              
            // Update the state with the filtered data
            setCustomersData(filteredData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, [selectedNode]);
      

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the data array to show only the items for the current page
    const currentItems = customersData.slice(startIndex, endIndex);

    const handleViewCustomer = (id) => {
        const foundCustomer = customersData.find((customer) => customer.customerId === id);
        if (foundCustomer) {
            setSelectedCustomer(foundCustomer);
            setShowModal(true);
        } else {
            alert(`Customer with ID ${id} not found`);
        }
    };

    const handleEditCustomer = (id) => {
        alert(`Edit customer with ID: ${id}`);
    };

    const handleDeleteCustomer = (id) => {
        const updatedCustomers = customersData.filter((customer) => customer.customerId !== id);
        setCustomersData(updatedCustomers);
    };

    return (
        <div className="m-4" style={{ marginLeft: '20px' }}>
            <div className="table-wrapper" style={{ width: '950px' }}>
                <table className="table table-bordered">
                    <caption><h3>Customer Details</h3></caption>
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Pin Code</th>
                            <th>Country</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((customer, index) => (
                            <tr key={customer.customerId}>
                                <td>{startIndex + index + 1}</td>
                                <td>{customer.name}</td>
                                <td>{customer.address}</td>
                                <td>{customer.city.name}</td>
                                <td>{customer.pinCode}</td>
                                <td>{customer.country.name}</td>
                                <td>
                                    <a href="#" className="view" title="View" data-toggle="tooltip" onClick={() => handleViewCustomer(customer.customerId)}>
                                        <i className="material-icons view-icon">&#xE417;</i>
                                    </a>
                                    <a href="#" className="edit" title="Edit" data-toggle="tooltip" onClick={() => handleEditCustomer(customer.customerId)}>
                                        <i className="material-icons edit-icon">&#xE254;</i>
                                    </a>
                                    <a href="#" className="delete" title="Delete" data-toggle="tooltip" onClick={() => handleDeleteCustomer(customer.customerId)}>
                                        <i className="material-icons trash-icon">&#xE872;</i>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={customersData.length}
                onPageChange={(newPage) => setCurrentPage(newPage)}
            />

            {/* Bootstrap Modal */}
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Customer Details</h5>
                            <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Render customer details  */}
                            {selectedCustomer && (
                                <>
                                    <p>Customer ID: {selectedCustomer.customerId}</p>
                                    <p>Name: {selectedCustomer.name}</p>
                                    <p>Address: {selectedCustomer.address}</p>
                                    <p>City: {selectedCustomer.city.name}</p>
                                    <p>Pin Code: {selectedCustomer.pinCode}</p>
                                    <p>Country: {selectedCustomer.country.name}</p>
                                </>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
