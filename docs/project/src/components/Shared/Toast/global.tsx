import React, { PureComponent } from 'react';

import Toast from '.';

interface IState {
  opened: boolean;
  message?: string;
  error?: any;
  timeout?: number;
}

let lastPromise = Promise.resolve();
let globalToast: (message: string, timeout?: number) => Promise<void>;

export default class ToastGlobalProvider extends PureComponent<{}, IState> {
  promiseResolve: () => void;

  constructor(props: {}) {
    super(props);
    this.state = { opened: false };
  }

  static async show(message: string, timeout?: number): Promise<void> {
    if (!globalToast) throw new Error('Please, initialize an Toast.Global before');

    //prevent an Toast to overhide another
    return lastPromise = lastPromise.then(async () => {
      await new Promise(resolve => setTimeout(() => resolve(), 500));
      return globalToast(message, timeout);
    });
  }

  componentDidMount() {
    if (globalToast) throw new Error('Only one Toast.Global can be initialized');
    globalToast = this.show;
  }

  show = (message: string, timeout?: number): Promise<void> => {
    const result = new Promise<void>(resolve => {
      this.promiseResolve = resolve;
      this.setState({ opened: true, message, timeout });
    });

    result.then(() => this.setState({ opened: false }));
    return result;
  }

  handleClose = () => {
    this.promiseResolve && this.promiseResolve();
  }

  render() {
    const { opened, message, timeout } = this.state;

    return (
      <Toast
        opened={opened}
        message={message}
        timeout={timeout}
        onClose={this.handleClose}
      />
    );
  }
}