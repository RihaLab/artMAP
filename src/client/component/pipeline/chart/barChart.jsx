import React from 'react';
import PropTypes from 'prop-types';
import { Bar as BarChartJS } from 'react-chartjs';

export default function BarChart(props) {
  const chartData = {
    labels: props.data.map(e => e.location),
    datasets: [{
      backgroundColor: 'rgba(54, 162, 235, 0.4)',
      label: 'Frequency',
      data: props.data.map(e => Math.round(e.frequency * 100 * 100) / 100),
    }],
  };


  const chartOptions = {
    title: {
      display: true,
      text: `Chromosome ${props.title}`,
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 100,
          callback: value => `${value}%`,
        },
        scaleLabel: {
          display: true,
          labelString: 'Percentage',
        },
      }],
    },
    tooltips: {
      callbacks: {
        title: values => `Location: ${values[0].xLabel}`,
        afterTitle: parseTitle,
      },
    },
  };

  return (
    <BarChartJS data={chartData} options={chartOptions} />
  );
}

function parseTitle(values) {
  const { index } = values[0];
  const data = this.props.data[index];
  const labels = ['Annotation Impact', 'Gene name', 'Feature Type', 'HGVS.c', 'HGVS.p', 'AA.pos / AA.length'];
  return labels.map(label => `${label}: ${data[label]}`);
}

BarChart.propTypes = {
  title: PropTypes.string.isRequired,
  // todo change propType
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
