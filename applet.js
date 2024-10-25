const Applet = imports.ui.applet;
const PopupMenu = imports.ui.popupMenu;
const Util = imports.misc.util;
const Clutter = imports.gi.Clutter;

function MyApplet(orientation) {
    this._init(orientation);
}

var CommandConstants = new function() {
    this.COMMAND_OPEN_IDEA = "idea";
    this.COMMAND_OPEN_GOLAND = "goland";
    this.COMMAND_OPEN_CHROME = "google-chrome";
    this.COMMAND_OPEN_POSTMAN = "postman";
}

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

        this.actor.connect('key-press-event', (actor, event) => this._onKeyPress(event));
    },

    _onKeyPress: function(event) {
        let symbol = event.get_key_symbol();

        switch (symbol) {
            case Clutter.KEY_I:
                Util.spawnCommandLine(CommandConstants.COMMAND_OPEN_IDEA);
                return true;
            case Clutter.KEY_G:
                Util.spawnCommandLine(CommandConstants.COMMAND_OPEN_GOLAND);
                return true;
            case Clutter.KEY_C:
                Util.spawnCommandLine(CommandConstants.COMMAND_OPEN_CHROME);
                return true;
            case Clutter.KEY_P:
                Util.spawnCommandLine(CommandConstants.COMMAND_OPEN_POSTMAN);
                return true;
            default:
                return false;
        }
    },


    on_applet_clicked: function() {
        this.menu.toggle();
    }
};

function main(metadata, orientation) {
    let myApplet = new MyApplet(orientation);
    return myApplet;
}
