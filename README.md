# LAVA MARKUP GENRATION TOOL
---
Lava is a markup generation tool built for obsidian
Version: 0.01
**STILL IN VERY EARLY DEVELOPMENT**
**NOT RECOMMENDED FOR PERSONAL USE**
> open lava-about in obisidian for developer information on the development of LAVA

## Inline Lava

all inline lava starts with **%%|** and ends with **|%%**.

form:
%%| params call -> lifecycle |%%

### params
a inline json object to be passed into to call function
ex: {
    "hello": "world"
}

### call
a call is a name of a template that will be injected under the inline lava


### lifecycle
the lifecycle of a inline lava tells the parser weather to ignore, delete, or update the data.

implemented now are...

pre-render (will be rendered once and turn into a rendered tag. same as if left blank)
rendered (will never be updated. Data already rendered)
auto (data will be updated whenever the file is saved and lava run is called again)



ex: %%| {"hello", "world"} make_title -> auto |%%

## Lava Templates

templates use the extension .lava
templates will be copied under inline lava tags and end with a %%| end |%% tag.

lava template data use a different starting and ending tags for injecting data of "%%!" and "!%%"

to inject paramaters into inline lava use the params json object

// passed into inline call
{
    "cool": {
        "hello": "world"
    }
}

// inside a .lava template
ex: %%! params.cool.hello !%%

## Executing Commands

run:
- runs lava on notes directory with templates 
```bash
node . run -n [notes-directory] -t [templates-directory]
```

creator: Joshua Davis
contributors: