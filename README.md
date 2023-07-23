# Get-it-done

## What I Learned

### React Portals

#### Issue:
When creating a Modal component, I had issues with the styling and behaviour of the modal. Especially to do with the z-index. This is because a parent element's styling can cause conflicts with the nested child's styling.

#### Resolution:

```js
return ReactDOM.createPortal (
  <>
  <div/>
    <div>
      {children}
    </div>
  </>,
  document.getElementById('portal') // Child component will be rendered here
)
```

By using the React createPortal API, I was able to insert a my modal in a more appropriate place in the DOM for an element that needs to be "above" the rest of the page. Also this approach prevents unwanted event propagation to the parent.

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