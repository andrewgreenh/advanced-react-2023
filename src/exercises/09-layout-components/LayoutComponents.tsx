import { ReactNode, useState } from "react";

export function LayoutComponents() {
  return (
    <PageContent>
      <h1>Layout Components</h1>

      <ContentWithSidebar
        sidebarContent={<SidebarContent />}
        mainContent={<MainContent />}
      />
    </PageContent>
  );
}

function MainContent() {
  console.log("rerendered main content!");

  return <h2>Main!</h2>;
}

function SidebarContent() {
  console.log("rerendered sidebar content!");

  return <h2>Sidebar!</h2>;
}

function PageContent(props: { children: ReactNode }) {
  return <div className="mx-auto max-w-[700px]">{props.children}</div>;
}

// const x = <SidebarContent key="test" />;
// console.log(x);

function ContentWithSidebar(props: {
  sidebarContent: ReactNode;
  mainContent: ReactNode;
}) {
  const [width, setWidth] = useState(300);

  // const sidebar = useMemo(() => <SidebarContent key="test" />, []);

  return (
    <>
      <input
        type="range"
        value={width}
        min={100}
        max={400}
        onChange={(e) => setWidth(parseInt(e.target.value))}
      />
      {/* <SidebarContent key="test" /> */}
      {/* {sidebar} */}
      {/* {x} */}
      <div className="flex items-start gap-4">
        <div style={{ width }}>{props.sidebarContent}</div>
        <div>{props.mainContent}</div>
      </div>
    </>
  );
}
