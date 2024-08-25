# Code Review Comments on the initial code 

### General Comments
- The current folder structure is fine for smaller projects, but is not scalable. As the project becomes bigger, it will become hard to maintain. Its better to have a grouping by modules/features.
- Too much logic inside ``App.js``. This monolithic organisation is not scalable. Its better to have component specific code inside the respective files.
- Many instances where components can be divided into smaller components.

### App.js
- ``viewTrailer`` method can be taken out into a separate file in the utils folder, and can be called directly from the component rather than passing as props
- ``getMovie`` logic should be moved to the slice instead of calling ``fetch`` inside the component.
- Many unused variables/items, which should have been removed

### Movie.jsx
- unused prop ``closeCard``
- lint error: ``e`` is already defined (line number 16)
- can be broken down into smaller components (like a separate component for the info panel)
- can use better variable names, which explain what is being done (have used ``e`` at a lot of places)
- can reverse the conditions inside the JSX code. Instead of using ``!starred.starredMovies.map(movie => movie.id).includes(movie.id)`` for if, the other way around would have been more readable (checking for positive values instead of negations)

### Movies.jsx
- the logic for movies should be inside the movies component, not inside ``App.jsx``. Having the code inside ``Movies.jsx`` makes the component more reusable
- since we are not using typescript, its advisable to check the prop types.

### constants.js
- endpoints were improperly created. Had to be modified