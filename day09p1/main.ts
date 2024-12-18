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
  let head = 0;
  let tail = disk.length - 1;
  // console.log(`B Disk is: ${disk}`);
  while (head <= tail) {
    // advance pointers
    while (disk[head] !== EMPTY) {
      head += 1;
    }
    while (disk[tail] === EMPTY) {
      tail -= 1;
    }
    if (head >= tail) {
      break;
    }
    disk[head] = disk[tail];
    disk[tail] = EMPTY;
    // console.log(`D Disk is: ${disk}`);
  }
  // console.log(`A Disk is: ${disk}`);
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
