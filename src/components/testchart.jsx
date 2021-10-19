import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const ChartTest = () => {
  const [chartData, setChartData] = React.useState({});
  const chart = () => {
    setChartData({
      labels: ["mond", "tues", "wedn"],
      datasets: [
        {
          label: "Xx",
          data: [20, 21, 0.1],
          backgroundColor: [`#c92c2c`],
          borderWidth: 4,
        },
      ],
    });
  };

  React.useEffect(() => {
    chart();
  }, []);

  return (
    <div>
      <Pie
        data={chartData}
        options={{
          plugins: {
            datalabels: {
              display: true,
              color: "black",
            },
          },
        }}
      />
    </div>
  );
};

export default ChartTest;
