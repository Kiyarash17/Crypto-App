import { useReducer, useEffect, useState } from "react";
import { Api } from "../../pages/api/Api";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const initalState = {
  prices: [],
  labels: [],
  datasets: [],
};

function reducer(state: any, action: any) {
  return {
    labels: action.prices.map((val: any, index:any) => index),
    datasets: [{
      label: "Crypto Prices",
      data: action.prices.map((val: any) => val[1]),
      backgroundColor: [
        "rgba(75,192,192,1)",
        "#ecf0f1",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0",
      ],
      borderColor: "gray",
      borderWidth: 2,
    }],
  };
}

type Props = {
  id: any;
};

export default function Chart(props: Props) {
  const [state, dispatch] = useReducer(reducer, initalState);
  
  useEffect(() => {
    new Api().coins.marketChartDetail(String(props.id), {vs_currency: "usd", days: "7"}).
    then((res) => res.json()).
    then((data) => dispatch({
      prices: data.prices,
    }));
  }, []);


  return(
    <div>
      <Line data={state} />
      {/* <canvas id={String(state)}>Your Browser does not support Chart</canvas> */}
    </div>
  );

}