# Get-it-done

## What I Learned

### Prop Reactivity
 
#### Issue:
The `currentMatrix` value was not updating correctly within the `addItemToSection` function in the `Section` component, even though it was updating correctly elsewhere in the component.

#### Resolution:

```js
<Section
  key={`section_${currentMatrix.id}`}
  currentMatrix={currentMatrix}
  // Other props
/>
```

To resolve the issue, I passed a dynamic key to each `Section` component based on the `currentMatrix`, ensuring these would re-render with the correct value whenever the value changed.