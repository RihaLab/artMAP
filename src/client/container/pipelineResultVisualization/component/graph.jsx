import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved,import/extensions
import charts from 'charts';
import { GraphProps } from '../../../propTypes';
import './graphStyle.css';

const graphOptions = {
  vAxes: {
    0: {
      title: 'Frequency',
      format: 'percent',
      minValue: 0,
      maxValue: 1,
    },
    1: { title: 'Trendline' },
  },
  hAxis: {
    title: 'Gene location',
    gridlines: {
      color: 'transparent',
    },
    minValue: 0,
  },
  series: {
    0: {
      pointsVisible: true,
      lineWidth: 0,
    },
    1: {
      visibleInLegend: false,
      curveType: 'funtion',
      enableInteractivity: false,
    },
  },
  crosshair: {
    trigger: 'selection',
    color: 'red',
  },
  explorer: {
    actions: ['dragToZoom', 'rightClickToReset'],
    keepInBounds: true,
    maxZoomIn: 4.0,
  },
  tooltip: { isHtml: true },
  legend: { position: 'top' },
  colors: ['#76C045'],
  dataOpacity: 0.7,
};

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.drawChart = this.drawChart.bind(this);
  }

  componentDidMount() {
    this.drawChart();
  }

  componentWillUpdate() {
    this.drawChart();
  }

  drawChart() {
    const parsedData = parseData(this.props.data);

    const dataTable = new charts.visualization.DataTable();
    dataTable.addColumn('number', 'Location');
    dataTable.addColumn('number', 'Frequency');
    dataTable.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
    dataTable.addColumn('number', 'Trendline');
    dataTable.addRows(parsedData.data);

    const chart = new charts.visualization
      .ScatterChart(document.getElementById(this.props.chromosome));

    const options = Object.assign({}, graphOptions, { title: `Chromosome ${this.props.chromosome}` });
    chart.draw(dataTable, options);
    chart.setSelection([{ row: parsedData.maxFrequencyIndex, column: 1 }]);
  }

  render() {
    return <div id={this.props.chromosome} />;
  }
}

Graph.propTypes = GraphProps;

Graph.defaultProps = {
  data: [],
};

function parseData(data) {
  return data.reduce((acc, value, index, array) => {
    const result = acc;
    if (array[result.maxFrequencyIndex].frequency < value.frequency) {
      result.maxFrequencyIndex = index;
    }
    result.data.push([
      Number(value.location),
      value.frequency,
      generateTooltip(value),
      null,
    ]);
    return result;
  }, { data: [], maxFrequencyIndex: 0 });
}

function generateTooltip(data) {
  return (
    '<div class="graph-tooltip">' +
    `<span class="graph-tooltip__header">Gene ${data.geneName}</span>` +
    '<ul class="graph-tooltip__list">' +
    `<li><strong>Frequency: </strong>${Math.round(data.frequency * 10000) / 100}%</li>` +
    `<li><strong>Gene name: </strong>${data.geneName}</li>` +
    `<li><strong>Annotation impact: </strong>${data.annotationImpact}</li>` +
    `<li><strong>Feature type: </strong>${data.featureType}</li>` +
    `<li><strong>HGVSc: </strong>${data.HGVSc}</li>` +
    `<li><strong>HGVSp: </strong>${data.HGVSp}</li>` +
    `<li><strong>AA Position Length: </strong>${data.AAPositionLength}</li>` +
    '</ul>' +
    '</div>'
  );
}
