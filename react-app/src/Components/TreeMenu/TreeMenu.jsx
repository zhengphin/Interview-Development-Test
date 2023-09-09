import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TreeMenu.css'; 
import { API_BASE_URL } from '../../../config.js';

export default function TreeMenu({onSelectNode}) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/countries`)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []); 

  const getTreeData = () => {
    const treeData = countries.map((country) => ({
      text: country.name,
      countryId: country.countryId,
      type:'country',
      nodes: country.states.map((state) => ({
        text: state.name,
        type:'state',
        stateId: state.stateId,
        nodes: state.cities.map((city) => ({
          text: city.name,
          cityId: city.cityId,
          type:'city',
        })),
      })),
    }));
  
    return treeData;
  };
  
  const handleNodeSelected = (event, node) => {
    // Initialize nodeId as null
    let nodeId = null;
  
    if (node.type === 'country') {
      nodeId = node.countryId;
    } else if (node.type === 'state') {
      nodeId = node.stateId;
    } else if (node.type === 'city') {
      nodeId = node.cityId;
    }
    // Call the onSelectNode callback with the updated selectedNode
    onSelectNode({
        type: node.type,
        id: nodeId,
    });
  };
  

  // useEffect to initialize the treeview plugin once countries data is available
  useEffect(() => {
    if (countries.length > 0) {
      $('#tree').treeview({
        data: getTreeData(),
        onNodeSelected: handleNodeSelected // Attach the event handler
    });
    }
  }, [countries]);

  return   (
  <div className='TreeMenu'>
  <div id="tree"></div>
  </div>
  );
}
