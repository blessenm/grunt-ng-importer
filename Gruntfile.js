/*
 * grunt-ng-importer
 * https://github.com/blessenm/grunt-ng-importer
 *
 * Copyright (c) 2015 Blessan Mathew
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    ngimporter: {
      default_options: {
        options: {
        },
        files: {
          'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
        }
      },
      custom_options: {
        options: {
          separator: ': ',
          punctuation: ' !!!'
        },
        files: {
          'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
        }
      },
      dev: {
        importData: [{
            src: ['tmp/controllers/**/*.js'],
            dest: 'tmp/controllers/index.js',
            base: 'tmp/controllers/',
            type: 'controller'
          }, {
            src: ['tmp/directives/**/*.js'],
            dest: 'tmp/directives/index.js',
            base: 'tmp/directives/',
            type: 'directive'
          }, {
            src: ['tmp/services/**/*.js'],
            dest: 'tmp/services/index.js',
            base: 'tmp/services/',
            type: 'service'
          }, {
            src: ['tmp/filters/**/*.js'],
            dest: 'tmp/filters/index.js',
            base: 'tmp/filters/',
            type: 'filter'
          }
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'ngimporter', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
