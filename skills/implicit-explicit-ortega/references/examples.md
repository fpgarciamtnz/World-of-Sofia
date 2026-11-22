# Examples

Each case comes from real work on skills and handoffs. Use them to calibrate what counts as worth stating.

## A handoff that pointed at missing context

**Explicit:** "In case you need more context, a4bdf816."

**Deficiency:** the request relied on a decision made in that conversation: a new skill was part of the job. The id was the only pointer, and the next session could not open it, so the new skill was never built. Nothing in the request itself named it.

**Decision: state it.** A handoff names every deliverable in its own text and treats linked context as background. Better: "Also create the Ortega skill we discussed (implicit versus explicit). Context: a4bdf816."

## A setup script that assumed its machine

**Explicit:** "Run `setup.sh`, then call `<work>/.venv/bin/python`."

**Deficiency:** the instructions stand on a belief that the machine runs macOS or Linux, with `bash`, `python3`, and POSIX paths. On Windows the venv's interpreter is `.venv\Scripts\python.exe`, and `python3` may be only a store alias. Nobody wrote the belief down because it was true everywhere the author had run it. It surfaced as a crack: a path that did not exist.

**Decision: state it,** or remove the dependency. Either "Runs on macOS and Linux" at the top, or a setup that finds the interpreter on each platform.

## Silence read as a finished check

**Explicit:** an audit that answered "The sources look fine."

**Exuberance:** the answer conveyed that every concept had been checked, which the writer never claimed. A check that did not run and a check that found nothing produced the same silence.

**Decision: state it.** The report names each concept with what it found, or why it did not apply, so a missing concept reads as not reviewed rather than as passed.

## An example that became a rule

**Explicit:** a skill showed one sample command with `--minimo 70 --ventana 5`.

**Exuberance:** an agent can copy the sample values as defaults for every submission, although the skill means "read these numbers from the brief".

**Decision: cut or reword.** Say where the values come from right next to the example: "with the values from the brief".

## What to leave implicit

A skill for engineers does not need to explain what a git branch is, and a note to the user does not need to restate the decision they just made. Stating these adds length without changing what the reader does, so leave them implicit and say nothing.
