function* enumerate<T>(
  data: Iterable<T>,
): Generator<[number, T], void, unknown> {
  let i = 0;
  for (const item of data) {
    yield [i, item];
    i += 1;
  }
}

function* pairwise(data: number[]): Generator<[number, number], void, unknown> {
  const iterator = data[Symbol.iterator]();
  const first = iterator.next().value!;
  let prev = first;
  for (const item of iterator) {
    yield [prev, item];
    prev = item;
  }
}

const data = [8, 6, 7, 5, 3, 0, 9];

for (const [a, [b, c]] of enumerate(pairwise(data))) {
  console.log(a, b, c);
}
