## [v0.0.0]
#### [v0.0.0] init: Invoker - Execute bash commands using natural language.

- `invoker` starts an interactive terminal emulator which accepts natural language
  as input and executes a command that implements the intent of the input.
- Prefix input with `?` to enable confirmation before command execution.

#### [v0.0.1] chore: Update images in README.md to point to github hosted images

#### [v0.0.2] docs: Update README.md with another git example, reword some sections

#### [v0.1.0] feat: `invoker [input]` outputs generated command to stdout

Previously, the only way to use Invoker was via an interactive session.
With this change, you may now call Invoker directly from the command line by supplying an optional
command line argument `[input]` and output the generated command to
stdout.

```sh
invoker "colorize package.json" | zsh
```

```json
{
  "name": "@prmichaelsen/invoker"
}
```

#### [v0.1.1] docs: Update README.md with an example that generates a grep command that excludes specified directories

#### [v0.2.0] feat: Interactive session now propagates process env variables to the child sub-shell.

Prior to this change, any env vars loaded via your bash profile or 
otherwise were not propagated to the subshell.

#### [v0.3.0] feat: Use ? from the command line to prompt before executing

Prior to this change, one could use `invoker "say hi"` to output something like
`echo hi` to the terminal. If you wanted to run the command without copying & pasting,
one could pipe this to a shell process with `invoker "say hi" | sh`.
However this method does not allow you to confirm what the command will be
before executing. 

In `v0.3.0`, you can now use invoker like so:

```sh
invoker "? say hi"
```

Invoker will then output the command to be run along with
a confirmation message before running it

```sh
echo hi (y/N)
```

This allows you to preview commands invoked from the command line
before running them without having to use an interactive session.

#### [v0.3.1] build: npm publish lifecycle improvements
* `publish` fails if git index is dirty
* `prepublishOnly` cleans dist and node_modules and performs a fresh install of dependencies

#### [v0.3.2] build: Ensure package.json version matches latest changelog version

#### [v0.3.3] chore: Fix dependencies

#### [v0.4.0] feat: force flag for immediate execution, silent flag to print output of command only