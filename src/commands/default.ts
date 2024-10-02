import { cli } from "../cli";
import { printCommand } from "../components/printCommand";
import { runOnce } from "../components/runOnce";
import { runForce } from "../components/runForce";
import { startInteractiveSession } from "../components/startInteractiveSession";

interface Options {
  input?: string;
  force?: boolean;
  silent?: boolean;
}
cli.command<Options>(
  "$0 [input]",
  "",
  (yargs) => {
    yargs.option("force", {
      type: "boolean",
      alias: "f",
    });
    yargs.option("silent", {
      type: "boolean",
      alias: "s",
    });
  },
  async (argv) => {
    const { input, force = false, silent = false } = argv;
    if (input) {
      if (force) {
        runForce(input, silent);
      } else if (input.startsWith("?")) {
        runOnce(input);
      } else {
        await printCommand(input);
      }
    } else {
      startInteractiveSession();
    }
  }
);
