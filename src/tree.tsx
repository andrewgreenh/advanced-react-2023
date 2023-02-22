type Node = {
  type: "dir";
  name: string;
  contents: Node[];
};
const x: Node = {
  type: "dir",
  name: "a",
  contents: [
    {
      type: "dir",
      name: "b",
      contents: [],
    },
    {
      type: "dir",
      name: "c",
      contents: [],
    },
  ],
};

function flattenNodes(
  node: Node,
  level: number
): { level: number; name: string }[] {
  return [
    { level, name: node.name },
    ...node.contents.flatMap((childNode) => flattenNodes(childNode, level + 1)),
  ];
}

const flatList = flattenNodes(x, 0);
console.log(flatList);

function Tree(props: { node: Node }) {
  return (
    <>
      <h1>{props.node.name}</h1>
      {props.node.contents.map((node) => (
        <div key={node.name}>
          <Tree node={node} />
        </div>
      ))}
    </>
  );
}
