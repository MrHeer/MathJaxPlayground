import React, { ChangeEvent } from 'react';
import { Row, Col, Card } from 'antd';
import { Input } from 'antd';
import MathJax from 'react-mathjax2';
import styles from './index.css';

const { TextArea } = Input;

const tex = `f(x) = \\int_{-\\infty}^\\infty
    \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}
    \\,d\\xi`;

class Playground extends React.Component {

  state = {
    inputTex: tex,
  }

  handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      inputTex: e.target.value,
    });
  }

  render() {
    return (
      <Row gutter={16} className={styles.context}>
        <Col sm={12} xs={24}>
          <TextArea defaultValue={tex} onChange={this.handleInput} className={styles.textarea} />
        </Col>
        <Col sm={12} xs={24}>
          <Card className={styles.display}>
            <MathJax.Context input='tex'>
              <MathJax.Node>{this.state.inputTex}</MathJax.Node>
            </MathJax.Context>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Playground;
