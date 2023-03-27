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
   * I'm private static prop `bar`
   */
  static bar = 2;

  /**
   * I'm constructor
   * @param foo assign to Super.prototype.foo
   * @param bar assign to Super.prototype.bar
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
