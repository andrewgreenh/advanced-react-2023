import { createContext, ReactNode, useContext, useState } from "react";

export function CompoundComponents() {
  return (
    <PageContent>
      <h1>Compound Components</h1>

      <ContentWithSidebar
        sidebarContent={<SidebarContent />}
        mainContent={<MainContent />}
      />

      <ContentWithSidebar
        sidebarContent={<SidebarContent />}
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
      <SidebarResetButton>
        <b>Reset sidebar width!</b>
      </SidebarResetButton>
    </>
  );
}

function SidebarContent() {
  console.log("rerendered sidebar content!");

  return (
    <h2>
      Sidebar! <SidebarWidthDisplay />
    </h2>
  );
}

function PageContent(props: { children: ReactNode }) {
  return <div className="mx-auto max-w-[700px]">{props.children}</div>;
}

/**
 * LIBRARY CODE HERE
 */

const SidebarContext = createContext<{
  width: number;
  setWidth: (newWidth: number) => void;
} | null>(null);

function ContentWithSidebar(props: {
  sidebarContent: ReactNode;
  mainContent: ReactNode;
}) {
  const [width, setWidth] = useState(300);

  return (
    <SidebarContext.Provider value={{ width, setWidth }}>
      <input
        type="range"
        value={width}
        min={100}
        max={400}
        onChange={(e) => setWidth(parseInt(e.target.value))}
      />

      <div className="flex items-start gap-4">
        <div style={{ width }}>{props.sidebarContent}</div>
        <div>{props.mainContent}</div>
      </div>
    </SidebarContext.Provider>
  );
}

function useSidebarContext() {
  const contextValue = useContext(SidebarContext);

  if (!contextValue) throw new Error("No SidebarContext.Provider found");

  return contextValue;
}

function SidebarWidthDisplay() {
  const { width } = useSidebarContext();

  return <>{width}</>;
}

function SidebarResetButton(props: { children: ReactNode }) {
  const { setWidth } = useSidebarContext();
  return <button onClick={() => setWidth(300)}>{props.children}</button>;
}
