import React, { useState, useRef, useEffect, useContext } from "react";
import { Table } from "antd";

import { columns } from "./columns";
import { TableContext } from "./TableContext";

const ConfigCell = ({ children, editable, dataIndex, record }) => {
  const [isEditting, setEditting] = useState(record.isNew);
  const { updateCell } = useContext(TableContext);
  const inputRef = useRef();

  // This function will run whenever isEdding changes value
  useEffect(() => {
    if (isEditting) inputRef.current.focus();
  }, [isEditting]);

  const changeCellValue = () => {
    if (isEditting) {
      if(inputRef.current.value == null || inputRef.current.value == "" ) return;
      const cellValue = inputRef.current.value || record.value
      console.log(cellValue)
      updateCell(dataIndex, record.dataIndex, cellValue);
       setEditting(false)
    } else {
      setEditting(!isEditting && editable);
    }
  };

  const edittingForm = (
    <input
      ref={inputRef}
      onKeyUp={({ key }) => {
        if (key === "Enter") changeCellValue();
      }}
      type="text"
      placeholder={record.value}
    ></input>
  );
  const normalView = <span>{children}</span>;
  const toggleableView = (
    <div onClick={changeCellValue}>
      {isEditting  ? edittingForm : normalView}
    </div>
  );

  return <td>{toggleableView}</td>;
};

export const ConfigTable = () => {
  const { tableState } = useContext(TableContext);

  const tableColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <Table
      components={{ body: { cell: ConfigCell } }}
      dataSource={tableState}
      columns={tableColumns}
      rowKey="dataIndex"
    />
  );
};
