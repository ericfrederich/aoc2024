export function* enumerate<T>(
  data: Iterable<T>,
): Generator<[number, T], void, unknown> {
  let i = 0;
  for (const item of data) {
    yield [i, item];
    i += 1;
  }
}

export function* pairwise<T>(data: T[]): Generator<[T, T], void, unknown> {
  const iterator = data[Symbol.iterator]();
  const first = iterator.next().value as T;
  let prev = first;
  for (const item of iterator) {
    yield [prev, item as T];
    prev = item as T;
  }
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const data = [8, 6, 7, 5, 3, 0, 9];
  for (const [a, [b, c]] of enumerate(pairwise(data))) {
    console.log(a, [b, c]);
  }
}
