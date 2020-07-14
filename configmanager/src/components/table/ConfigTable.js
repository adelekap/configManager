import React, { useState, useRef, useEffect } from "react";
import { Table } from "antd";

import { columns } from "./columns";
import { dataSource } from "../../data/settings";

const Row = ({ ...props }) => {
  return <tr {...props} />;
};

const ConfigCell = ({ children }) => {
  const [isEditting, setEditting] = useState(false);
  const inputRef = useRef();

  // This function will run whenever isEdding changes value
  useEffect(() => {
    if (isEditting) inputRef.current.focus();
  }, [isEditting]);

  const edittingForm = <input ref={inputRef} type="text" placeholder={"Edit me"}></input>
  const normalView = <span>{children}</span>;
  const toggleableView = (
    <div onClick={() => setEditting(!isEditting)}>
      {isEditting ? edittingForm : normalView}
    </div>
  );

  return <td>{toggleableView}</td>;
};

export const ConfigTable = () => {
  // Add a unique value field to each piece of data, in this case, its index in the array
  const data = dataSource.map((d, i) => ({ ...d, dataIndex: i }));
  return (
    <Table
      components={{ body: { cell: ConfigCell, row: Row } }}
      dataSource={data}
      columns={columns}
      rowKey="dataIndex"
    />
  );
};
