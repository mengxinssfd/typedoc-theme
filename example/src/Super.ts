/**
 * I'm abstract class `Super`
 */
export abstract class Super {
  /**
   * I'm private static prop `foo`
   */
  private static foo = 'foo';
  /**
   * I'm public static prop `bar`
   */
  static bar = 2;

  /**
   * I'm constructor
   * @param foo assign to this.foo
   * @param bar assign to this.bar
   */
  constructor(foo: string, bar: number) {
    this.foo = foo;
    this.bar = bar;
  }
  /**
   * I'm prop `foo`
   */
  private foo: string;
  /**
   * I'm prop `bar`
   */
  public bar: number;

  /**
   * I'm abstract method `test`
   */
  abstract test(): void;
}
