'use strict';

import express from 'express';
import process from 'process';
import fs from 'fs';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import path from 'path';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const useYarn = fs.existsSync(paths.yarnLockFile);
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const routes = [
    '/',
    '/input',
    '/projects/tweet-saver'
];


function handleRender(req, res) {
  const store = createStore({});
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );
  
  const preloadedState = store.getState();
  res.send(renderFullPage(html, preloadedState));
}

function renderFullPage(html, preloadedState) {

}


export default function router(req, res) {
  const match = routes.indexOf(req.url);
  
  if (match == -1) {
      res.status(404).send('page not found');
      return;
  }

  const context = {};
  const html = renderToString(
    <StaticRouter context={context} location={req.url} >
      <Index />
    </StaticRouter>
  );

  return res.status(200).send(renderFullPage(html));
}


