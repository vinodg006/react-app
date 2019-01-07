import React from 'react';

export const Table = (props) => {
  console.log(props, "TABLE PROPS")

  const tempArr = props.tableData.map((value, index) => {
    return (
      <div keys={index} style={{ display: 'table-row' }}>
        <div style={{ display: 'table-cell', border: '1px solid', padding: '5px' }}>
          <input type='checkbox' checked={value.selected} data-position={props.position} data-id={index} onChange={props.getTableClick(!value.selected , props.position , index)} />
        </div>
        <div style={{ display: 'table-cell', border: '1px solid', padding: '5px' }}>
          {value.id}
        </div>
        <div style={{ display: 'table-cell', border: '1px solid', padding: '5px' }}>
          {value.name}
        </div>
      </div>
    )
  });

  return (
    <div style={{ display: 'table', border: '1px solid', margin: '10px' }}>
      {tempArr}
    </div>
  )
}
