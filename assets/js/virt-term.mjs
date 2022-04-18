import { Init } from '/assets/js/main.mjs';
import { ViewPort } from '/assets/js/ui-tools.mjs';

// eslint-disable-next-line no-unused-vars
class Command {
    constructor(command, result, hidden) {
        // creates a command with the following properties
        // command  :   the name of the command, checked against when typing at the view's <cmdInput>
        // result   :   the result of the command, attached to the view's <screen>
        // hidden   :   boolean indicating if the command appears in the view's <cmdWrap> autocompletion
        this.command = command;
        this.result = result;
        this.hidden = hidden;
    }
    run() {
        // Do fancy stuff here.
    }
}

// eslint-disable-next-line no-unused-vars
class CommandProvider {
    constructor() {
        // creates various commands for the terminal
        this.aboutCmd = new Command("about", "welcome to the virtual terminal.", false);
        this.clearCmd = new Command("clear", "", false);
        this.loginCmd = new Command("login", "user logged in.", false);
        this.logoutCmd = new Command("logout", "user logged out.", false);
        this.restoreCmd = new Command("restore", "system restored to it's default state.", true);
        this.rmCmd = new Command("rm -rf /", "system zeroed.", false);
        this.defaultCommands = new Array();
        this.defaultCommands.push(this.aboutCmd);
        this.defaultCommands.push(this.clearCmd);
        this.defaultCommands.push(this.loginCmd);
        this.defaultCommands.push(this.restoreCmd);
    }
    getDefaultCommands() {
        // returns an array of default commands the terminal initializes with
        return this.defaultCommands;
    }
    getAboutCmd() {
        return this.aboutCmd;
    }
    getClearCmd() {
        return this.clearCmd;
    }
    getLoginCmd() {
        return this.loginCmd;
    }
    getLogoutCmd() {
        return this.logoutCmd;
    }
    getRestoreCmd() {
        return this.restoreCmd;
    }
    getRmCmd() {
        return this.rmCmd;
    }
}

// eslint-disable-next-line no-unused-vars
class TerminalView {
    constructor(controller, id) {
        this.viewPort = new ViewPort(id);
        // constructor, binding a controller and a DOM element as root to the view
        this.controller = controller;
        // maps a command's key to it's DIV and a boolean indicating visibility
        this.commandsViewMap = new Map();
        this.initView();
    }
    initView() {
        // initializes the following components and adds them to the view's <root>:
        //  - terminalWrap  :   the outer wrapper for the whole terminal
        //  - consoleWrap   :   the wrapper for the console which consists of the
        //    - fsButton    :   the button for toggling fullscreen (if browser has fullscreen capabilities)
        //    - cmdInput    :   the input element of type text for typing commands
        //    - cmdWrap     :   and the wrapper for autocompletion of commands derived from the <cmdInput>
        //  - screenWrap    :   the wrapper for the <screen>
        //    - screen      :   where <screenElements> get attached to
        let terminalWrap = document.createElement("div");
        terminalWrap.id = "terminal-wrap";
        let consoleWrap = document.createElement("div");
        consoleWrap.id = "console-wrap";
        if (document.fullscreenEnabled === true) {
            let fsButton = document.createElement("button");
            fsButton.id = "fs-button";
            fsButton.addEventListener("click", () => {
                // get fullscreen state and toggle it
                if (document.fullscreenElement !== null) {
                    // document is fullscreen, exit fullscreen
                    this.viewPort.exitFullscreen();
                }
                else {
                    // document is not fullscreen, go fullscreen
                    this.viewPort.requestFullscreen();
                }
            });
            let goFs = document.createElement("img");
            goFs.classList.add("fs-image");
            goFs.src = "/assets/icons/go-fullscreen.svg";
            fsButton.append(goFs);
            consoleWrap.append(fsButton);
            this.fsButton = fsButton;
            document.addEventListener("fullscreenchange", this.onFullscreenChanged.bind(this));
        }
        let input = document.createElement("input");
        input.id = "input";
        input.type = "text";
        let possibleInputLabel = document.createElement("div");
        possibleInputLabel.id = "possible-input-label";
        possibleInputLabel.innerText = "possible input:";
        let cmdWrap = document.createElement("div");
        cmdWrap.id = "command-wrap";
        let screenWrap = document.createElement("div");
        screenWrap.id = "screen-wrap";
        let screen = document.createElement("div");
        screen.id = "screen";
        consoleWrap.append(input);
        consoleWrap.append(possibleInputLabel);
        consoleWrap.append(cmdWrap);
        screenWrap.append(screen);
        terminalWrap.append(consoleWrap);
        terminalWrap.append(screenWrap);
        this.terminalWrap = terminalWrap;
        this.cmdInput = input;
        this.cmdWrap = cmdWrap;
        this.screen = screen;
        this.viewPort.append(terminalWrap);
        this.cmdInput.addEventListener("input", this.onInput.bind(this));
        this.cmdInput.addEventListener("keyup", this.onEnterReleased.bind(this));
        this.cmdInput.addEventListener("blur", (event) => {
            event.stopPropagation();
            requestAnimationFrame(() => {
                this.cmdInput.focus();
            });
        });
        this.cmdInput.addEventListener("transitionend", (event) => {
            // the glowing-transition events fire for *every* css property transitioning
            // border: top, right, bottom, left, color and background-color
            // but we only want to toggle once, therefore we only act on one specific event by filtering the property
            event.stopPropagation();
            if (event.propertyName === "background-color") {
                requestAnimationFrame(() => {
                    this.cmdInput.classList.toggle("glowing-transition");
                });
            }
        });
        requestAnimationFrame(() => {
            this.cmdInput.classList.add("glowing-transition");
        });
        // to have access to <this> (TerminalView-object) the following two functions get bound to <this>
        this.addCmdTransitionEnd = this.addCmdTransitionEnd.bind(this);
        this.removeCmdTransitionEnd = this.removeCmdTransitionEnd.bind(this);
        // tell the controller that the view's initialization is complete
        this.controller.onInitViewComplete(this);
    }
    onCommandRegistered(cmdKey) {
        let isHidden = this.controller.isCommandHiddenByKey(cmdKey);
        if (isHidden === false) {
            this.addCommand(cmdKey);
        }
    }
    onCommandUnregistered(cmdKey) {
        if (this.commandsViewMap.has(cmdKey) === true) {
            this.removeCommand(cmdKey);
            this.commandsViewMap.delete(cmdKey);
        }
    }
    addCommand(cmdKey) {
        // creates a <cmdElement> representing the command indetified by <cmdKey>
        let cmdNameToAdd = this.controller.getCommandCommandByKey(cmdKey);
        if (cmdNameToAdd !== undefined) {
            let cmdElementToAdd = document.createElement("div");
            cmdElementToAdd.classList.add("command");
            cmdElementToAdd.innerText = cmdNameToAdd;
            let input = this.cmdInput.value;
            if (this.controller.getCommandCommandByKey(cmdKey).startsWith(input)) {
                // if the command starts with the value of the input <cmdInput>, add it to the <cmdWrap> element and start fading in,
                // and set the visible attribute of the <commandViewMap> entry to true
                this.commandsViewMap.set(cmdKey, [cmdElementToAdd, true]);
                // add it in alphabetical order
                // get the currently visible <cmdElement>s from <commandViewMap>
                let visibleElements = Array.from(this.commandsViewMap.entries()).filter(entry => entry[1][1] === true);
                let elementAdded = false;
                for (const elem of visibleElements) {
                    let elemCmdKey = elem[0];
                    let elemCmdName = this.controller.getCommandCommandByKey(elemCmdKey);
                    if (cmdNameToAdd < elemCmdName) {
                        requestAnimationFrame(() => {
                            this.cmdWrap.insertBefore(cmdElementToAdd, this.commandsViewMap.get(elemCmdKey)[0]);
                        });
                        elementAdded = true;
                        break;
                    }
                }
                if (elementAdded === false) {
                    // the element hasn't been added because of one of the following two reasons:
                    // - there are no <cmdElement>s attached to the <cmdWrap>
                    // - none of the <cmdElement>s command name is ">" than that of the <elemCmdName> 
                    requestAnimationFrame(() => {
                        this.cmdWrap.appendChild(cmdElementToAdd);
                    });
                }
                this.disableInput();
                cmdElementToAdd.addEventListener("transitionend", this.addCmdTransitionEnd, true);
                requestAnimationFrame(() => {
                    cmdElementToAdd.classList.add("fade-in-start");
                    requestAnimationFrame(() => {
                        cmdElementToAdd.classList.add("fade-in-end");
                    });
                });
            } else {
                // if the command *doesn't* start with the value of <cmdInput>, simply add it to the <commandViewMap>
                // with the visible bit set to false
                this.commandsViewMap.set(cmdKey, [cmdElementToAdd, false]);
            }
        }
    }
    removeCommand(cmdKey) {
        // removes a command
        let cmd = this.commandsViewMap.get(cmdKey);
        let cmdSpan = cmd[0];
        let isVisible = cmd[1];
        if (isVisible === true) {
            // if the command is visible, disable the input and start the 'fade-out-*' transition
            this.commandsViewMap.set(cmdKey, [cmd[0], false]);
            this.disableInput();
            cmdSpan.addEventListener("transitionend", this.removeCmdTransitionEnd, true);
            requestAnimationFrame(() => {
                cmdSpan.classList.add("fade-out-start");
                requestAnimationFrame(() => {
                    cmdSpan.classList.add("fade-out-end");
                });
            });
        }
    }
    onEnterReleased(event) {
        // handles the "keyup" event of <cmdInput> for the "return"-key
        // reads the <input> from <cmdInput> and checks if the controller holds the matching command
        if (event.keyCode === 13) {
            let input = this.cmdInput.value;
            this.controller.onCommandEntered(input);
        }
    }
    onFullscreenChanged() {
        // get fullscreenstate
        if (document.fullscreenElement !== null) {
            let exitFs = document.createElement("img");
            exitFs.classList.add("fs-image");
            exitFs.src = "/assets/icons/exit-fullscreen.svg";
            this.fsButton.innerHTML = "";
            this.fsButton.append(exitFs);
        }
        else {
            let goFs = document.createElement("img");
            goFs.classList.add("fs-image");
            goFs.src = "/assets/icons/go-fullscreen.svg";
            this.fsButton.innerHTML = "";
            this.fsButton.append(goFs);
        }
    }
    onInput() {
        // gets the value of <cmdInput> and compares it with the controllers commandsMap, resulting in two arrays
        let input = this.cmdInput.value;
        let commandsMapArray = Array.from(this.controller.commandsMap.entries());
        // an array of unmatched entries, those get removed from the <cmdWrap> if visible
        let commandEntriesUnmatched = commandsMapArray.filter(entry => !entry[1].command.startsWith(input)).filter(entry => entry[1].hidden === false).sort();
        for (let cmdEntry of commandEntriesUnmatched) {
            let cmdKey = cmdEntry[0];
            let isVisible = this.commandsViewMap.get(cmdKey)[1];
            if (isVisible === true) {
                this.removeCommand(cmdKey);
            }
        }
        // an array of matched entries, those get added from the <cmdWrap> if not visible
        let commandEntriesMatched = commandsMapArray.filter(entry => entry[1].command.startsWith(input)).filter(entry => entry[1].hidden === false).sort();
        for (let cmdEntry of commandEntriesMatched) {
            let cmdKey = cmdEntry[0];
            let isVisible = this.commandsViewMap.get(cmdKey)[1];
            if (isVisible === false) {
                this.addCommand(cmdKey);
            }
        }
    }

    enableInput() {
        // enables and focuses the <cmdInput> input element
        // sets the cursor for <terminalWrap> to "default"
        // sets the cursor of <cmdInpput> to "text"
        this.terminalWrap.style.cursor = "default";
        this.cmdInput.removeAttribute("disabled");
        this.cmdInput.style.cursor = "text";
        this.cmdInput.focus();
    }
    disableInput() {
        // disables the <cmdInput> input element
        // sets the cursor of <terminalWrap> to "progress"
        // sets the cursor of cmdInput> to "progress"
        this.terminalWrap.style.cursor = "progress";
        this.cmdInput.setAttribute("disabled", "");
        this.cmdInput.style.cursor = "progress";
    }
    displayOutput(cmdKey) {
        // fetches the <command> from the controller
        // builds and attaches a <screenElement> at the first position of the <screen>
        // adds the <fadeInEnd()> event listener to the <screenElement>
        // - which removes the fade-in-* css transition classes
        // initializes the fade-in-* transition
        let screenElement = document.createElement("div");
        screenElement.classList.add("screen-element");
        let cmdElement = document.createElement("div");
        cmdElement.classList.add("command");
        cmdElement.innerText = this.controller.getCommandCommandByKey(cmdKey);
        let cmdOutputElement = document.createElement("div");
        cmdOutputElement.classList.add("cmd-output")
        cmdOutputElement.innerText = this.controller.getCommandResultByKey(cmdKey);
        screenElement.append(cmdElement);
        screenElement.append(cmdOutputElement);
        requestAnimationFrame(() => {
            this.screen.insertBefore(screenElement, this.screen.firstChild);
        });

        screenElement.addEventListener("transitionend", function fadeInEnd(event) {
            event.stopPropagation();
            screenElement.removeEventListener("transitionend", fadeInEnd);
            requestAnimationFrame(() => {
                screenElement.classList.remove("fade-in-end");
                screenElement.classList.remove("fade-in-start");
            });
        });
        // this here seems to do the trick
        // maybe there is still a transition going on from opac 1 to opac 1
        // well, BUT: chromium doesn't work now. i'll either dig in more, or stop here.
        requestAnimationFrame(() => {
            screenElement.classList.add("fade-in-start");
            requestAnimationFrame(() => {
                screenElement.classList.add("fade-in-end");
            });
        });
    }
    clearScreen() {
        // fetches all <screenElement>s from <screen>
        // initializes the fade-out-* transition for every <screenElement>
        // adds the <fadeOutEnd()> event handler to every <screenElement>
        // - which removes the fade-out-* css transition classes
        // removes every <screenElement> from the DOM
        let screenElements = Array.from(this.screen.getElementsByClassName("screen-element"));
        for (let screenElement of screenElements) {
            screenElement.addEventListener("transitionend", function fadeOutEnd(event) {
                event.stopPropagation();
                screenElement.classList.remove("fade-out-start");
                screenElement.classList.remove("fade-out-end");
                screenElement.removeEventListener("transitionend", fadeOutEnd)
                screenElement.remove();
            });
            requestAnimationFrame(() => {
                screenElement.classList.add("fade-out-start");
                screenElement.classList.add("fade-out-end");
            });
        }
    }
    addCmdTransitionEnd(event) {
        // removes this event handler
        // initializes the fade-in-* transition
        // enables the <cmdInput>
        if (event.propertyName === "opacity") {
            event.stopPropagation();
            event.target.removeEventListener("transitionend", this.addCmdTransitionEnd, true);
            requestAnimationFrame(() => {
                event.target.classList.remove("fade-in-start");
                event.target.classList.remove("fade-in-end");
            });
            this.enableInput();
        }
    }
    removeCmdTransitionEnd(event) {
        // removes this event handler
        // initializes the fade-out-* transition
        // enables the <cmdInput>
        if (event.propertyName === "opacity") {
            event.stopPropagation();
            event.target.removeEventListener("transitionend", this.removeCmdTransitionEnd, true);
            requestAnimationFrame(() => {
                event.target.classList.remove("fade-out-start");
                event.target.classList.remove("fade-out-end");
                event.target.remove();
            });
            this.enableInput();
        }
    }
}

// eslint-disable-next-line no-unused-vars
class TerminalController {
    constructor() {
        // the commandsMap [key, value] pair is as followed:
        // - key: the command's command
        // - value: commandObject is of instance Command
        this.commandProvider = new CommandProvider();
        this.commandsMap = new Map();
    }
    registerCommand(cmd) {
        // adds a commandObject to the commandsMap
        // notifies the view by passing the <cmdKey> to the onCommandRegistered() method
        let cmdKey = cmd.command;
        if (!this.commandsMap.has(cmdKey)) {
            this.commandsMap.set(cmdKey, cmd);
            this.view.onCommandRegistered(cmdKey);
        }
    }
    unregisterCommand(cmd) {
        // removes a commandObject from the commandsMap
        // notifies the view by passing the <cmdKey> to the onCommandUnregistered() method
        let cmdKey = cmd.command;
        if (this.commandsMap.has(cmdKey)) {
            this.commandsMap.delete(cmdKey);
            this.view.onCommandUnregistered(cmdKey);
        }
    }
    onCommandEntered(input) {
        let commandsMapArray = Array.from(this.commandsMap.entries());
        let commandEntryMatched = commandsMapArray.filter(entry => entry[0] === input);
        if (commandEntryMatched.length === 1) {
            let cmdKey = commandEntryMatched.pop()[0];
            this.runCommandByKey(cmdKey);
        }
    }
    getCommandCommandByKey(cmdKey) {
        // returns the command of the command specified by <cmdKey>
        return this.commandsMap.get(cmdKey).command;
    }
    getCommandResultByKey(cmdKey) {
        // returns the result of the command specified by <cmdKey>
        return this.commandsMap.get(cmdKey).result;
    }
    runCommandByKey(cmdKey) {
        // executes the run() method of the command specified by <cmdKey>
        // calls the view's clearScreen() method if the command is "clear"
        // notifies the view by passing the <cmdKey> to it's displayOutput() method
        let cmd = this.commandsMap.get(cmdKey);
        cmd.run();
        switch (cmd.command) {
            case this.commandProvider.getClearCmd().command: {
                // clear command
                this.view.clearScreen();
                break;
            }
            case this.commandProvider.getLoginCmd().command: {
                // login command
                // - register logout command
                // - register rm command
                // - unregister login command
                let logoutCmd = this.commandProvider.getLogoutCmd();
                let rmCmd = this.commandProvider.getRmCmd();
                this.registerCommand(logoutCmd);
                this.registerCommand(rmCmd);
                this.view.displayOutput(cmdKey);
                this.unregisterCommand(cmd);
                break;
            }
            case this.commandProvider.getLogoutCmd().command: {
                // logout command
                // - unregister logout command
                // - unregister rm command
                // - register login command
                let logoutCmd = this.commandProvider.getLogoutCmd();
                let rmCmd = this.commandProvider.getRmCmd();
                let loginCmd = this.commandProvider.getLoginCmd();
                this.unregisterCommand(rmCmd);
                this.registerCommand(loginCmd);
                this.view.clearScreen();
                this.view.displayOutput(cmdKey);
                this.unregisterCommand(logoutCmd);
                break;
            }
            case this.commandProvider.getRmCmd().command: {
                // rm command
                // - unregister registered commands except the restore command
                this.view.displayOutput(cmdKey);
                for (const [, c] of this.commandsMap) {
                    if (c.command != this.commandProvider.getRestoreCmd().command) {
                        this.unregisterCommand(c);
                    }
                }
                break;
            }
            case this.commandProvider.getRestoreCmd().command: {
                // restore command
                // remove registered commands
                this.commandsMap.forEach((c) => {
                    this.unregisterCommand(c);
                });
                // register default commands
                this.commandProvider.getDefaultCommands().forEach((c,) => {
                    this.registerCommand(c);
                });
                this.view.displayOutput(cmdKey);
                break;
            }
            default: {
                this.view.displayOutput(cmdKey);
                break;
            }
        }
    }
    isCommandHiddenByKey(cmdKey) {
        return this.commandsMap.get(cmdKey).hidden;
    }
    onInitViewComplete(view) {
        // called by the view, indicating that it is ready to use
        // - binds the <TerminalView>-object to  the controller
        // - registers the default commands
        this.view = view;
        this.commandProvider.getDefaultCommands().forEach((cmd) => {
            this.registerCommand(cmd);
        });
        setTimeout(() => {
            this.view.displayOutput("about");
        }, 1000);
    }
}

const initVirtTerm = () => {
    let tc = new TerminalController();
    let tv = new TerminalView(tc, "main-content");
}

new Init(initVirtTerm);