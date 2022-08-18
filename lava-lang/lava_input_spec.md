

---
call: User made script using a .lava file

params: in json form in inline lava comment

lifecycle: says what part of the lava cycle call is on [
    (pre-render[ no visual ]), -> rendered, -> auto, -> depricated, -> remove, -> remove-inline
]

ex:
---
test.md
%%| 
{ title: "hello", place "world"}
make_list -> rendered |%%
----
formats to
----
{
    call: "make_list",
    params: {
        title: "hello",
        place: "world"
    }
    lifecycle: "rendered"
    // end: 85

}

%%| end |%%

{
    call: end
}