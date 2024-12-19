import { single } from "npm:itertools-ts";

type layout = (number | string)[];
const EMPTY = ".";

function diskMapToLayout(diskMap: string): layout {
  const disk = [];
  let fileId = 0;
  for (const [i, digit] of single.enumerate(diskMap)) {
    if (i % 2 === 0) {
      for (let _x = 0; _x < Number(digit); _x++) {
        disk.push(fileId);
      }
      fileId += 1;
    } else {
      for (let _x = 0; _x < Number(digit); _x++) {
        disk.push(EMPTY);
      }
    }
  }
  return disk;
}

function defrag(disk: layout) {
  function* freeSpaceGn(disk: layout): Generator<[number, number]> {
    let head = 0;
    while (head < disk.length) {
      while (disk[head] !== EMPTY && head < disk.length) {
        head += 1;
      }
      if (disk[head] === EMPTY) {
        const start = head;
        while (disk[head] === EMPTY) {
          head += 1;
        }
        yield [start, head - start];
      }
    }
  }
  function* fileGn(disk: layout): Generator<[number, number, number]> {
    let head = disk.length - 1;
    let fileId = -1;
    while (head > 0) {
      while (disk[head] === EMPTY && head > 0) {
        head -= 1;
      }
      if (disk[head] !== EMPTY) {
        fileId = disk[head] as number;
        const start = head;
        while (disk[head] === fileId) {
          head -= 1;
        }
        yield [head + 1, start - head, fileId];
      }
    }
  }
  for (const [fileStart, fileSize, fileId] of fileGn(disk)) {
    // console.log(`Finding home for ${fileId} at ${fileStart} of size ${fileSize}`);
    for (const [freeIdx, freeSize] of freeSpaceGn(disk)) {
      if (freeIdx >= fileStart) {
        break;
      }
      if (freeSize >= fileSize) {
        for (let i = 0; i < fileSize; i++) {
          disk[fileStart + i] = ".";
          disk[freeIdx + i] = fileId;
        }
        // console.log(`Disk is: ${disk}`);
        break;
      }
    }
  }
}

function checkSumDisk(disk: layout): number {
  let ret = 0;
  for (const [position, content] of single.enumerate(disk)) {
    if (typeof content !== "number") {
      continue;
    }
    ret += position * content;
  }
  return ret;
}

export function diskFragmenter(diskMap: string): number {
  const disk = diskMapToLayout(diskMap);
  console.log(`Disk is: ${disk}`);
  defrag(disk);
  console.log(`Disk is: ${disk}`);
  return checkSumDisk(disk);
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const text = (await Deno.readTextFile("input.txt")).trimEnd();
  console.log(diskFragmenter(text));
}