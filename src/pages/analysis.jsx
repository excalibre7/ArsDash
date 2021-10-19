import React, { Component, useState } from "react";
import AnalysisTable from "../components/analysisTable";
import ChartTest from "../components/testchart";
import TopBar from "../components/topbar";

const Analysis = (props) => {
  const { data, categories, brands } = props;
  //   placeholder_data untile API ->
  const [searchTerm, setSearchTerm] = useState("");

  var filteredData = data.filter((e) =>
    e.VENDOR.toLowerCase().includes(searchTerm)
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <div>
      <header>
        <TopBar handleSearch={handleSearch} page="analysis" />
      </header>
      <body>
        <AnalysisTable
          data={filteredData}
          categories={categories}
          brands={brands}
        />
      </body>
    </div>
  );
};

export default Analysis;
