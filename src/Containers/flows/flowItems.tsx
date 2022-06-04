import { FlowEdges, FlowNodes } from "./Types/flowTypes";
//@ts-ignore
import styled from 'styled-components';

export const principalsNodesName : string[] = ['init', 'contentGroup', 'content'];
const blockPrincipalNodes : string[] = [
    'position', 
    'remove'
];

export const principalsNodes = (nodeName: string) => {

    const filter = (principalsNodesName).some(id => id == nodeName);

    return filter;
}

export const principalsNodesChanges = (change: string) => {

    const filter = (blockPrincipalNodes).some(id => id != change);

    return filter;
}

const GroupTitle = styled.div`
`;

const groupSize = {
    width: 300,
    height: 300,
}

const groups: FlowNodes[] = [
    {
        id: principalsNodesName[1],
        type: 'group',
        position: { x: -100, y: -20 },
        style: {
            width: groupSize.width,
            height: groupSize.height,
        },
    },
];

export const initialNodes: FlowNodes[] = [
    ...groups,
    {
        id: principalsNodesName[0],
        data: { 
            label: <>
                <h4>Bloco Inicial</h4> <br />
                O Fluxo inicia com o bloco seguinte, vá para o próximo bloco
            </> 
        },
        type: 'input',
        style: {
            background: '#D6E4B7'
        },
        position: { x: -400, y: -35 }
    },
    {
        id: principalsNodesName[2],
        data: { label: <GroupTitle>Conteúdo</GroupTitle> },
        style: {
            width: groupSize.width,
            background: '#FFD6D1'
        },
        type: 'output',
        dragHandle: '.no-drag',
        position: { x: 0, y: -35 },
        parentNode: principalsNodesName[1],
        extent: 'parent',
    },
];

export const initialEdges: FlowEdges[] = [
    { id: 'input', source: 'init', target: principalsNodesName[2] },
    // { id: 'output', source: 'input', target: 'output' }
];
