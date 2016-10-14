/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


function countReducer (state = {}, action) {

  switch (action.type) {
    case 'COUNT':
      return { ...state, count: (state.count || 0) + 1 };
    default:
      return state;
  }
}

export default countReducer;
