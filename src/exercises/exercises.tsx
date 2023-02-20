import { ReactNode } from "react";
import { Outlet, RouteObject } from "react-router-dom";
import { FirstStepsWithTypeScript } from "./01-first-steps-with-typescript/FirstStepsWithTypeScript";
import { FixTheRuleBreaks } from "./02-fix-the-rule-breaks/FixTheRuleBreaks";
import { ImpossibleState } from "./03-impossible-state/ImpossibleState";
import { ExplicitStates } from "./04-explicit-states/ExplicitStates";
import { UnnecessaryUseEffects } from "./05-unnecessary-use-effects/UnnecessaryUseEffects";
import { SyncWithTheOutsideWorld } from "./06-sync-with-the-outside-world/SyncWithTheOutsideWorld";
import { FightingDependencies } from "./07-fighting-dependencies/FightingDependencies";
import { ImperativeAPIs } from "./08-imperative-apis/ImperativeAPIs";
import { LayoutComponents } from "./09-layout-components/LayoutComponents";
import { RenderProps } from "./10-render-props/RenderProps";
import { CompoundComponents } from "./11-compound-components/CompoundComponents";
import { ExerciseWrapper } from "./ExerciseWrapper";

export const exercises = defineExercises([
  {
    title: "First steps with TypeScript",
    element: <FirstStepsWithTypeScript />,
  },
  {
    title: "Fix the rule breaks",
    element: <FixTheRuleBreaks />,
  },
  {
    title: "Impossible state",
    element: <ImpossibleState />,
  },
  {
    title: "Explicit states",
    element: <ExplicitStates />,
  },
  {
    title: "Unnecessary useEffects",
    element: <UnnecessaryUseEffects />,
  },
  {
    title: "Sync with the outside world",
    element: <SyncWithTheOutsideWorld />,
  },
  {
    title: "Fighting Dependencies",
    element: <FightingDependencies />,
  },
  {
    title: "Imperative APIs",
    element: <ImperativeAPIs />,
  },
  {
    title: "Layout Components",
    element: <LayoutComponents />,
  },
  {
    title: "Render Props",
    element: <RenderProps />,
  },
  {
    title: "Compound Components",
    element: <CompoundComponents />,
  },
]);

export const exerciseRoute: RouteObject = {
  path: "/exercises/*",
  element: (
    <ExerciseWrapper>
      <Outlet />
    </ExerciseWrapper>
  ),
  children: exercises.map((e, index) => ({
    path: `${e.key}`,
    element: e.element,
  })),
};

type ExerciseDefinition = {
  title: string;
  element: ReactNode;
};

function defineExercises(exerciseDefinition: ExerciseDefinition[]) {
  return exerciseDefinition.map((e, i) => ({
    ...e,
    key: `${(i + 1).toString().padStart(2, "0")}`,
  }));
}
