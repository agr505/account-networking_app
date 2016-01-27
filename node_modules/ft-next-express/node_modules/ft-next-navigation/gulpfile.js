'use strict';

var gulp = require('gulp');
var jsonlint = require('gulp-jsonlint');
var data = require('gulp-data');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');

var topLevelSections = ['world', 'companies', 'markets', 'opinion', 'work & career', 'life & arts'];

gulp.task('test', function () {
	return gulp.src('./config/*.json')
		.pipe(jsonlint())
		.pipe(jsonlint.reporter());
});

gulp.task('build', function () {
	return gulp.src('./templates/**/*-template.html')
		.pipe(data(function () {
			return {
				all: require('./config/nav.json').map(function (navItem) {
					navItem.isTopLevel = topLevelSections.indexOf(navItem.name.toLowerCase()) > -1;
					return navItem;
				}),
				nav: require('./config/nav.json').filter(function (navItem) {
					return topLevelSections.indexOf(navItem.name.toLowerCase()) > -1;
				})
			};
		}))
		.pipe(handlebars())
		.pipe(rename(function (path) {
			path.basename = path.basename.replace('-template', '');
		}))
		.pipe(gulp.dest('templates'));
});
