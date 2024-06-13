import React from 'react';
import TableRow from './TableRow';

const TableBody = ({ data }) => (
    <tbody>
    {data.map((row, index) => (
        <TableRow key={index} row={row} />
    ))}
    </tbody>
);

export default TableBody;
