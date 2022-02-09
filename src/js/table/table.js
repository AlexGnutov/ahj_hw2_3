import { addZeros, create, sortDataArray } from '../utils/utils';

export default class Table {
  constructor(columns, data) {
    this.container = create('div', 'table-container');
    this.columns = columns;
    this.data = data;
    // No initial sorting
    this.straightSorted = null;
    this.sortedCell = null;
  }

  fill() {
    // Prepare table
    const newTable = create('table', 'datatable');
    // Prepare header
    const newHeader = create('thead', 'datatable-header');
    const newHeaderRow = create('tr', 'datatable-header-row');
    this.columns.forEach((columnName) => {
      const headerCell = create('th', 'datatable-header-cell');
      headerCell.innerText = columnName;
      headerCell.setAttribute('scope', 'col');
      headerCell.style.userSelect = 'none';
      headerCell.addEventListener('click', (e) => {
        this.sortListeners(e);
      });
      newHeaderRow.append(headerCell);
    });
    newHeader.append(newHeaderRow);
    // Add header
    newTable.append(newHeader);
    // Prepare and add body
    const tableBody = create('tbody', 'datatable-body');
    newTable.append(tableBody);
    // Put table element into component container
    this.container.append(newTable);
    // Draw rows
    this.drawRows();
  }

  // Just returns html of component container
  html() {
    return this.container;
  }

  drawRows() {
    // Creating rows and cells
    const body = this.container.querySelector('.datatable-body');
    body.innerHTML = '';
    this.data.forEach((elem) => {
      const newRow = create('tr', 'datatable-body-row');
      // Finding data corresponding to column and add cell to row;
      this.columns.forEach((columnName) => {
        let text;
        if (elem[columnName]) {
          // selectively format numbers in 'imdb' column
          text = ['imdb'].includes(columnName) ? addZeros(elem[columnName], 2) : elem[columnName];
        } else {
          text = '-';
        }
        const cell = create('td', 'datatable-body-cell', text);
        newRow.appendChild(cell);
      });
      // Add row to body
      body.append(newRow);
    });
  }

  // To be attached to header cell and provides sorting
  sortListeners(e) {
    const clickedCell = e.target;
    const field = clickedCell.innerText;
    let reverse;
    // If new cell pressed - clear pseudo from previously sorted
    if (this.sortedCell && this.sortedCell !== clickedCell) {
      this.sortedCell.classList.remove('sorted-straight-cell');
      this.sortedCell.classList.remove('sorted-reverse-cell');
      this.straightSorted = null; // Set sorting to null
    }
    this.sortedCell = clickedCell; // Now clicked cell is sorted one
    // If sorting is null of false(reverse), apply straight sorting
    // If sorting is straight - use reverse sorting
    if (!this.straightSorted) {
      reverse = 1;
      this.straightSorted = true;
      clickedCell.classList.remove('sorted-reverse-cell');
      clickedCell.classList.add('sorted-straight-cell');
    } else {
      this.straightSorted = false;
      reverse = -1;
      clickedCell.classList.add('sorted-reverse-cell');
      clickedCell.classList.remove('sorted-straight-cell');
    }
    // Sort the array and redraw the rows
    sortDataArray(field, reverse, this.data);
    this.drawRows();
  }
}
