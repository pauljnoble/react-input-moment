# input-moment
React datetime picker powered by [momentjs](http://momentjs.com)

This is a fork of [input-moment](https://github.com/wangzuo/input-moment) that
aims to add more functionality and make less assumptions about environment.

**Notice:** This module requires [moment](https://www.npmjs.com/package/moment) as a [peerDependency](https://docs.npmjs.com/files/package.json#peerdependencies).

### Usage
``` javascript
<InputMoment
  moment={this.state.moment}
  onChange={this.handleChange}
  showSeconds={true}
  locale="en"
  />

<Calendar
  moment={this.state.moment}
  onChange={this.handleChange}
  locale="en"
  />

<Clock
  moment={this.state.moment}
  onChange={this.handleChange}
  showSeconds={true}
  locale="en"
  />
```
Every action the user takes in the chosen input will trigger the onChange prop.
If you only want to receive one event at the completion of the picking process,
there are a set of "buffered" components (BufferedInputMoment, BufferedCalendar,
BufferedClock) that add a "Save" button to the input that the user must press
to trigger the onChange prop.

Check [app.js](https://github.com/prometheusresearch/react-input-moment/blob/master/example/app.js)
for a working example.

### Development
- npm install
- npm start
- http://localhost:8888

### Work Left To Do
- Get rid of LESS/CSS in favor of using react-stylesheet.
- ES6-ify the code.

### License
ISC

