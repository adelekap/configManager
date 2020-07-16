import React, { useState, useRef, useEffect, useContext } from "react";
import { Table } from "antd";

import { columns } from "./columns";
import { TableContext } from "./TableContext"


const ConfigCell = ({children, editable, dataIndex, record}) => {
  const [isEditting, setEditting] = useState(false);
  const {updateCell} = useContext(TableContext)
  const inputRef = useRef();

  // This function will run whenever isEdding changes value
  useEffect(() => {
    if (isEditting) inputRef.current.focus();
  }, [isEditting]);

  const changeCellValue = ({key, currentTarget:{value}}) => {
    if(key === 'Enter'){
        setEditting(false)
        updateCell(dataIndex, record.dataIndex, value)
    }
}

  const edittingForm = <input ref={inputRef} onKeyUp={changeCellValue} type="text" placeholder={record.value}></input>
  const normalView = <span>{children}</span>;
  const toggleableView = (
    <div onClick={() => setEditting(!isEditting && editable)}>
      {isEditting ? edittingForm : normalView}
    </div>
  );

  return <td>{toggleableView}</td>;
};

export const ConfigTable = () => {
  // Add a unique value field to each piece of data, in this case, its index in the array

  const {tableState} = useContext(TableContext)


  const tableColumns = columns.map(col => {
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };})

  return (
    <Table
      components={{ body: { cell: ConfigCell} }}
      dataSource= {tableState}
      columns={tableColumns}
      rowKey="dataIndex"
    />
  );
};
