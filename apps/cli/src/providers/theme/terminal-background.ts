const OSC_BACKGROUND = "\u001B]11;";
const OSC_RESET_BACKGROUND = "\u001B]111\u001B\\";
const OSC_TERMINATOR = "\u001B\\";

function setTerminalBackground(hex: string): void {
  if (!process.stdout.isTTY) {
    return;
  }

  const color = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/u.test(color)) {
    return;
  }

  const red = color.slice(0, 2);
  const green = color.slice(2, 4);
  const blue = color.slice(4, 6);

  // Embedded terminals differ in which valid OSC color spelling they accept.
  // Send the standard 8-bit rgb form and the hex form for compatibility.
  process.stdout.write(
    `${OSC_BACKGROUND}rgb:${red}/${green}/${blue}${OSC_TERMINATOR}` +
      `${OSC_BACKGROUND}#${color}${OSC_TERMINATOR}`,
  );
}

function resetTerminalBackground(): void {
  if (process.stdout.isTTY) {
    process.stdout.write(OSC_RESET_BACKGROUND);
  }
}

export { resetTerminalBackground, setTerminalBackground };
