# mac

## cleanup disk space, old stuffs

https://tomodwyer.com/post/2017-02-19-useful-homebrew-commands/

brew. old files can take up a lot of space

*TIP*: run upgrade first so it cleans old files and updates

upgrade all and cleanup

```bash
brew outdated | awk '{print $1;}' | xargs brew upgrade --cleanup
```

```bash
# dry run
brew cleanup -n
# run
brew cleanup
brew prune
```

```bash
# remove package
brew rm pandoc
```

install latest and remove older

```bash
brew upgrade --cleanup pandoc
```

## useful tools

https://pandoc.org/demos.html

```bash
brew install pandoc
```

## rename files with .js to .tsx

```bash
find ./src -name "*.js" -exec bash -c 'git mv "$1" "${1%.js}".tsx' - '{}' \;
```

## cleanup app cache

http://www.techerator.com/2012/10/how-to-delete-application-caches-in-mac-os-x/

## apple script

https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_cmds.html

Use the apple script editor. You can explore dictionaries. 

https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/index.html#//apple_ref/doc/uid/TP40016239-CH56-SW1 - beginner guide

https://scriptingosx.com/2017/10/on-the-shebang/ - useful blog

### basics

extension: `.applescript`
compiled extension: `.scpt`
shebang: `#!/usr/bin/env osascript`

comments: `--` or `(* blah *)`

variables:

```
my_foo=val osascript foo.scpt
set this_foo to system attribute "my_foo"
```

launch system preferences

```
tell application "System Preferences"
	try
		activate
		delay 5
	end try
end tell
```

get elements

```
tell application "System Events"
	tell process "System Preferences"
		set frontmost to true
		delay 2
		name of button in scroll area 1 of window 1
		properties of button in scroll area 1 of window 1
		delay 2
		get entire contents of scroll area 1 of window 1
		get button "General" of scroll area 1 of window 1
	end tell
end tell
```

### debugging ui elems

start with window 1, get entire contents. Than work down.


```
get entire contents of window 1
get entire contents of scroll area 1 of window 1
```


## plist (buddy)

https://fgimian.github.io/blog/2015/06/27/a-simple-plistbuddy-tutorial/

https://stackoverflow.com/questions/13970218/how-can-i-use-plistbuddy-to-access-an-element-of-preferencesspecified-by-its-pro

## defaults

https://ss64.com/osx/syntax-defaults.html

https://github.com/herrbischoff/awesome-macos-command-line#applications

https://rixstep.com/2/20060901,00.shtml

## automation

https://www.going-flying.com/blog/macos-automatic-customization-script.html

http://osxdaily.com/2012/10/09/best-defaults-write-commands-mac-os-x/

https://www.cyberciti.biz/faq/apple-mac-os-x-update-softwareupdate-bash-shell-command/

https://dotfiles.github.io/

https://github.com/mathiasbynens/dotfiles/blob/master/.macos

https://github.com/holman/dotfiles/blob/80b2bd57e9c594dc7c783989801ee51930068d59/macos/set-defaults.sh

https://github.com/joshuaclayton/dotfiles

https://blog.palcu.ro/2014/06/dotfiles-and-dev-tools-provisioned-by.html

https://github.com/kevinSuttle/macOS-Defaults/blob/master/.macos

https://github.com/webpro/awesome-dotfiles

https://medium.com/@webprolific/getting-started-with-dotfiles-43c3602fd789


## bash profile examples

https://natelandau.com/my-mac-osx-bash_profile/

## change default apps

https://apple.stackexchange.com/questions/49532/change-the-default-application-for-a-file-extension-via-script-command-line

https://apple.stackexchange.com/questions/313454/applescript-find-the-users-set-default-browser



