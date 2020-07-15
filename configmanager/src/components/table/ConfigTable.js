import React, { useState, useRef, useEffect } from "react";
import { Table } from "antd";

import { columns } from "./columns";
import { dataSource } from "../../data/settings";

// const Row = ({ index, ...props }) => {
//   return <tr {...props} />;
// };

const ConfigCell = ({editable, ...props}) => {
  const [isEditting, setEditting] = useState(false);
  const inputRef = useRef();

  // This function will run whenever isEdding changes value
  useEffect(() => {
    if (isEditting) inputRef.current.focus();
  }, [isEditting]);

  const edittingForm = <input ref={inputRef} type="text" placeholder={"Edit me"}></input>
  const normalView = <span>{props.children}</span>;
  const toggleableView = (
    <div onClick={() => setEditting(!isEditting && editable)}>
      {isEditting ? edittingForm : normalView}
    </div>
  );

  return <td>{toggleableView}</td>;
};

export const ConfigTable = () => {
  // Add a unique value field to each piece of data, in this case, its index in the array
  const data = dataSource.map((d, i) => ({ ...d, dataIndex: i }));

  const tableColumns = columns.map(col => {
    // if (!col.editable) {
    //   return col;
    // }

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
      dataSource={data}
      columns={tableColumns}
      rowKey="dataIndex"
    />
  );
};
