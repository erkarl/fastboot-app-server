"use strict";
var chalk = require('chalk');
var cluster = require('cluster');
var UI = (function () {
    function UI() {
        var type = cluster.isMaster ? 'm' : 'w';
        this.pid = "" + type + process.pid;
    }
    UI.prototype.writeLine = function () {
        var args = Array.prototype.slice.apply(arguments);
        args.unshift('blue');
        this._write.apply(this, args);
    };
    UI.prototype.writeError = function (message) {
        console.log(this._errorPrefix() + chalk.red(message));
    };
    UI.prototype._write = function () {
        var args = Array.prototype.slice.apply(arguments);
        var color = args.shift();
        if (args[0] !== null || args[0] !== undefined) {
            args[0] = this._prefix(color) + args[0];
        }
        console.log.apply(console, args);
    };
    UI.prototype._prefix = function () {
        var timestamp = chalk.bgBlue.white(this._timestamp());
        var pid = chalk.blue(this._pid());
        return "" + timestamp + pid + " ";
    };
    UI.prototype._errorPrefix = function () {
        var timestamp = chalk.bgRed.white(this._timestamp());
        var pid = chalk.red(this._pid());
        return "" + timestamp + pid + " ";
    };
    UI.prototype._timestamp = function () {
        return "[" + (new Date()).toISOString() + "]";
    };
    UI.prototype._pid = function () {
        return this.pid ? "[" + this.pid + "]" : '';
    };
    return UI;
}());
module.exports = UI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1aS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRW5DO0lBQ0U7UUFDRSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDeEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFHLElBQUksR0FBRyxPQUFPLENBQUMsR0FBSyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxzQkFBUyxHQUFUO1FBQ0UsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCx1QkFBVSxHQUFWLFVBQVcsT0FBTztRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELG1CQUFNLEdBQU47UUFDRSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXpCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELG9CQUFPLEdBQVA7UUFDRSxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN0RCxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRWxDLE1BQU0sQ0FBQyxLQUFHLFNBQVMsR0FBRyxHQUFHLE1BQUcsQ0FBQztJQUMvQixDQUFDO0lBRUQseUJBQVksR0FBWjtRQUNFLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFakMsTUFBTSxDQUFDLEtBQUcsU0FBUyxHQUFHLEdBQUcsTUFBRyxDQUFDO0lBQy9CLENBQUM7SUFFRCx1QkFBVSxHQUFWO1FBQ0UsTUFBTSxDQUFDLE1BQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLE1BQUcsQ0FBQztJQUMzQyxDQUFDO0lBRUQsaUJBQUksR0FBSjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQUksSUFBSSxDQUFDLEdBQUcsTUFBRyxHQUFHLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBQ0gsU0FBQztBQUFELENBQUMsQUFqREQsSUFpREM7QUFHRCxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyJ9