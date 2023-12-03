import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import _ from "lodash";

const fetchTrainingData = async () => {
  const response = await fetch(
    "http://traineeapp.azurewebsites.net/gettrainings"
  );
  const data = await response.json();
  return data;
};

const prepareChartData = (trainings) => {
  const groupedByActivity = _.groupBy(trainings, "activity");
  const summedByActivity = _.map(
    groupedByActivity,
    (activityTrainings, activity) => ({
      activity: activity,
      duration: _.sumBy(activityTrainings, "duration"),
    })
  );

  return summedByActivity;
};

const StatisticsPage = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const trainings = await fetchTrainingData();
      const preparedData = prepareChartData(trainings);
      setChartData(preparedData);
    };

    loadData();
  }, []);

  return (
    <BarChart
      width={1000}
      height={500}
      data={chartData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="activity" />
      <YAxis
        label={{ value: "Duration (min)", angle: -90, position: "insideLeft" }}
      />
      <Tooltip />
      <Legend />
      <Bar dataKey="duration" fill="#8884d8" />
    </BarChart>
  );
};

export default StatisticsPage;
