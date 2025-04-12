

## useState

- Async useState is not possible, it will be a promise.
- getDefaultPrefs is an async function reading from disk
- useEffect needs an inner function to be async

```javascript
  const [settings, setSettings] = React.useState(getDefaultPrefs);

  React.useEffect(() => {
    (async () => {
      const userSettings = await getSettings();
      setSettings(userSettings);
    })();
  }, []);

  React.useEffect(() => {
    console.log("s: ", settings);
    //   const settings = await getSettings();
  }, [settings]);
```