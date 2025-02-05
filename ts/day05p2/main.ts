#!/usr/bin/env -S deno -A

// like Python's sorted
function sorted<T, K>(array: T[], keyFunction: (item: T) => K): T[] {
  const keyArray = array.map((item) => ({ item, key: keyFunction(item) }));

  keyArray.sort((a, b) => {
    if (a.key < b.key) {
      return -1;
    } else if (a.key > b.key) {
      return 1;
    } else {
      return 0;
    }
  });

  return keyArray.map(({ item }) => item);
}

export function printQueue(
  rules: [number, number][],
  pageLists: number[][],
): number {
  function isGood(pageList: number[], rules: [number, number][]): boolean {
    for (const rule of rules) {
      const [idxL, idxR] = rule.map((p) => pageList.indexOf(p));
      if ([idxL, idxR].some((idx) => idx < 0)) {
        continue;
      }
      if (idxL > idxR) {
        return false;
      }
    }
    return true;
  }
  let ret = 0;
  for (const pageList of pageLists) {
    const validRules: [number, number][] = rules.filter((rule) => rule.every((page) => pageList.includes(page)));
    if (isGood(pageList, rules)) {
      continue;
    }
    // a lookup for each page to see which pages should come before it
    const befores = new Map<number, Set<number>>();
    for (const page of pageList) {
      befores.set(page, new Set<number>());
    }
    for (const [b, a] of validRules) {
      befores.get(a)!.add(b);
    }
    const sortedPages = sorted(pageList, (page) => befores.get(page)!.size);
    ret += sortedPages[(sortedPages.length - 1) / 2];
  }
  return ret;
}

export const exampleInput = {
  rules: [
    [47, 53],
    [97, 13],
    [97, 61],
    [97, 47],
    [75, 29],
    [61, 13],
    [75, 53],
    [29, 13],
    [97, 29],
    [53, 29],
    [61, 53],
    [97, 53],
    [61, 29],
    [47, 13],
    [75, 47],
    [97, 75],
    [47, 61],
    [75, 61],
    [47, 29],
    [75, 13],
    [53, 13],
  ] as [number, number][],
  pageSets: [
    [75, 47, 61, 53, 29],
    [97, 61, 53, 29, 13],
    [75, 29, 13],
    [75, 97, 47, 61, 53],
    [61, 13, 29],
    [97, 13, 75, 29, 47],
  ],
};

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  // const { rules, pageSets } = exampleInput;
  const text = (await Deno.readTextFile("input.txt")).trimEnd();

  const sections = text.split("\n\n");
  if (sections.length !== 2) {
    throw Error("Bad input file");
  }
  const [rulesStr, pageSetsStr] = sections;
  const rules = rulesStr.split("\n").map((line) => line.split("|").map(Number)) as [number, number][];
  const pageSets = pageSetsStr.split("\n").map((line) => line.split(",").map(Number));
  console.log(printQueue(rules, pageSets));
}
