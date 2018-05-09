import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {AppContainer} from 'react-hot-loader';
import Root from './Root';

const root = document.querySelector('#root');

const mount = (RootComponent) => {
  render(
    <AppContainer>
      <BrowserRouter>
        <RootComponent/>
      </BrowserRouter>
    </AppContainer>,
    root
  );
};

mount(Root);
