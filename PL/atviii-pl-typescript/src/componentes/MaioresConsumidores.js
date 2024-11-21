/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

const MaioresConsumidores = ({ tema }) => {
  const consumers = [
    { name: "John Doe", moneySpentOnProducts: 200, moneySpentOnServices: 150, totalMoneySpent: 350 },
    { name: "Jane Smith", moneySpentOnProducts: 300, moneySpentOnServices: 100, totalMoneySpent: 400 },
    { name: "Alice Johnson", moneySpentOnProducts: 250, moneySpentOnServices: 200, totalMoneySpent: 450 },
  ];

  const MaioresConsumidoresTable = () => {
    const [sortedConsumers, setSortedConsumers] = useState(consumers);
    const [sortConfig, setSortConfig] = useState(null);

    const sortBy = (key) => {
      let direction = "ascending";
      if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending";
      }

      const sortedArray = [...sortedConsumers].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === "ascending" ? -1 : 1;
          // que?
        }
        if (a[key] > b[key]) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      });

      setSortedConsumers(sortedArray);
      setSortConfig({ key, direction });
    };

    const getArrow = (key) => {
      if (!sortConfig || sortConfig.key !== key) {
        return null;
      }
      return sortConfig.direction === "ascending" ? "↑" : "↓";
    };

    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => sortBy("name")}>Nome {getArrow("name")}</th>
            <th onClick={() => sortBy("moneySpentOnProducts")}>Dinheiro gasto em produtos {getArrow("moneySpentOnProducts")}</th>
            <th onClick={() => sortBy("moneySpentOnServices")}>Dinheiro gasto em serviços {getArrow("moneySpentOnServices")}</th>
            <th onClick={() => sortBy("totalMoneySpent")}>Total gasto {getArrow("totalMoneySpent")}</th>
          </tr>
        </thead>
        <tbody>
          {sortedConsumers.map((consumer, index) => (
            <tr key={index}>
              <td>{consumer.name}</td>
              <td>{consumer.moneySpentOnProducts}</td>
              <td>{consumer.moneySpentOnServices}</td>
              <td>{consumer.totalMoneySpent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container-fluid">
      <MaioresConsumidoresTable />
    </div>
  );
};

export default MaioresConsumidores;
