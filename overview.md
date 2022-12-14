# Overview

**FUNTIONALITY**
_completed: ✅_

-   command line interface logistics
    -   create a package on a service ✅
    -   make root so commands run as "lava \[command] ..." ✅
    -   use color library to make better debug output and look prettier ✅
    -   command line interface with lava watch ✅
-   complete run command
    -   basic functionality ✅
    -   optimize using recently modified
    -   optimize with cached data in hidden files
-   watch command
    -   allow for active terminal to input commands to create files and directories ✅
    -   allow for active terminal to input commands to run templates ✅
    -   Fix chicken in egg problems ie. (infinitly generating text)
-   templates
    -   allow for for loops ✅
    -   allow for if statements ✅
    -   allow for comments ✅
    -   allow for params ✅
    -   allow for file/directory creation
    -   allow for special arguments in templates
        -   figuring out how many templates on each page or dir of certain type or total
    -   allow for figuring out how many headers, subheaders
    -   allow for param json files and allow templates to modify param files

**DESIGN**

-   lava-core
    -   special arguments in templates can be written in js as a core library seperately to lava-lang

**GIT**

-   add actions to run tests and check lint ✅
-   utilize prettier to format code ✅

**IDEAS**

-   decorators
    -   type of templates that parse and modify style of page
    -   lnline call located at the top of a file (or I guess anywhere?? idea)
    -   allows for either conflicts merge like git or read in updated values into templates or both
    -   allow for fill in the blank templates
