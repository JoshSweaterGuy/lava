%%| 
    { 
    ...(apples.json),
    "people": [
        "Josh",
        "Andy",
        "...(apples.json),"
    ],
    "name": "Josh" }
    simple_apples -> auto
|%%

THIS TEST TESTS BASIC APPLE PICKING
INCLUDING Red,Fuji,Granny Smith,Pink Lady,Gala

PICKING APPLES WITH Josh
        Josh likes Red apples!
        Josh's Name is Josh!
PICKING APPLES WITH Andy
        Andy likes Red apples!
PICKING APPLES WITH ...(apples.json),
        ...(apples.json), likes Red apples!
PICKING APPLES WITH Josh
        Josh likes Fuji apples!
        Josh's Name is Josh!
PICKING APPLES WITH Andy
        Andy likes Fuji apples!
PICKING APPLES WITH ...(apples.json),
        ...(apples.json), likes Fuji apples!
PICKING APPLES WITH Josh
        Josh likes Granny Smith apples!
        Josh's Name is Josh!
PICKING APPLES WITH Andy
        Andy likes Granny Smith apples!
PICKING APPLES WITH ...(apples.json),
        ...(apples.json), likes Granny Smith apples!
PICKING APPLES WITH Josh
        Josh likes Pink Lady apples!
        Josh's Name is Josh!
PICKING APPLES WITH Andy
        Andy likes Pink Lady apples!
PICKING APPLES WITH ...(apples.json),
        ...(apples.json), likes Pink Lady apples!
PICKING APPLES WITH Josh
        Josh likes Gala apples!
        Josh's Name is Josh!
PICKING APPLES WITH Andy
        Andy likes Gala apples!
PICKING APPLES WITH ...(apples.json),
        ...(apples.json), likes Gala apples!

%%| end |%%


