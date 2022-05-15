import React from "react"
import { Line } from "react-chartjs-2"

const LineChart = () => {
    const state = {
        label: ["A", "B", "C"],
        datasets: {
            label: "dati",
            backgroundColor: "white",
            borderWidth: 2,
            data: [10, 20, 15]
        }
    }


const options = {
    plugins: {
        legend: {
            display: true,
            position: "bottom"
        },
        title: {
            text: "valori",
            display: true,
            fontSize: 20
        }
    }
}

return (
    <div className="LineChart">
    <Line
        data={state}
        options={options}
        />

        <p style={{textAlign: "center"}}>Line Chart</p>
        </div>

    )
}

export default LineChart;