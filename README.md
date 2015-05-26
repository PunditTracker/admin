admin-react
============

Admin backend using ReactJS (along with React Router and RefluxJS), SASS, Gulp, and Browserify that also utilizes Gulp best practices from [this resource](https://github.com/greypants/gulp-starter), boilerplate from [this resource](https://github.com/jakemmarsh/react-rocket-boilerplate).

---

### Getting up and running

1. Clone this repo from `https://github.com/PunditTracker/admin.git`
2. Run `npm install` from the root directory
3. Run `gulp dev` (may require installing Gulp globally `npm install gulp -g`)
4. Your browser will automatically be opened and directed to the browser-sync proxy address
5. To prepare assets for production, run the `gulp prod` task (Note: the production task does not fire up the express server, and won't provide you with browser-sync's live reloading. Simply use `gulp dev` during development. More information below)

Now that `gulp dev` is running, the server is up as well and serving files from the `/build` directory. Any changes in the `/app` directory will be automatically processed by Gulp and the changes will be injected to any open browsers pointed at the proxy address.

### Deploying:

1. Same as above
2. Same as above
3. **Development:** To deploy to the development staging environment, simply run `gulp deploy`
4. **Production:** To deploy to the production environment, run `gulp deploy --prod` or `gulp deploy --production`

Running the `deploy` task (whether to `dev` or to `prod`) will automatically build the correct versions of all the assets and upload them to the corresponding Amazon S3 bucket.
