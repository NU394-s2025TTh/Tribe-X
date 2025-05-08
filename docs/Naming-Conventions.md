Write your naming convention and approach here. see [Some Thoughts on Naming](Some-Thoughts-on-Naming.md)

## File Structure

We are planning on using the common method of separating by structure functionally (i.e., React components). Components that are used by multiple default pages go in a components folder. Hooks and css will go in the same folder for each js/jsx/tsx component. We are not planning to have components placed in sub-folders, but might change if necessary. The benefit of this will be that the styling and hooks can be placed in the folder, but the disadvantage is the hierarchy gets deeper it might be easy to get confused. Most of us seemed more comfortable with this format though so we don't anticipate too many confusions.

## Naming

We liked these naming conventions from the web and AI bots:

1. **Component Names**: Use PascalCase for React components. This helps React distinguish between components and HTML elements.
2. **File Names**:
   - For non-component files, camelCase or kebab-case is common.
   - For component files, stick with PascalCase to match the component names.
3. **Folders**: Keep main directories lowercase to differentiate them from components.
4. **CSS Modules**: If you’re using CSS modules, use camelCase for class names to maintain consistency with JavaScript naming conventions.
5. **TypeScript Types and Interfaces**: Prefix interfaces with an I, like IProps or IState, to distinguish them from classes and other types. Though there are a lot of people who disagree with using the "I".
6. **Event Handlers**: Start the names with handle, such as handleClick or handleInputChange.
7. **State Variables**: Use descriptive names that reflect their purpose, like isLoading or userList.
8. **Props**: Be descriptive and clear. For example, instead of data, use userData or profileData.
9. **Hooks**: For custom hooks, use the use prefix, like useAuth or useFormInput.
