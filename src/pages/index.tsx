import { FC, useEffect, useRef, useState } from 'react';
import { Row, Col } from 'antd';
import MathJax from 'react-mathjax2';
import { MonacoBinding } from 'y-monaco';
import { WebrtcProvider } from 'y-webrtc';
import * as Y from 'yjs';
import * as monaco from 'monaco-editor';
import styles from './index.css';

const tex = `f(x) = \\int_{-\\infty}^\\infty
    \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}
    \\,d\\xi`;

const Playground: FC = () => {
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>();
  const [inputValue, setInputValue] = useState<string>(tex);

  useEffect(
    () => {
      const mEditor = editor.current;
      if (mEditor) {
        mEditor.onDidChangeModelContent(() => {
          const value = mEditor.getValue();
          setInputValue(value);
        });
      }
    },
    [editor.current],
  );

  return (
    <Row gutter={[16, 16]} className={styles.content}>
      <Col xs={24} xl={12} style={{ height: '100%' }}>
        <div
          ref={editorRef => {
            if (editorRef && !editor.current) {
              const yDoc = new Y.Doc();
              const yText = yDoc.getText('monaco');
              const provider = new WebrtcProvider('mathjax-playground', yDoc);
              editor.current = monaco.editor.create(editorRef, {
                value: tex,
                language: 'tex',
              });
              new MonacoBinding(
                yText,
                editor.current.getModel(),
                new Set([editor.current]),
                provider.awareness,
              );
            }
          }}
          style={{ height: '100%' }}
        />
      </Col>
      <Col xs={24} xl={12} style={{ height: '100%' }}>
        <div className={styles.display}>
          <MathJax.Context input="tex">
            <MathJax.Node>{inputValue}</MathJax.Node>
          </MathJax.Context>
        </div>
      </Col>
    </Row>
  );
};

export default Playground;
