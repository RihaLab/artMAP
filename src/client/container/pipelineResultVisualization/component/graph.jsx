import React, { Component } from 'react';
import { render } from 'react-dom';
import * as d3 from 'd3';
import { Grid } from 'material-ui';
import GraphDownloadIcon from './graphDownloadIcon';
import GraphTooltip from './graphTooltip';
import { downloadSVG } from '../../../util';
import { GraphProps } from '../../../propTypes';
import './graphStyle.css';

const config = {
  padding: {
    base: 60,
    bottom: 80,
    chromosome: 5,
    title: 30,
  },
  chromosome: {
    padding: 5,
    height: 20,
  },
  ticks: 6,
  idleDelay: 350,
  labelMargin: {
    x: 45,
    y: 38,
  },
};

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.drawGraph = this.drawGraph.bind(this);
    this.getGraphConfig = this.getGraphConfig.bind(this);
    this.removeGraph = this.removeGraph.bind(this);
    this.exportGraph = this.exportGraph.bind(this);
  }

  componentDidMount() {
    this.drawGraph();
  }

  componentWillUpdate() {
    this.removeGraph();
    this.drawGraph();
  }

  getGraphConfig(width, height) {
    const domain = getDomain(this.props.chromosomeLength);
    const ranges = getRanges(width, height);
    const scales = getScales(domain, ranges);
    const axes = getAxes(scales);
    const grid = getGrid(width, height, scales);

    return {
      domain, ranges, scales, axes, grid, width, height,
    };
  }

  drawGraph() {
    const divId = `#chromosome-${this.props.chromosome}`;
    const baseWidth = document.querySelector(divId).clientWidth;
    const baseHeight = Math.round((baseWidth / 3) * 2);

    const svg = d3.select(divId).append('svg');
    // hack to make all graphs same, we need to set up width and height
    // material-ui probably resize the grid by the nested object
    svg.attr('width', baseWidth)
      .attr('height', baseHeight);

    const width = document.querySelector(divId).clientWidth;
    const height = Math.round((width / 3) * 2);

    svg.attr('width', width)
      .attr('height', height);

    const graphConfig = this.getGraphConfig(width, height);
    const elements = drawBaseElements(svg, graphConfig);
    elements.brush = drawBrush(svg, graphConfig);
    elements.points = drawPoints(svg, graphConfig, this.props.data);
    drawChromosome(svg, graphConfig, this.props.centromereLocation);
    elements.overlay = drawChromosomeOverlay(svg, graphConfig);
    drawLabels(svg, graphConfig, this.props);

    elements.brush.on('end', () => onZoom(svg, graphConfig, elements));
  }

  removeGraph() {
    const div = d3.select(`#chromosome-${this.props.chromosome}`);
    div.selectAll('svg').remove();
  }

  exportGraph() {
    const divId = `#chromosome-${this.props.chromosome}`;
    const div = d3.select(divId);

    const svgNode = div.selectAll('svg').node();
    const width = document.querySelector(divId).clientWidth;
    const height = Math.round((width / 3) * 2);
    const options = {
      width,
      height,
      name: `Chromosome ${this.props.chromosome}`,
    };
    downloadSVG(svgNode, options);
  }

  render() {
    return (
      <Grid container justify="flex-end">
        <Grid item>
          <GraphDownloadIcon onClick={this.exportGraph} />
        </Grid>
        <Grid item xs={12}>
          <div>
            <div id={`chromosome-${this.props.chromosome}`} />
          </div>
        </Grid>
      </Grid>
    );
  }
}

Graph.propTypes = GraphProps;

Graph.defaultProps = {
  data: [],
};

function getDomain(chromosomeLength) {
  return {
    x: { min: 0, max: chromosomeLength },
    y: { min: 0, max: 1 },
  };
}

function getRanges(width, height) {
  const { padding } = config;
  return {
    x: { min: padding.base, max: width - padding.base },
    y: { min: height - padding.bottom, max: padding.base },
  };
}

function getScales(domain, ranges) {
  return {
    x: d3.scaleLinear().domain(Object.values(domain.x)).range(Object.values(ranges.x)),
    y: d3.scaleLinear().domain(Object.values(domain.y)).range(Object.values(ranges.y)),
    chromosome: d3.scaleLinear().domain(Object.values(domain.x)).range(Object.values(ranges.x)),
  };
}

function getAxes(scales) {
  return {
    x: d3.axisBottom(scales.x).ticks(config.ticks),
    y: d3.axisLeft(scales.y).ticks(config.ticks).tickFormat(d3.format('.0%')),
  };
}

function getGrid(width, height, scales) {
  const { padding, ticks } = config;
  return {
    x: d3.axisBottom(scales.x)
      .tickSize(-height + padding.bottom + padding.base)
      .tickFormat('')
      .ticks(ticks),
    y: d3.axisLeft(scales.y)
      .tickSize(-width + (2 * padding.base))
      .tickFormat('')
      .ticks(ticks),
  };
}

function drawBrush(svg, graphOptions) {
  const { scales, domain } = graphOptions;

  const brush = d3.brush()
    .extent([
      [scales.x(domain.x.min), scales.y(domain.y.max)],
      [scales.x(domain.x.max), scales.y(domain.y.min)],
    ]);

  svg.append('g')
    .attr('class', 'brush')
    .call(brush);

  return brush;
}

function drawChromosome(svg, graphConfig, centromereLocation) {
  const { scales, domain, height } = graphConfig;
  const { chromosome } = config;

  const chromosomeElement = svg.append('g');
  chromosomeElement.append('rect')
    .attr('x', scales.x(domain.x.min))
    .attr('y', height - chromosome.height - chromosome.padding)
    .attr('width', scales.x(centromereLocation) - scales.x(domain.x.min))
    .attr('height', chromosome.height)
    .attr('rx', 30)
    .attr('ry', 20)
    .attr('class', 'chromosome');

  chromosomeElement.append('rect')
    .attr('x', scales.x(centromereLocation))
    .attr('y', height - chromosome.height - chromosome.padding)
    .attr('width', scales.x(domain.x.max) - scales.x(centromereLocation))
    .attr('height', chromosome.height)
    .attr('rx', 30)
    .attr('ry', 20)
    .attr('class', 'chromosome');

  chromosomeElement.append('circle')
    .attr('cx', scales.x(centromereLocation))
    .attr('cy', height - (chromosome.height / 2) - chromosome.padding)
    .attr('r', chromosome.height / 4)
    .attr('class', 'chromosome');
}

function drawLabels(svg, graphConfig, props) {
  const { labelMargin, padding } = config;
  const { scales, width, domain } = graphConfig;

  svg.append('text')
    .attr('x', width / 2)
    .attr('y', padding.title)
    .attr('text-anchor', 'middle')
    .attr('class', 'MuiTypography-display1-130 graph-title')
    .text(`Chromosome ${props.chromosome}`);

  svg.append('text')
    .attr('x', scales.x(domain.x.max / 2))
    .attr('y', scales.y(domain.y.min) + labelMargin.y)
    .attr('text-anchor', 'middle')
    .attr('class', 'MuiTypography-subheading-133 axis-label')
    .text('Gene location');

  svg.append('text')
    .attr('x', scales.x(domain.x.min) - labelMargin.x)
    .attr('y', scales.y(domain.y.max / 2))
    .attr('text-anchor', 'middle')
    .attr('class', 'MuiTypography-subheading-133 axis-label')
    .text('Frequency')
    .attr('transform', `rotate(-90 ${scales.x(domain.x.min) - labelMargin.x} ${scales.y(domain.y.max / 2)})`);
}

function drawPoints(svg, graphConfig, data) {
  const { scales } = graphConfig;

  const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)
    .style('position', 'absolute');

  const showTooltip = getShowTooltipCb(tooltip);
  const hideTooltip = getHideTooltipCb(tooltip);

  return svg.selectAll('circle')
    .data(data)
    .enter().append('circle')
    .attr('cx', d => scales.x(d.location))
    .attr('cy', d => scales.y(d.frequency))
    .attr('class', 'point')
    .attr('r', 4.5)
    .attr('class', 'point')
    .on('mouseover', showTooltip)
    .on('mouseout', hideTooltip);
}

function drawChromosomeOverlay(svg, graphConfig) {
  const { scales, domain, height } = graphConfig;
  const { chromosome } = config;

  const overlay = svg.append('g');
  const left = overlay.append('rect')
    .attr('x', scales.x(domain.x.min))
    .attr('y', height - chromosome.height - chromosome.padding)
    .attr('width', 0)
    .attr('height', chromosome.height)
    .attr('class', 'chromosome-overlay');

  const right = overlay.append('rect')
    .attr('x', scales.x(domain.x.max))
    .attr('y', height - chromosome.height - chromosome.padding)
    .attr('width', 0)
    .attr('height', chromosome.height)
    .attr('class', 'chromosome-overlay');
  return { left, right };
}

function drawBaseElements(svg, graphConfig) {
  const { axes, grid, height } = graphConfig;
  const { padding } = config;

  svg.append('rect')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('fill', 'white');

  return {
    xAxis: svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height - padding.bottom})`)
      .call(axes.x),
    yAxis: svg.append('g')
      .attr('class', 'axis axis--y')
      .attr('transform', `translate(${padding.base} ,0)`)
      .call(axes.y),
    xGrid: svg.append('g')
      .attr('class', 'grid grid--x')
      .attr('transform', `translate(0, ${height - padding.bottom})`)
      .call(grid.x),
    yGrid: svg.append('g')
      .attr('class', 'grid grid--y')
      .attr('transform', `translate(${padding.base} ,0)`)
      .call(grid.y),
  };
}

function getShowTooltipCb(tooltip) {
  return function showTooltip(data) {
    d3.select(this).attr('class', 'point--focus');
    tooltip.style('z-index', 100);
    tooltip.transition()
      .duration(200)
      .style('opacity', 1)
      .style('left', `${d3.event.pageX + 30}px`)
      .style('top', `${d3.event.pageY - 140}px`);

    const a = <GraphTooltip {...data} />;
    render(a, tooltip.node());
  };
}

function getHideTooltipCb(tooltip) {
  return function hideTooltip() {
    d3.select(this).attr('class', 'point');
    tooltip.transition().duration(500)
      .style('opacity', 0)
      .style('top', '0');
  };
}

function onZoom(svg, graphConfig, elements) {
  const {
    scales, domain, ranges, axes, grid,
  } = graphConfig;
  const { overlay, brush } = elements;
  const transition = svg.transition().duration(750);
  const { selection } = d3.event;
  if (!selection) {
    if (!config.idleTimeout) {
      config.idleTimeout = setTimeout(() => {
        config.idleTimeout = null;
      }, config.idleDelay);
      return;
    }
    scales.x.domain(Object.values(domain.x));
    scales.y.domain(Object.values(domain.y));

    overlay.left.transition(transition).attr('width', 0);
    overlay.right.transition(transition).attr('x', scales.x(domain.x.max)).attr('width', 0);
  } else {
    const sliderStart = scales.chromosome(scales.x.invert(selection[0][0]));
    const sliderEnd = scales.chromosome(scales.x.invert(selection[1][0]));

    overlay.left.transition(transition).attr('width', Math.max(0, sliderStart - scales.chromosome(0)));
    overlay.right.transition(transition).attr('x', sliderEnd).attr('width', Math.max(0, scales.chromosome(domain.x.max) - sliderEnd));

    scales.x.domain([selection[0][0], selection[1][0]].map(scales.x.invert, scales.x));
    scales.y.domain([selection[1][1], selection[0][1]].map(scales.y.invert, scales.y));
    svg.select('.brush').call(brush.move, null);
  }
  elements.xAxis.transition(transition).call(axes.x);
  elements.yAxis.transition(transition).call(axes.y);
  elements.xGrid.transition(transition).call(grid.x);
  elements.yGrid.transition(transition).call(grid.y);
  elements.points.transition(transition)
    .attr('cx', d => scales.x(d.location))
    .attr('cy', d => scales.y(d.frequency))
    .attr('visibility', (d) => {
      const cx = scales.x(d.location);
      const cy = scales.y(d.frequency);

      const isCXInRange = cx >= ranges.x.min && cx <= ranges.x.max;
      const isCYInRange = cy >= ranges.y.max && cy <= ranges.y.min;

      if (isCXInRange && isCYInRange) {
        return 'visible';
      }
      return 'hidden';
    });
}
