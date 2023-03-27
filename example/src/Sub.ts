import { Super } from './Super';

/**
 * I'm class `Sub`
 */
export class Sub extends Super {
  /**
   * I'm method `test`, override `Super`
   *
   * @see Super
   *
   * @example
   * ```ts
   * const sub = new Sub('a',2);
   * sub.test();
   * ```
   */
  override test(): void {
    console.log('test');
  }

  /**
   * I'm protected method `protect`
   */
  protected protect(): void {
    console.log('protect');
  }
}
