//@ts-nocheck

import React, { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, EdgeChange, MiniMap, NodeChange } from 'react-flow-renderer';
import { initialEdges, initialNodes, principalsNodes, principalsNodesChanges, principalsNodesName } from './flowItems';
import styled from 'styled-components';
import { FlowNodes } from './Types/flowTypes';

interface PageProps {
  width: string;
  height: string;
}

function Flow({ width, height }: PageProps) {

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const getNodeId = () => `randomnode_${+new Date()}`;

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {

      //* block principal actions
      changes.filter((change) => {
        if (principalsNodes(change.id) && principalsNodesChanges(changes.type))
          delete change.type;

        return change;
      });

      setNodes((nds) => {
        return applyNodeChanges(changes, nds)
      })

      //* detect selected
      changes.forEach((change) => {
        if (change.type == 'select' && change.selected == true) {
          const idOfChange = change.id;
          console.log(change)
        }
      });

      console.log('NODE:', changes[0]);

    }, [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {

      //* block principal actions
      changes.filter((change) => {
        if (principalsNodes(change.id) && principalsNodesChanges(changes.type))
          delete change.type;

        return change;
      });

      setEdges((eds) => applyEdgeChanges(changes, eds));

      console.log('EDGE:', changes[0]);
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onAdd = useCallback((form) => {
    const nodeQuest = form.querySelector('.nodeQuest');

    const attribName: string = (nodeQuest.value == '') ? `Objeto` : nodeQuest.value;

    const newNode: FlowNodes = {
      id: getNodeId(),
      data: { label: attribName },
      position: { x: 10, y: 10 },
      // type: nodeType.value,
      extent: 'parent',
      parentNode: principalsNodesName[1]
    };
    setNodes((nds) => nds.concat(newNode));


  }, [setNodes]);

  function handleForm(e: any) {
    e.preventDefault();

    const form = e.target;

    onAdd(form);
  }

  return <ReactFlow
    nodes={nodes}
    edges={edges}
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    onConnect={onConnect}
    style={{ width, height, position: 'absolute' }}
    fitView
  >
    <Background variant='dots' color='#333' />
    <FlowForm>
      <h3>Editor</h3> <br />
      <form onSubmit={(e) => handleForm(e)}>
        <input type="text" className='nodeQuest' placeholder='Digite sua mensagem...' /> <br />
        <br />
        Tipo:
        <select name="nodeType">
          <option value="" selected>Padrão</option>
          <option value="input">Entrada</option>
          <option value="output">Saída</option>
        </select>
        <button type='submit'>Adicionar objeto</button>
      </form>
    </FlowForm>
    <MiniMap />
    <Controls />
  </ReactFlow>
}

function FlowForm(props: any) {

  const [editorOpen, setEditorOpen] = useState(true);

  const FlowEditor = styled.div`
    background: #f9f9f9;
    position: absolute;
    z-index: 100;
    left: 10px;
    top: 10px;
    width: 300px;
    padding: 10px;
    min-height: 200px;
    box-shadow: 0px 0px 5px #ccc;
    display: ${editorOpen ? 'block' : 'none'};
    opacity: 0.6;
    transition: opacity 0.3s;

    &:hover {
      opacity: 1;
    }

  `;

  const CloseEditor = styled.button`
    color: #000;
    cursor:pointer;
    border: 0;
    float: right;
    font-size: 20px;
    background: transparent;
  `;

  return (
    <FlowEditor isOpen={editorOpen}>
      <CloseEditor onClick={() => setEditorOpen(false)}>X</CloseEditor>
      {props.children}
    </FlowEditor>
  );
}

export default Flow;