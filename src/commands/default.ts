import { cli } from "../cli";
import { printCommand } from "../components/printCommand";
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
      await printCommand(input);
    } else {
      startInteractiveSession();
    }
  }
);
