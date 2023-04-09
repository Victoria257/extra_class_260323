import { Component } from 'react';

export class App extends Component {
  render() {
    return (
      <div>
        <Button name={name} handlerClick={handlerClick} />
      </div>
    );
  }
}
