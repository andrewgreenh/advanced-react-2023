import { ReactNode, useState } from "react";

export function LayoutComponents() {
  return (
    <ContentWithSidebar
      sidebarContent={<SidebarContent />}
      mainContent={<MainContent />}
    />
  );
}

function SidebarContent() {
  console.log("SidebarContent rerendered");
  return <h1>Sidebar!</h1>;
}

function MainContent() {
  console.log("MainContent rerendered");
  return (
    <PageContent>
      <h1>Layout Components</h1>
    </PageContent>
  );
}

function PageContent(props: { children: ReactNode }) {
  return <div className="mx-auto max-w-[700px]">{props.children}</div>;
}

// const content = <MainContent />;

function ContentWithSidebar(props: {
  mainContent: ReactNode;
  sidebarContent: ReactNode;
}) {
  const [sidebarWidth, setSidebarWidth] = useState(300);
  // const divRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <input
        type="range"
        min={200}
        max={500}
        onChange={(e) => {
          setSidebarWidth(parseInt(e.target.value));
          // divRef.current!.style.width = e.target.value + "px";
        }}
      />
      {sidebarWidth}
      <div className="flex items-start gap-4">
        <div style={{ width: sidebarWidth }}>{props.sidebarContent}</div>
        <div>{props.mainContent}</div>
      </div>
    </div>
  );
}
