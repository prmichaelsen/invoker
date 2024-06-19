### [v0.0.0] init: Invoker - Execute bash commands using natural language.

- `invoker` starts an interactive terminal emulator which accepts natural language
  as input and executes a command that implements the intent of the input.
- Prefix input with `?` to enable confirmation before command execution.

### [v0.0.1] chore: Update images in README.md to point to github hosted images

### [v0.0.2] docs: Update README.md with another git example, reword some sections

### [v0.1.0] feat: `invoker [input]` outputs generated command to stdout

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

### [v0.1.1] docs: Update README.md with an example that generates a grep command that excludes specified directories