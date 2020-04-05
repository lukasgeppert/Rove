import React, { useEffect, useState } from "react";
import Fire from "../Firebase";

export const ratingsCalc = ({ route }) => {
  const { city } = route.params;

  const [ratingsCalc, setRatings] = useState([]);
  const [averagesCalc, setAverages] = useState({});

  const fetchRatings = async () => {
    const ratings = await Fire.getRatings(city.name);

    return ratings;
  };

  useEffect(() => {
    fetchRatings().then((ratings) => setRatings(ratings));
  }, []);

  const fetchAverages = async () => {
    const ratings = await Fire.getRatings(city.name);
    const roverArr = [];
    const costArr = [];
    const funArr = [];
    const internetArr = [];
    const safetyArr = [];
    const weatherArr = [];

    for (let i = 0; i < ratings.length; i++) {
      const singleRating = ratings[i];
      console.log("singleRating", singleRating.rating);
      console.log("RATINGS", ratings.length);

      // const rover = singleRating.rating;
      const cost = singleRating.rating.cost;
      const fun = singleRating.rating.fun;
      const internet = singleRating.rating.internet;
      const safety = singleRating.rating.safety;
      const weather = singleRating.rating.weather;

      costArr.push(cost);
      funArr.push(fun);
      internetArr.push(internet);
      safetyArr.push(safety);
      weatherArr.push(weather);

      let total = 0;
      for (let i = 0; i < costArr.length; i++) {
        total += costArr[i];
      }
      let averageCost = total / costArr.length;
      console.log("AVERAGE COST", averageCost);

      total = 0;
      for (let i = 0; i < funArr.length; i++) {
        total += funArr[i];
      }
      let averageFun = total / funArr.length;

      total = 0;
      for (let i = 0; i < internetArr.length; i++) {
        total += internetArr[i];
      }
      let averageInternet = total / internetArr.length;

      total = 0;
      for (let i = 0; i < safetyArr.length; i++) {
        total += safetyArr[i];
      }
      let averageSafety = total / safetyArr.length;

      total = 0;
      for (let i = 0; i < weatherArr.length; i++) {
        total += weatherArr[i];
      }
      let averageWeather = total / weatherArr.length;

      total = 0;
      roverArr.push(
        averageCost,
        averageFun,
        averageInternet,
        averageSafety,
        averageWeather
      );
      for (let i = 0; i < roverArr.length; i++) {
        total += roverArr[i];
      }
      let averageAll = parseFloat(total / roverArr.length).toFixed(2);
      console.log("ROVER AVG", averageAll);

      setAverages({
        rover: averageAll,
        cost: averageCost,
        fun: averageFun,
        internet: averageInternet,
        safety: averageSafety,
        weather: averageWeather,
      });
    }
  };

  useEffect(() => {
    fetchAverages();
  }, []);
};

export default ratingsCalc;
