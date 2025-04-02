import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

const EarningsChart = () => {
  useEffect(() => {
    const options = {
      series: [
        {
          name: "Earnings",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      chart: {
        type: "line",
        height: 250,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      },
    };

    const chart = new ApexCharts(document.querySelector("#daily-chart"), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return <div id="daily-chart"></div>;
};

export default EarningsChart;
