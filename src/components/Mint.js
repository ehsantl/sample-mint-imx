import React, { Component } from 'react';
import { Card, Divider } from 'antd';

class Mint extends Component {

    state = {
      collectionName: '',
      collectionDescription: '',
      collectionImageUrl: ''
    };

    constructor(props) {
      super(props);
    }

    componentDidMount() {
      const options = {method: 'GET', headers: {Accept: 'application/json'}};
      fetch('https://api.ropsten.x.immutable.com/v1/collections/0x4303ec898647A780720564F2456E5D8b960d7377', options)
        .then(response => response.json())
        .then(response => {          
          this.setState({
            collectionName: response.name,
            collectionDescription: response.description,
            collectionImageUrl: response.collection_image_url
          });
          console.log(response)

        })
        .catch(err => console.error(err));
    }

    render() {
      const { Meta } = Card;

        return (
          <div>
            <h1>Mint</h1>
            <Divider />
            <h2>Collection</h2>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={this.state.collectionImageUrl} />}
            >
              <Meta title={this.state.collectionName} description={this.state.collectionDescription} />
            </Card>

          </div>
        );
    }
}

export default Mint;

