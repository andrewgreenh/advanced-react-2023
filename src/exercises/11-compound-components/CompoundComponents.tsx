import { createContext, ReactNode, useContext, useState } from "react";

export function CompoundComponents() {
  return (
    <>
      <ContentWithSidebar
        sidebarContent={<SidebarContent />}
        mainContent={<MainContent />}
      />
    </>
  );
}

function SidebarContent() {
  console.log("SidebarContent rerendered");

  const { width } = useSidebarContext();
  return (
    <>
      <h1>Sidebar! {width}</h1>
      <SidebarWidthDisplay />
    </>
  );
}

function MainContent() {
  console.log("MainContent rerendered");
  return (
    <PageContent>
      <h1>Compound Components</h1>
      <ResetSidebarWidthButton />
    </PageContent>
  );
}

function PageContent(props: { children: ReactNode }) {
  return <div className="mx-auto max-w-[700px]">{props.children}</div>;
}

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
    <sidebarContext.Provider
      value={{ width: sidebarWidth, update: setSidebarWidth }}
    >
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
    </sidebarContext.Provider>
  );
}

const sidebarContext = createContext<{
  width: number;
  update: (newWidth: number) => void;
} | null>(null);

function useSidebarContext() {
  const contextValue = useContext(sidebarContext);

  if (!contextValue) {
    throw Error("No SidebarContext found.");
  }

  return contextValue;
}

function SidebarWidthDisplay() {
  const context = useSidebarContext();

  return <>{context.width}</>;
}

function ResetSidebarWidthButton() {
  const context = useSidebarContext();

  return <button onClick={() => context.update(300)}>Reset width</button>;
}
