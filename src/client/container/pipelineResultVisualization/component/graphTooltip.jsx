import React from 'react';
import { Paper, Typography, Table, TableCell, TableRow, TableBody } from 'material-ui';
import GraphDataProps from '../../../propTypes/graphData';

export default function GraphTooltip(props) {
  return (
    <Paper>
      <Typography align="center" type="headline" gutterBottom>Summary</Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Frequency</TableCell>
            <TableCell>{`${Math.round(props.frequency * 10000) / 100}%`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Annotation impact</TableCell>
            <TableCell>{props.annotationImpact}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>cDNA change</TableCell>
            <TableCell>{props.HGVSc}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Amino acid change</TableCell>
            <TableCell>{props.HGVSp || 'Unknown'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Depth</TableCell>
            <TableCell>{props.depth}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Feature type</TableCell>
            <TableCell>{props.featureType}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>AA Position Length</TableCell>
            <TableCell>{props.AAPositionLength || 'Unknown'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

GraphTooltip.propTypes = GraphDataProps;
