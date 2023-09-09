import React, { useState, useEffect } from 'react';
import TreeMenu from '../TreeMenu/TreeMenu'
import Customers from '../Customers/Customers'
import './Home.css';

export default function Home() {
    const [selectedNode, setSelectedNode] = useState(null);


    


    return (
        <div className='Home'>
            <TreeMenu onSelectNode={(object) => setSelectedNode(object)} />
            <Customers selectedNode={selectedNode} />
        </div>


    )
}
