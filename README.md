## Invoker

Execute bash commands using natural language.

![img](https://github.com/prmichaelsen/invoker/blob/mainline/images/9.gif?raw=true)

#### Features

- `invoker` starts an interactive terminal emulator which accepts natural language
  as input and executes a command that implements the intent of the input.
- Prefix input with `?` to enable confirmation before command execution.

#### Why use Invoker?

Invoker is nice when you need a command that you rarely use or that has non-straightforward syntax.

For instance, instead of typing:

```sh
find . type -f -name package.json -exec grep -l '@prmichaelsen' {} +
```

You can simply type:

```
Search this directory for a package.json that contains the text "@prmichaelsen"
```

Invoker will then construct a command designed to execute your intent, as demonstrated below.

![img](https://github.com/prmichaelsen/invoker/blob/mainline/images/4.gif?raw=true)

## Installation & Setup

```sh
npm i -g @prmichaelsen/invoker
```

#### Initial Setup

Invoker is built on AWS Bedrock Claude Anthropic v2 and it requires CLI authentication with an AWS profile
authorized to call Bedrock in order to work. See the AWS docs on [CLI authentication](https://docs.aws.amazon.com/signin/latest/userguide/command-line-sign-in.html).

```sh
aws sso login --profile my-profile
```

If you aren't authenticated and authorized, Invoker will throw an error during usage.

#### Usage

##### Interactive Mode
```sh
invoker
Say Hi
echo Hi
Hi
```

Prompt to confirm before running:
```sh
invoker
? Say Hi
echo Hi (y/N)
y
Hi
```

#### Command Line Mode
```sh
invoker "Say Hi"
echo Hi
```

Pipe output:
```sh
invoker "Say Hi" | sh
Hi
```

Prompt to confirm before running:
```sh
invoker "? Say Hi"
echo Hi (y/N)
y
Hi
```

## Demos

### Hello World

![img](https://github.com/prmichaelsen/invoker/blob/mainline/images/3.gif?raw=true)

### Command confirmation

Invoker supports command confirmation by prefixing your input
with `?`.

![img](https://github.com/prmichaelsen/invoker/blob/mainline/images/5.gif?raw=true)

### Complex `git` workflow

With Invoker, you can focus on your
workflow and less on memorizing commands and flags.

![img](https://github.com/prmichaelsen/invoker/blob/mainline/images/8.gif?raw=true)

![img](https://github.com/prmichaelsen/invoker/blob/mainline/images/14.png?raw=true)

### Miscellaneous

Invoker is very useful for commands that you do not often
have to run, such as `lsof -i`. It's not a difficult command to
remember, but if you only use it every few months, you'll find yourself
looking it up each time you need to use it.

![img](https://github.com/prmichaelsen/invoker/blob/mainline/images/7.gif?raw=true)

Invoker is a great learning tool as well. It enables beginners
to effectively use the command line while also picking up
new commands along the way.

![img](https://github.com/prmichaelsen/invoker/blob/mainline/images/6.gif?raw=true)

Invoker's use cases are innumerable. You can automate the most trivial of tasks with
very little effort.

![img](https://github.com/prmichaelsen/invoker/blob/mainline/images/13.png?raw=true)

![img](https://github.com/prmichaelsen/invoker/blob/mainline/images/15.png?raw=true)

## ⚠️ Warning

If you're not careful, Invoker can destroy your computer entirely.

**Never** use Invoker with `sudo`.

Use **extra caution** when executing any commands with side effects.

Make sure to prefix input with `?` as necessary.

Use at your own risk.
