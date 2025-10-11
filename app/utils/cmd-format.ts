export function commandFormat(cmd: string): string[] {
  const cmdArr = cmd.trim().split(" ");
  return cmdArr.filter((c) => Boolean(c)); // filter out empty string
}
