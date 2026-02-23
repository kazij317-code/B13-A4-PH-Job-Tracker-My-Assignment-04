## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

<!-- Ans: -->

getElementById(): 
Selects a single element by its unique ID and returns one element or null.

getElementsByClassName(): 
Selects multiple elements by class name and returns a live HTMLCollection.

querySelector(): 
Selects the first matching element using a CSS selector and returns one element.

querySelectorAll(): 
Selects all matching elements using a CSS selector and returns a static NodeList.

### 2. How do you create and insert a new element into the DOM?

<!-- Ans: -->

Create the element: 
Use the document.createElement() method

insert a new element: 
Use the append(), appendChild(), or insertBefore().


### 3. What is Event Bubbling? And how does it work?

<!-- Ans: -->

Event Bubbling:
Event Bubbling is a process in JavaScript where an event starts from the target element and then propagates upward to its parent elements.

How It Works:
When we click on a child element:

The event triggers on the target element first.

Then it moves up to its parent.

Then to the grandparent.

And continues up to the document.

### 4. What is Event Delegation in JavaScript? Why is it useful?

<!-- Ans: -->

Event Delegation:
Event Delegation is a technique where we attach a single event listener to a parent element to handle events for its child elements using event bubbling.

Usefulness:
Improves performance (fewer event listeners)

Works for dynamically added elements

Cleaner and more efficient code

### 5. What is the difference between preventDefault() and stopPropagation() methods?

<!-- Ans: -->

preventDefault() stops the browser’s default action, while stopPropagation() stops the event from bubbling to parent elements.