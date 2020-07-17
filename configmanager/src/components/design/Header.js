import React from "react"
import {PageHeader} from "antd"

export const Header = () => {
    const style = {"backgroundColor":"#1890ff"}
    return(  <PageHeader
        className="site-page-header"
        title="Configuration Manager"
        style={style}
      />)
}