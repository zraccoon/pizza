import React, { Component } from 'react';
import { Row, Col, Table } from 'antd';
import "antd/dist/antd.css";
import './App.css';
import pizzaImage from './pizza.png';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name > b.name,
    render: text => <a>{text}</a>,
  },
  {
    title: 'Count',
    dataIndex: 'count',
    key: 'count',
    sorter: (a, b) => a.count - b.count,
    render: text => <a>{text}</a>,
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pizzaData: []
    };
  }

  fetchPizzaData = () => {
    fetch(`http://files.olo.com/pizzas.json`)
    .then(response => response.json())
    .then(data => {
        var pizzaData = [];
        data.map(item => {
            var pizzaList = item.toppings;
            pizzaList.map((pizzaName, index) =>{
                var existFlag = false;
                pizzaData.map(pcitem => {
                    if(pcitem.name === pizzaName) {
                        pcitem.count++;
                        existFlag = true;
                    }
                });
                if(!existFlag) {
                  pizzaData.push({name: pizzaName, count: 1});
                }
            });
        });

        pizzaData.sort(function(a, b) {
            return b.count - a.count;
        });

        this.setState({
          pizzaData: pizzaData
        });
      }
    );
  }

  componentDidMount() {
    this.fetchPizzaData();
  }

  render() {
    const pizzaData = this.state.pizzaData;
    var rankedPizza = '';
    if(pizzaData.length > 0)
    {
      rankedPizza += "1." + pizzaData[0].name + " : " + pizzaData[0].count + ",   ";
      rankedPizza += "2." + pizzaData[1].name + " : " + pizzaData[1].count + ",   ";
      rankedPizza += "3." + pizzaData[2].name + " : " + pizzaData[2].count;
    }
    return (
      <div className="App">
        <Row justify="center" gutter={[16, 16]}>
          <Col span={3}>
            <img src={pizzaImage}/>
          </Col>
          <Col span={3}>
            <img src={pizzaImage}/>
          </Col>
          <Col span={3}>
            <img src={pizzaImage}/>
          </Col>
          <Col span={3}>
            <img src={pizzaImage}/>
          </Col>
          <Col span={3}>
            <img src={pizzaImage}/>
          </Col>
        </Row>

        <Row justify="center">
          <Col span={12} >
            <h1 style={{color: 'blue'}}>{rankedPizza}</h1>
          </Col>
        </Row>

        <Row justify="center">
          <Col span={8} >
            <Table columns={columns} dataSource={pizzaData} />
          </Col>
        </Row>

        <Row justify="center" gutter={[16, 16]}>
          <Col span={3}>
            <img src={pizzaImage}/>
          </Col>
          <Col span={3}>
            <img src={pizzaImage}/>
          </Col>
          <Col span={3}>
            <img src={pizzaImage}/>
          </Col>
          <Col span={3}>
            <img src={pizzaImage}/>
          </Col>
          <Col span={3}>
            <img src={pizzaImage}/>
          </Col>
        </Row>

        
      </div>
    );
  }
}

export default App;
