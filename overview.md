# Overview

**FUNTIONALITY**
_completed: ✅_

- command line interface logistics
  - create a package on a service ✅
  - make root so commands run as "lava \[command] ..." ✅
  - use color library to make better debug output and look prettier ✅
  - command line interface with lava watch ✅
- obsidian plugin interface
  - specify notes, templates, objects directories in settings
  - script calling with parameters screen
  - lava run on save
  - lava and json files viewable in obsidian?
  - colors! maybe some syntax highlighting if possible
- complete run command
  - basic functionality ✅
  - optimize using recently modified
  - optimize with cached data in hidden files
- watch command
  - allow for active terminal to input commands to create files and directories and objects directory ✅
  - allow for active terminal to input commands to run templates ✅
  - Fix chicken in egg problems ie. (infinitly generating text)
- templates
  - allow for for loops ✅
  - allow for if statements ✅
  - allow for comments ✅
  - allow for params ✅
  - allow for inputs to calls via json files ✅
  - allow for file/directory creation
  - allow for special arguments in templates
    - figuring out how many templates on each page or dir of certain type or total
  - allow for figuring out how many headers, subheaders
  - allow for param json files and allow templates to modify param files

**DESIGN**

- lava-core
  - special arguments in templates can be written in js as a core library seperately to lava-lang

**GIT**

- add actions to run tests and check lint ✅
- utilize prettier to format code ✅

**IDEAS**

- allow for fill in the blank templates
