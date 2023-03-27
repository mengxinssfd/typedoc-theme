# example

typedoc theme example.

this example contains two classes: `Super`, `Sub`.

## class Super

```typescript
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

```

## class Sub

````typescript
import { Super } from './Super';

/**
 * I'm class `Sub`
 */
export class Sub extends Super {
  /**
   * override
   */
  constructor(
    /**
     * I'm protected prop `a`, assign to this.foo
     */
    protected a: string,
    /**
     * I'm protected prop `b`, assign to this.bar
     */
    protected b: number,
  ) {
    super(a, b);
  }
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

````
