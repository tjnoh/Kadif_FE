// components/TreeTable.tsx
import React from 'react';

interface Column {
  Header: string;
  accessor: string;
}

interface Row {
    id: number;
    tc_group: string;
    tc_name: string;
    tc_context: string;
    tc_parameter: string;
    [key: string]: string | number; // 인덱스 시그니처 추가
  }

interface Props {
  columns: Column[];
  data: Row[];
}

const TreeTable: React.FC<Props> = ({ columns, data }) => {
  return (
    <table width={'100%'}>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.accessor}>{column.Header !== 'Group' ? column.Header : ''}</th>
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
