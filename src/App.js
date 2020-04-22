import React, { useState, useEffect } from 'react';
import testData from './testData.js'
import { DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import down from './images/expand-down.png'
import up from './images/contract-up.png'
import './App.css';

function App(props){

  const [data, setData] = useState(testData.data)
  const [filter, setFilter] = useState("")

  const onClick = ({ key }) => {
    setFilter(key)
  };

  useEffect(() => {
    var parentData = []
    var innerData = []
    data.forEach(item => {
      if (item.parent_objective_id === "") {
        if (innerData.length > 0 && parentData[parentData.length-1].id === innerData[0].parent_objective_id) {
          parentData[parentData.length-1].inner_elements = innerData
          innerData = []
        }
        else {
          parentData.push({...item, expand: true})
          innerData = []
        }
      }
      else {
        innerData.push(item)
      }
    })
    if (innerData.length > 0) {
      parentData[parentData.length-1].inner_elements = innerData
    }
    setData(parentData)
  }, []);

  const changeExpand = (id) => {
    var newData = data.map((item => {
      if (item.id === id) {
        item.expand = !item.expand
      }
      return item;
    }))
    var element = document.getElementById(id)
    if (element.style.display==="block") {
      element.style.display = "none"
    }
    else {
      element.style.display = "block"
    }

    setData(newData)
  }


  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="Company">Company</Menu.Item>
      <Menu.Item key="Sales">Sales</Menu.Item>
      <Menu.Item key="Finance">Finance</Menu.Item>
      <Menu.Item key="People">People</Menu.Item>
      <Menu.Item key="Product Management">Product Management</Menu.Item>
      <Menu.Item key="Engineering">Engineering</Menu.Item>
      <Menu.Item key="Administration">Administration</Menu.Item>
      <Menu.Item key="Customer Success">Customer Success</Menu.Item>
      <Menu.Item key="Design">Design</Menu.Item>
    </Menu>
  );

  var displayData = data
  if (filter !== "") {
    displayData = data.filter(item => item.category === filter)
  }

  return (
    <div className="app">
      <div className="filter-container">
        <Dropdown overlay={menu}>
          <a href="" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            Click to filter <DownOutlined />
          </a>
        </Dropdown>
      </div>
      {displayData.map((parent) => {
          return (
            <div className="parent-container">
              <div className="parent-box">
                {
                  <span>
                    <img
                      alt="expand-contract"
                      style={{height: 20, width: 20, borderRadius: 20, backgroundColor: "#000000", margin: "0px 15px", cursor: "pointer"}}
                      src={parent.expand ? up : down} onClick={() => changeExpand(parent.id)} />
                  </span>
                }
                {parent.title}
              </div>
              <div className="child-container" style={{display: "block"}} id={parent.id}>
                {parent.inner_elements && parent.inner_elements.map((child, index) => {
                    return (
                      <div className="single-child" style={{backgroundColor: index%2 === 0 ? "#FFFFFF" : "lightGray"}}>
                        {child.title}
                      </div>
                    );
                  })
                }
              </div>
            </div>
          );
        })
      }
    </div>
  )

}



export default App
