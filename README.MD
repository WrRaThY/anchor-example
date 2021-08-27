# Anchor-example
This project aims to provide a nice and easy to understand example of how to build projects with Anchor on the Solana ecosystem.  
disclaimer: I am not a co-author of those, and I don't earn anything by creating this.  
It's just me trying to gather some of the little knowledge I have and making it easier for others.  
Anchor has a lot of examples inside, but to be honest - I find them hard to use and after hours of debugging the code I finally learned a thing or two.  
Hopefully, my read reader, you will have it easier than me.

## project structure
I'll list here most important stuff, not literally everything
- [Anchor.toml](Anchor.toml) - main anchor config file, don't change anything here (it's already configured to work with Typescript tests)
- [package.json](package.json) - nothing special here apart from scripts to run anchor in a couple of ways
- [docs](docs) - some additional and hopefully helpful (and easy to digest) documentation I produced
- [programs](programs) - where the Rust stuff lives
- [tests](tests) - where the blockchain E2E tests live

## code stuff
This readme is too limited of a form to gather everything... plus - you want to see the code anyway, so I'll just be commenting things in the code to the best of my ability.  
Also - I'm not gonna explain everything in comments - first go to the [docs/useful-links.md](docs/useful-links.md) file and go through some tutorials. Especially [the anchor one](https://project-serum.github.io/anchor/tutorials/tutorial-0.html)

### running
- I'd advise you to run everything through npm/yarn
- for example `npm run test`. you can even run that stuff from your IDE (provided you have a unix system)
- if something doesn't work (for example anchor is not defined or other stupid error) - first refer to [docs/installation.md](docs/installation.md) and if it still doesn't work - then you can start 
  panicking. No, I'm not gonna help you, but feel free to ask a question on Discord ;)

### rust stuff
- the program is defined in the [programs/anchor-example/src/lib.rs](programs/anchor-example/src/lib.rs) file
- it uses the latest addition to the anchor ecosystem - using modules defined in other files
- the [programs/src/structs](programs\src\structs) folder provides that separation and I believe this to be a good practice (I saw some contracts that had everything in one 
  5000 line long 
  file and it has been 
  terrible to read)
- I'll try to use all toys provided by anchor (zero_copy, loaders and so on), but it's not there yet

### test stuff
the idea behind separating the sdk and tests themselves is that:
- it lets me thing separately about test logic and calling blockchain
- in a real project you'd want to separate those anyway for the reason above
- SDK is still part of tests, because I couldn't be bothered to separate it now. This may change in the future and it will be more production-ready approach then

## stuff stuff
This is by no means a finished project and I suppose it will keep on growing in time, but in its own time. I'll extend this as I go and if someone needs something that isn't
here? I'll not drop everything to implement it. That said - if someone wants to add an example here - be my guest :)


# Stuff?
yes, I like to write stuff. it calms me down. deal with it. stuff.

# mentions
I'd like to take the time and thank [@armaniferrante](https://github.com/armaniferrante) here, coz he is mostly behind implementing anchor. amazing stuff mate
