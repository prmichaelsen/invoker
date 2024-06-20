import { cli } from "../cli";
import { printCommand } from "../components/printCommand";
import { runOnce } from "../components/runOnce";
import { startInteractiveSession } from "../components/startInteractiveSession";

cli.command<{
  input?: string;
}>(
  "$0 [input]",
  "",
  () => {},
  async (argv) => {
    const { input } = argv;
    if (input) {
      if (input.startsWith("?")) {
        runOnce(input);
      } else {
        await printCommand(input);
      }
    } else {
      startInteractiveSession();
    }
  }
);
