import React, { useState, useEffect } from 'react';
import Table from '../Table/Table';
import Controls from '../Controls/Controls';
import './App.css';
import transactions from "../../data/transactions"

const App = () => {
  const [showTable, setShowTable] = useState(false);
  const [filteredData, setFilteredData] = useState(transactions);
  const [selectedCategory, setSelectedCategory] = useState("Все категории");
  const [unitPriceOrder, setUnitPriceOrder] = useState("none");
  const [totalRevenueOrder, setTotalRevenueOrder] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [paginationEnabled, setPaginationEnabled] = useState(true);

  useEffect(() => {
    applyFilter();
  }, [selectedCategory, unitPriceOrder, totalRevenueOrder, currentPage, paginationEnabled]);

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  const applyFilter = () => {
    let data = [...transactions];

    if (selectedCategory !== "Все категории") {
      data = data.filter(d => d.ProductCategory === selectedCategory);
    }

    let getSortFunction = (order, getValue, innerFunction) => {
      let comparator = (a, b) => 0;
      if(order === "ascending"){
        comparator = (a, b) => getValue(a) - getValue(b);
      }else if(order === "descending"){
        comparator = (a, b) => getValue(b) - getValue(a);
      }

      return (a, b) => {
        let value = comparator(a, b);
        if(value === 0){
          return innerFunction(a, b);
        }else{
          return value;
        }
      }
    }

    let unitPriceSort = getSortFunction(unitPriceOrder, (a) => a.UnitPrice, (a, b) => 0);
    let totalRevenueSort = getSortFunction(totalRevenueOrder, (a) => a.TotalRevenue, unitPriceSort);

    data.sort(totalRevenueSort);

    setFilteredData(data);
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  console.log(transactions);

  return (
      <div className="app">
        <h3>Список транзакций</h3>
        <Controls
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            unitPriceOrder={unitPriceOrder}
            setUnitPriceOrder={setUnitPriceOrder}
            totalRevenueOrder={totalRevenueOrder}
            setTotalRevenueOrder={setTotalRevenueOrder}
            toggleTable={toggleTable}
            showTable={showTable}
            categories={[...new Set(transactions.map(transaction => transaction.ProductCategory))]}
            setPaginationEnabled={setPaginationEnabled}
            paginationEnabled={paginationEnabled}
        />
        {showTable && (paginationEnabled ? (
            <Table
                data={filteredData}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                paginate={paginate}
                paginationEnabled={paginationEnabled}
            />
        ) : (
            <Table
                data={filteredData}
                paginationEnabled={false}
            />
        ))}
      </div>
  );
};

export default App;
