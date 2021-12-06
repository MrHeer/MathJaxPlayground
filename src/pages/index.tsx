import { FC, useCallback, useEffect, useRef, useState } from 'react';
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
  const editorRef = useRef<HTMLDivElement>();
  const cleanupRef = useRef<() => void>();
  const [inputValue, setInputValue] = useState<string>(tex);

  // https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
  const setEditorRef = useCallback((node: HTMLDivElement) => {
    if (editorRef.current) {
      cleanupRef?.current?.();
    }

    if (node !== null) {
      const yDoc = new Y.Doc();
      const yText = yDoc.getText('monaco');
      const provider = new WebrtcProvider('mathjax-playground', yDoc);
      const editor = monaco.editor.create(node, {
        value: tex,
        language: 'tex',
      });
      const monacoBinding = new MonacoBinding(
        yText,
        editor.getModel(),
        new Set([editor]),
        provider.awareness,
      );
      editor.onDidChangeModelContent(() => {
        const value = editor.getValue();
        setInputValue(value);
      });

      cleanupRef.current = () => {
        monacoBinding.destroy();
        provider.destroy();
      };
    }

    editorRef.current = node;
  }, []);

  return (
    <Row gutter={[16, 16]} className={styles.content}>
      <Col xs={24} xl={12} style={{ height: '100%' }}>
        <div ref={setEditorRef} style={{ height: '100%' }} />
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
