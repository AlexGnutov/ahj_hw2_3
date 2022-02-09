import Table from './table/table';
import { sample } from './db/sample';

window.onload = () => {
  // Create table
  const columns = Object.keys(sample[0]);
  const table = new Table(columns, sample);
  table.fill();
  // Put the table into document
  document.getElementById('container').append(table.html());
};
