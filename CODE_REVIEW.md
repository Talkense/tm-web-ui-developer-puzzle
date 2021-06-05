[Are there any problems or code smells in the app? (Focus on code in the libs/books folder)]

- why is the folder inside of lib folder named +state ?

- Destructure Import syntax for actions to import only required action(s)

- unneccessary await on a non-promise

- The tslint.json was missing a number of recommended rules and best practices. This would come to bite us later as the project grows in size

- A good way to address this would be to include "extends": ["tslint:recommended", "tslint-sonarts"], in your tslint.json file

## Accessibility    
### Lighthouse issues fixed 

- Buttons do not have an accessible name 

- Background and foreground colors do not have a sufficient contrast ratio

