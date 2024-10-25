const Applet = imports.ui.applet;
const PopupMenu = imports.ui.popupMenu;
const Util = imports.misc.util;
const Clutter = imports.gi.Clutter;
const Main = imports.ui.main;  // Import Main for keybinding manager
const Lang = imports.lang;      // Import Lang for binding methods

function MyApplet(orientation) {
    this._init(orientation);
}

var CommandConstants = new function() {
    this.COMMAND_OPEN_IDEA = "idea";
    this.COMMAND_OPEN_GOLAND = "goland";
    this.COMMAND_OPEN_CHROME = "google-chrome";
    this.COMMAND_OPEN_POSTMAN = "postman";
};

MyApplet.prototype = {
    __proto__: Applet.IconApplet.prototype,

    _init: function(orientation) {
        Applet.IconApplet.prototype._init.call(this, orientation);
        this.set_applet_icon_symbolic_name("applications-development");
        this.set_applet_tooltip("Links");

        // Create a menu manager and popup menu
        this.menuManager = new PopupMenu.PopupMenuManager(this);
        this.menu = new Applet.AppletPopupMenu(this, orientation);
        this.menuManager.addMenu(this.menu);

        // Adding menu items for applications
        this.menu.addAction("IntelliJ IDEA", () => {
            Util.spawnCommandLine(CommandConstants.COMMAND_OPEN_IDEA);
        });
        this.menu.addAction("GoLand", () => {
            Util.spawnCommandLine(CommandConstants.COMMAND_OPEN_GOLAND);
        });
        this.menu.addAction("Postman", () => {
            Util.spawnCommandLine(CommandConstants.COMMAND_OPEN_POSTMAN);
        });
        this.menu.addAction("Chrome", () => {
            Util.spawnCommandLine(CommandConstants.COMMAND_OPEN_CHROME);
        });

        // Connect the menu's 'open-state-changed' signal to enable/disable hotkeys
        this.menu.connect('open-state-changed', (menu, isOpen) => {
            if (isOpen) {
                this._registerHotKeys();
            } else {
                this._unregisterHotKeys();
            }
        });

        // Connect to applet click to toggle the menu
        this.actor.connect('button-press-event', () => {
            this.menu.toggle();
        });
    },

    _registerHotKeys: function() {
        // Add hotkeys for each command
        Main.keybindingManager.addHotKey('open-idea', 'i', Lang.bind(this, this._onOpenIdea));
        Main.keybindingManager.addHotKey('open-goland', 'g', Lang.bind(this, this._onOpenGoLand));
        Main.keybindingManager.addHotKey('open-chrome', 'c', Lang.bind(this, this._onOpenChrome));
        Main.keybindingManager.addHotKey('open-postman', 'p', Lang.bind(this, this._onOpenPostman));
    },

    _unregisterHotKeys: function() {
        // Remove hotkeys for each command
        Main.keybindingManager.removeHotKey('open-idea');
        Main.keybindingManager.removeHotKey('open-goland');
        Main.keybindingManager.removeHotKey('open-chrome');
        Main.keybindingManager.removeHotKey('open-postman');
    },

    _onOpenIdea: function() {
        Util.spawnCommandLine(CommandConstants.COMMAND_OPEN_IDEA);
    },

    _onOpenGoLand: function() {
        Util.spawnCommandLine(CommandConstants.COMMAND_OPEN_GOLAND);
    },

    _onOpenChrome: function() {
        Util.spawnCommandLine(CommandConstants.COMMAND_OPEN_CHROME);
    },

    _onOpenPostman: function() {
        Util.spawnCommandLine(CommandConstants.COMMAND_OPEN_POSTMAN);
    },

    on_applet_clicked: function() {
        this.menu.toggle();
    }
};

function main(metadata, orientation) {
    let myApplet = new MyApplet(orientation);
    return myApplet;
}
