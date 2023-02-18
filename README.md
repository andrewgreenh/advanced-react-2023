# Advanced React in 2023

- [Introduction](#introduction)
  - [Who am I?](#who-am-i)
  - [Who are you?](#who-are-you)
  - [Before we start](#before-we-start)
- [Repository setup](#repository-setup)
- [Topics](#topics)
  - [TypeScript in React](#typescript-in-react)
    - [💪 01 First steps with TypeScript](#-01-first-steps-with-typescript)
  - [Relearn the principles of React](#relearn-the-principles-of-react)
    - [The rules of React](#the-rules-of-react)
      - [💪 02 Fix the rule breaks](#-02-fix-the-rule-breaks)
    - [State in React](#state-in-react)
    - [useEffect, useMemo \& useCallback](#useeffect-usememo--usecallback)
    - [Imperative APIs in React](#imperative-apis-in-react)
  - [Component Patterns](#component-patterns)
    - [Render Props](#render-props)
    - [Compound Components](#compound-components)
    - [The children prop](#the-children-prop)
  - [Additional topics](#additional-topics)
    - [Security in React](#security-in-react)
    - [Testing in React applications](#testing-in-react-applications)
    - [Common problems](#common-problems)

## Introduction

### Who am I?

- Andreas
- Developer, Trainer, Speaker
- Web technologies with main focus on TypeScript & React

### Who are you?

- Name
- Experience
- Expectations for the workshop

### Before we start

- Be curious
- Be open

## Repository setup

- Bundler/dev server: [Vite](https://vitejs.dev/)
- Styles: [Tailwind CSS](https://tailwindcss.com/)
- Tools:
  - [TypeScript](https://www.typescriptlang.org/)
  - [Prettier](https://prettier.io/)
  - [eslint](https://eslint.org/) - No checking of codestyle, formatting, and anything TypeScript already checks
- Testing:
  - [Vitest](https://vitest.dev/) - like jest but integrates with vite and is much faster

## Topics

### TypeScript in React

- TypeScript is a super set of JavaScript that adds static types
- No need to define classes or interfaces all over the place

#### 💪 01 First steps with TypeScript

Open `src/exercises/01-first-steps-with-typescript/FirstStepsWithTypeScript.tsx`

**Part 1**

- Create a new component `SimpleCounterButton`. This component should:
  - Render a button that starts with the number 10
  - When clicking on the button, the counter should be incremented by 1
  - Display the current count on the button
- Render the button in the FirstStepsWithTypeScript component.
- Make sure, that `npm run test` run without any errors or warnings.

**Part 2**

- The SimpleCounterButton should receive a prop "incrementBy". Users of our component should be able to pass in a number that changes the incrmenetation amount. (Instead of always incrementing by 1, the counter should increment by `incrementBy` on every click)
- Users of our component should additionally be able to pass in a `style` object, that will be forwarded to the `style`-prop of the `button` element that is rendered within the SimpleCounterButton. Example: `<SimpleCounterButton incrementBy={5} style={{ border: 10px solid blue }} />` should render a button with a thick blue border.

**Part 3**

- Create a new component `RandomNumbers`, that displays a new random number every 5 seconds. For the first 5 seconds, a text `Generating a new number` should be displayed, which is then replaced by the first random number after 5 seconds.
- Render the component next to the SimpleCounterButton.

### Relearn the principles of React

Goal: Understand React instead of just using React

#### The rules of React

- Render functions must be pure
- Everything created connection to the outside world must be destroyed at some point in time
- Don't update data, replace it (immutable updates)

##### 💪 02 Fix the rule breaks

- Open `src/exercises/02-fix-the-rule-breaks/FixTheRuleBreaks.tsx`
- Find all the places where one of React's rules is broken
- **Before fixing it** try to think of a situation in which this rule break would cause problems
- Fix the rule break

#### State in React

- one source (URL, state, localstorage, etc.)

#### useEffect, useMemo & useCallback

#### Imperative APIs in React

### Component Patterns

#### Render Props

#### Compound Components

#### The children prop

### Additional topics

#### Security in React

#### Testing in React applications

#### Common problems

- Too many states
- Too many useEffects
- Missing cleanups
- Missing dependencies
- Mutations of state
- Side effects in render
- Error-case not handled

<link rel="stylesheet" href="./README.css">
<script src="./README.js"></script>
