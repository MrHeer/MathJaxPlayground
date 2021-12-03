import React, { ChangeEvent } from 'react';
import { Row, Col } from 'antd';
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
  };

  handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      inputTex: e.target.value,
    });
  };

  render() {
    return (
      <Row gutter={[16, 16]} className={styles.content}>
        <Col xs={24} xl={12} style={{ height: '100%' }}>
          <div style={{ height: '100%' }}>
            <TextArea
              autoSize={false}
              defaultValue={tex}
              onChange={this.handleInput}
              className={styles.textarea}
            />
          </div>
        </Col>
        <Col xs={24} xl={12} style={{ height: '100%' }}>
          <div className={styles.display}>
            <MathJax.Context input="tex">
              <MathJax.Node>{this.state.inputTex}</MathJax.Node>
            </MathJax.Context>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Playground;
