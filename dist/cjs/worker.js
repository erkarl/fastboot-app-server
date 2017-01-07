"use strict";
var FastBoot = require('fastboot');
var fastbootMiddleware = require('fastboot-express-middleware');
var ExpressHTTPServer = require('./express-http-server');
var Worker = (function () {
    function Worker(options) {
        this.distPath = options.distPath;
        this.httpServer = options.httpServer;
        this.ui = options.ui;
        this.cache = options.cache;
        this.gzip = options.gzip;
        this.username = options.username;
        this.password = options.password;
        this.beforeMiddleware = options.beforeMiddleware;
        this.afterMiddleware = options.afterMiddleware;
        if (!this.httpServer) {
            this.httpServer = new ExpressHTTPServer({
                ui: this.ui,
                distPath: this.distPath,
                cache: this.cache,
                gzip: this.gzip,
                username: this.username,
                password: this.password,
                beforeMiddleware: this.beforeMiddleware,
                afterMiddleware: this.afterMiddleware,
            });
        }
        if (!this.httpServer.cache) {
            this.httpServer.cache = this.cache;
        }
        if (!this.httpServer.distPath) {
            this.httpServer.distPath = this.distPath;
        }
        if (!this.httpServer.ui) {
            this.httpServer.ui = this.ui;
        }
    }
    Worker.prototype.start = function () {
        if (!this.distPath) {
            this.middleware = this.noAppMiddleware();
        }
        else {
            this.middleware = this.buildMiddleware();
        }
        this.bindEvents();
        this.serveHTTP();
    };
    Worker.prototype.bindEvents = function () {
        var _this = this;
        process.on('message', function (message) { return _this.handleMessage(message); });
    };
    Worker.prototype.handleMessage = function (message) {
        switch (message.event) {
            case 'reload':
                this.fastboot.reload();
                break;
            case 'error':
                this.error = message.error;
                break;
            case 'shutdown':
                process.exit(0);
                break;
        }
    };
    Worker.prototype.buildMiddleware = function () {
        this.fastboot = new FastBoot({
            distPath: this.distPath,
        });
        return fastbootMiddleware({
            fastboot: this.fastboot
        });
    };
    Worker.prototype.serveHTTP = function () {
        this.ui.writeLine('starting HTTP server');
        return this.httpServer.serve(this.middleware)
            .then(function () {
            process.send({ event: 'http-online' });
        });
    };
    Worker.prototype.noAppMiddleware = function () {
        var _this = this;
        return function (req, res) {
            var html = '<h1>No Application Found</h1>';
            if (_this.error) {
                html += '<pre style="color: red">' + _this.error + '</pre>';
            }
            res.status(500).send(html);
        };
    };
    return Worker;
}());
module.exports = Worker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid29ya2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQU0sUUFBUSxHQUFhLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMvQyxJQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQ2xFLElBQU0saUJBQWlCLEdBQUksT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFFNUQ7SUFDRSxnQkFBWSxPQUFPO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDckMsSUFBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDO1FBQ2pELElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQztRQUUvQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQztnQkFDdEMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUNYLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixJQUFJ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