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

  function onMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    const initialWidth = sidebarWidth;
    const initialX = e.clientX;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    function onMouseMove(e: MouseEvent) {
      const newX = e.clientX;
      const newWidth = initialWidth - initialX + newX;
      setSidebarWidth(newWidth);
    }
    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
  }

  return (
    <div>
      <input
        type="range"
        min={200}
        max={500}
        value={sidebarWidth}
        onChange={(e) => {
          setSidebarWidth(parseInt(e.target.value));
          // divRef.current!.style.width = e.target.value + "px";
        }}
      />
      {sidebarWidth}
      <div className="flex items-stretch gap-4">
        <div className="relative" style={{ width: sidebarWidth }}>
          {props.sidebarContent}
          <div
            className="absolute right-[-10px] h-full w-[20px] cursor-col-resize"
            onMouseDown={onMouseDown}
          >
            ↔️
          </div>
        </div>
        <div>{props.mainContent}</div>
      </div>
    </div>
  );
}
