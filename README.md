# **This is a telegram bot based on *Node.js* for solving math problems**
## *This bot can solve a bunch of different math problems. There is a huge database with formulas from a lots of subjects like physics, math and geometry.*
---
**To use this bot you need to clone the repository (and install the libraries), insert your telegram bot and database parametres in `.env` file**

---
## *How it works:*
> 1) `/search` and `/search_type` commands are used to find different formulas and filter them for selected parameters
> 2) Other commands are ysed to find area, equals, third site of triangle and such math actions

+ *Full command list you can find in pinned `.txt` file*

--- 
## *How to setup:*
+ *For this bot you need a running `Mongo` database cluster*

+ *Dataset architecture example: *

```JavaScript
{
    formula_name: "heat capacity"
    formula: "Q = cm△t\n"
    properties: {
        formula_type: "physics"
        formula_subtype: "temp"
    }  
}
```
>Full dataset description you can find in `Formula.d.ts` interface

>1) Set up environmental params in `.env` file
>2) Configure database with suggested dataset below
>3) Create *Telegram* bot and insert token
>4) Install all dependences, which noted in `dependences.sh` and `dependences.bat` files
>5) Compile project and launch `MainClient.js`

* **IMPORTANT:** Check validation with `@types` and `tsconfig.json` in your project

---

## *Tech specs:*
### *(Pre-build 1.0.0)*
+ node.js `v16.17.1`
+ typescript `^4.8.4`
+ mondodb `^4.10.0`
+ telegraf `^4.10.0`
+ dotenv `^16.0.3`

---
##### Created by [*LCcodder*](https://github.com/LCcodder)