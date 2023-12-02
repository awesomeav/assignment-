import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableCaption
} from '../../components/Table'; // Replace with the actual path to your table component
import { tableData } from '../../data/tableData';
import Button from '../../components/Button';

const TablePage = () => {
  const [data, setData]: any = useState([]);
  const [editedPrices, setEditedPrices]: any = useState({});
  const handleEditPrice = (id: any, value: any) => {
    setEditedPrices((prevPrices: any) => ({ ...prevPrices, [id]: value }));
  };

  const handleSave = () => {
    const newData = data.map((item: any) => ({
      ...item,
      price: editedPrices[item.id] || item.price
    }));

    setData(newData);
    setEditedPrices({});
  };

  const handleReset = () => {
    setEditedPrices({});
  };

  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Category', accessor: 'category' },
    {
      Header: 'Price',
      accessor: 'price',
      Cell: ({ row }: any) => (
        <input
          type="text"
          value={editedPrices[row.original.id] || row.original.price}
          onChange={(e) => handleEditPrice(row.original.id, e.target.value)}
        />
      )
    }
  ];

  useEffect(() => {
    // Use the provided tableData as the initial data
    setData(tableData);
  }, []);

  return (
    <div>
      <Button label="save" className="mx-10 bg-blue-500" onClick={handleSave} />
      <button onClick={handleReset}>Reset</button>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.accessor}>{column.Header}</TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row: any) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.accessor}>
                  {column.accessor === 'price' ? (
                    <input
                      type="text"
                      value={editedPrices[row.id] || row.price}
                      onChange={(e) => handleEditPrice(row.id, e.target.value)}
                    />
                  ) : (
                    row[column.accessor]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableCaption>Data Table</TableCaption>
    </div>
  );
};

export default TablePage;
