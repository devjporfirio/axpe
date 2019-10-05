import React, { Component } from 'react';
import Slider from '../Slider';
import { Container } from './styles';

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  render() {
    return (
      <Container>
        <h4>First Slider</h4>
        <Slider
          asNavFor={this.state.nav2}
          reference={slider => (this.slider1 = slider)}
          slidesToShow={1}
        >
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
        </Slider>

        <h4>Second Slider</h4>
        <Slider
          asNavFor={this.state.nav1}
          reference={slider => (this.slider2 = slider)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
        </Slider>
      </Container>
    );
  }
}
