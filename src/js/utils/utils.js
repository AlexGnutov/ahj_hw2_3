// Simple element creator
export function create(tag, className, text = undefined) {
  const newElement = document.createElement(tag);
  newElement.className = className;
  if (text) {
    newElement.innerText = text;
  }
  return newElement;
}

// Sorts array of objects acc. to given prop and direction
export function sortDataArray(field, reverse, data) {
  // Function constructor to vary compare for diff. props and direction
  function createCompare(fd, rev) {
    return (a, b) => {
      const valueA = a[fd];
      const valueB = b[fd];
      if (valueA + 0 === valueA) {
        return (valueA - valueB) * rev;
      }
      return (valueA.localeCompare(valueB) * rev);
    };
  }
  data.sort(createCompare(field, reverse));
  return data;
}

export function addZeros(value, zeros) {
  if (typeof value === 'number') {
    return value.toFixed(zeros);
  }
  return value;
}
