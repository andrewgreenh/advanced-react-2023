import { Key, ReactNode, useEffect, useState } from "react";

export function RenderProps() {
  return (
    <PageContent>
      <h1>RenderProps</h1>

      <ContentWithSidebar
        sidebarContent={({ width }) => <SidebarContent width={width} />}
        mainContent={<MainContent />}
      />
    </PageContent>
  );
}

function MainContent() {
  console.log("rerendered main content!");

  return (
    <>
      <h2>Main!</h2>
      <List
        items={[
          { id: 1, name: "Peter" },
          { id: 2, name: "Mary" },
        ]}
        renderItem={(user) => (
          <b>
            {user.name} <input type="checkbox" />
          </b>
        )}
        getItemKey={(user) => user.id}
      />
    </>
  );
}

function List<TItem>(props: {
  items: TItem[];
  renderItem: (item: TItem) => ReactNode;
  getItemKey: (item: TItem) => Key;
}) {
  return (
    <ul>
      {props.items.map((item) => (
        <li key={props.getItemKey(item)}>{props.renderItem(item)}</li>
      ))}
    </ul>
  );
}

function SidebarContent(props: { width: number }) {
  console.log("rerendered sidebar content!");

  useEffect(() => {
    console.log("hello!");
  }, []);

  return <h2>Sidebar! {props.width}</h2>;
}

function PageContent(props: { children: ReactNode }) {
  return <div className="mx-auto max-w-[700px]">{props.children}</div>;
}

function ContentWithSidebar(props: {
  sidebarContent: (props: { width: number }) => ReactNode;
  mainContent: ReactNode;
}) {
  const [width, setWidth] = useState(300);

  return (
    <>
      <input
        type="range"
        value={width}
        min={100}
        max={400}
        onChange={(e) => setWidth(parseInt(e.target.value))}
      />

      <div className="flex items-start gap-4">
        <div style={{ width }}>{props.sidebarContent({ width })}</div>
        <div>{props.mainContent}</div>
      </div>
    </>
  );
}
