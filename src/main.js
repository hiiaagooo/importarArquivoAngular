'use strict';
/*
* import the main styles
* */
import 'angular-block-ui/dist/angular-block-ui.css';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'angular-moment-picker/dist/angular-moment-picker.css';
import 'sweetalert/dist/sweetalert.css';
import './app/assets/sass/app.scss';
/*
* get the app module
* */
import './app';
import './bootstrap';
import './app/assets/scripts/core'
import './app/assets/scripts/v2'

import './app/configs/restangular.config';
import './app/configs/translate.config';
import './app/configs/idle.config';
import './app/configs/moment-picker.config';

/*
* manually starts the app instead of using ng-app inside index.html
* */
angular.bootstrap(document, [process.env.APP_NAME], {strictDi: false});
