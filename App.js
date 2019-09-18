import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Button from './src/components/Button'
import Display from './src/components/Display'

const initState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  keyCurrent: 0
}

class App extends Component {

  state = { ...initState }

  addDigito = (value) => {
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
    if (value == '.' && !clearDisplay && this.state.displayValue.includes('.')) return
    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + value
    this.setState({ displayValue, clearDisplay: false })
    if (value !== '.') {
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.keyCurrent] = newValue
      this.setState({ values })
    }
  }

  clearMemory = () => {
    this.setState({ ...initState })
  }

  setOperation = (operation) => {
    if (this.state.keyCurrent == 0) {
      this.setState({ keyCurrent: 1, operation, clearDisplay: true })
    } else {
      const equals = operation == '='
      const values = [...this.state.values]

      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      } catch (e) {
        values[0] = this.state.values[0]
      }

      values[1] = 0
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        keyCurrent: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>

          <Button label="AC" triple onClick={this.clearMemory} />
          <Button label="/" operation onClick={() => this.setOperation('/')} />
          <Button label="7" onClick={() => this.addDigito('7')} />
          <Button label="8" onClick={() => this.addDigito('8')} />
          <Button label="9" onClick={() => this.addDigito('9')} />
          <Button label="*" operation onClick={() => this.setOperation('*')} />
          <Button label="4" onClick={() => this.addDigito('4')} />
          <Button label="5" onClick={() => this.addDigito('5')} />
          <Button label="6" onClick={() => this.addDigito('6')} />
          <Button label="-" operation onClick={() => this.setOperation('-')} />
          <Button label="1" onClick={() => this.addDigito('1')} />
          <Button label="2" onClick={() => this.addDigito('2')} />
          <Button label="3" onClick={() => this.addDigito('3')} />
          <Button label="+" operation onClick={() => this.setOperation('+')} />
          <Button label="0" double onClick={() => this.addDigito('0')} />
          <Button label="." onClick={() => this.addDigito('.')} />
          <Button label="=" operation onClick={() => this.setOperation('=')} />

        </View>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default App;
