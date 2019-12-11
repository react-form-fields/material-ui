/* eslint-disable @typescript-eslint/no-require-imports */
import cloneDeep = require('lodash/cloneDeep');
import isEqual = require('lodash/isEqual');
import { DependencyList, useCallback, useEffect, useRef, useState } from 'react';

export default function useModel<T>(initialState: Partial<T> = {}) {
  const [freezeInitalState] = useState(cloneDeep(initialState));
  const [model, setModel] = useState(cloneDeep(initialState));
  const [dirty, setDirty] = useState(false);
  const handlers = useRef<{ [key: string]: { deps: DependencyList; callback: (value: any) => void } }>({}).current;

  const modelRef = useRef(model);

  useEffect(() => {
    modelRef.current = model;
  });

  const setModelCallback = useRef(
    (key: string, handler: (model: Partial<T>, value: any) => void, deps: DependencyList = []) => {
      const currentHandler = handlers[key];
      let needUpdate = !currentHandler || !isEqual(currentHandler.deps, deps);

      if (needUpdate) {
        handlers[key] = {
          deps,
          callback: (value: any) => {
            const newModel = cloneDeep(modelRef.current);
            handler(newModel, value);
            setModel(newModel);
            setDirty(true);
          }
        };
      }

      return handlers[key].callback;
    }
  ).current;

  const cleanModel = useCallback(() => {
    setModel(cloneDeep(freezeInitalState));
    setDirty(false);
  }, [freezeInitalState]);

  return [model, setModelCallback, setModel, dirty, cleanModel] as [
    typeof model,
    typeof setModelCallback,
    typeof setModel,
    typeof dirty,
    typeof cleanModel
  ];
}
