// components/TreeTable.tsx
import React from 'react';

interface Column {
  Header: string;
  accessor: string;
}

interface Row {
    id: number;
    name: string;
    age: number;
    parent: string;
    [key: string]: string | number; // 인덱스 시그니처 추가
  }

interface Props {
  columns: Column[];
  data: Row[];
}

const TreeTable: React.FC<Props> = ({ columns, data }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.accessor}>{column.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            {columns.map(column => (
              <td key={column.accessor}>{row[column.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TreeTable;
