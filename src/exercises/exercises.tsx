import { ReactNode } from "react";
import { Outlet, RouteObject } from "react-router-dom";
import { FirstStepsWithTypeScript } from "./01-first-steps-with-typescript/FirstStepsWithTypeScript";
import { FixTheRuleBreaks } from "./02-fix-the-rule-breaks/FixTheRuleBreaks";
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
