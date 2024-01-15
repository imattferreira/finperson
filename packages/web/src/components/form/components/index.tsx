import { lazy } from 'solid-js';

import Input from './input';

const Form = {
  Control: lazy(() => import('./control')),
  Input
};

export default Form;
