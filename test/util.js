
/**
 * Get the text of the element described by selector
 *
 * @export
 * @param {any} shallowWrapper return of Enzyme's 'shallow'
 * @param {any} selector css selector
 * @returns
 */
export function getText(shallowWrapper, selector) {

  selector = selector || 'span';

  return shallowWrapper.find(selector)
        .text();
}
