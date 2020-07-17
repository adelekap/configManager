import React, { useContext} from "react"
import {Button} from "antd"

import {TableContext} from "../table/TableContext"

export const AddRowButton = () => {
const { addCell } = useContext(TableContext);

 return(
    <div>
    <Button
      onClick={addCell}
      type="primary"
      style={{
        marginBottom: 16,
      }}
    >
      Add a row
    </Button>
  </div>
 )
}