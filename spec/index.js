// import {flatten, unflatten} from '../src/flattenizer';
// import * as specs from './flattenizerSpec.js';

 var testContext = require.context('./', true, '/index\.js$/');

testContext.keys().forEach(testContext);

var srcContext = require.context('../src/', true, '/flattenizer\.js$');

srcContext.keys().forEach(srcContext);