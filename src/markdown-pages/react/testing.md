---
title: "React: Testing"
date: 2024-10-13
tags:
  - framework
  - ui
  - testing
---

## Child Component Props

- Child component is already tested
- Need to validate correct props
- Settings would likely be a custom hook and validating that it loaded

Based off of: https://x.com/kentcdodds/status/1189662486007468032

component

```javascript
// settings: {enabled: true}
export const MyComponent = ({ settings }) => {
  const [settings, setSettings] = useState({enabled: true}) 
  return <>
    <div>example text</div>
    <MyChildComponent settings={settings} />
  </>;
};
```

test

```javascript
import { MyChildComponent } from "./MyChildComponent";

jest.mock("./MyChildComponent");

test("should load settings", async () => {
renderWithProviders(<MyComponent />);

expect(MyChildComponent).toHaveBeenCalledWith(
    {
    settings: {enabled: true},
    },
    {}, // context
);
});
```

## Async useEffect

- Async useEffect can cause an Act warning in tests. 
- See https://github.com/testing-library/react-testing-library/issues/667#issuecomment-628273598 for solution/answers

```javascript
test(`default settings`, async () => {
    renderWithProviders(
    <MyComponent />,
    );

    const divElem = await screen.findByText('example text'); // getByText will throw Act warning if there is async in a useEffect

    expect(divElem).toBeTruthy();

    // tests without an asnyc function could wrap the renderWithProviders
    // await act(async () => {
    //     await renderWithProviders(<MyComponent />);
    // });
});
```