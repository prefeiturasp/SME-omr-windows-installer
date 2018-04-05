"use strict";
module.exports = function (grunt) {
    var pack = require('./package.json');
    var dirService = "c:/Servicos/GestaoAvaliacao-OMR";

    var version = process.env.GitVersion_LegacySemVerPadded || pack.version;

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        App: {
            application: './application',
            src: './src',
            dist: './dist',
            output: './output',
            lib: './lib'
        },

        clean: {
            dist: {
                src: '<%= App.dist %>'
            },
            output: {
                src: '<%= App.output %>'
            }
        },

        exec: {
            fileorganizer: {
                cwd: '<%= App.application %>/file-organizer/',
                cmd: 'npm install --production --force'
            },
            preprocessor: {
                cwd: '<%= App.application %>/preprocessor-server/',
                cmd: 'npm install --production --force'
            },
            processor: {
                cwd: '<%= App.application %>/processor-server/',
                cmd: 'npm install --production --force'
            },
            result_sync: {
                cwd: '<%= App.application %>/result-sync/',
                cmd: 'npm install --production --force'
            },
            admin_ui: {
                cwd: '<%= App.application %>/admin-ui/',
                cmd: 'npm install --production --force && bower install'
            },
            api: {
                cwd: '<%= App.application %>/api/',
                cmd: 'npm install --production --force'
            },
            configuration: {
                cwd: '<%= App.application %>/configuration-manager/',
                cmd: 'npm install --production --force && bower install'
            },
            scheduler: {
                cwd: '<%= App.application %>/task-scheduler/',
                cmd: 'npm install --production --force'
            }
        },

        copy: {
            base: {
                files: [{
                        expand: true,
                        cwd: '<%= App.application %>/base/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/admin-ui/lib/omr-base'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/base/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/api/lib/omr-base'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/base/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/configuration/lib/omr-base'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/base/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/fileorganizer/lib/omr-base'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/base/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/preprocessor/lib/omr-base'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/base/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/processor/lib/omr-base'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/base/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/resultsync/lib/omr-base'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/base/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/scheduler/lib/omr-base'
                    }
                ]
            },
            web: {
                files: [{
                        expand: true,
                        cwd: '<%= App.application %>/admin-ui/src/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/admin-ui'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/api/src/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/api'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/admin-ui/node_modules/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/admin-ui/node_modules'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/api/node_modules/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/api/node_modules'
                    }
                ]
            },
            service: {
                files: [{
                        expand: true,
                        cwd: '<%= App.application %>/preprocessor-server/src/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/preprocessor'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/processor-server/src/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/processor'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/file-organizer/src/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/fileorganizer'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/result-sync/src/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/resultsync'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/task-scheduler/src/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/scheduler'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/preprocessor-server/node_modules/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/preprocessor/node_modules'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/processor-server/node_modules/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/processor/node_modules'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/file-organizer/node_modules/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/fileorganizer/node_modules'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/result-sync/node_modules/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/resultsync/node_modules'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/task-scheduler/node_modules/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/scheduler/node_modules'
                    }
                ]
            },
            configuration: {
                files: [{
                        expand: true,
                        cwd: '<%= App.application %>/configuration-manager/src/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/configuration'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/configuration-manager/node_modules/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/configuration/node_modules'
                    }
                ]
            },
            package: {
                files: [{
                        expand: true,
                        cwd: '<%= App.application %>/admin-ui/',
                        src: 'package.json',
                        dest: '<%= App.dist %>/data/admin-ui'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/api/',
                        src: 'package.json',
                        dest: '<%= App.dist %>/data/api'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/configuration-manager/',
                        src: 'package.json',
                        dest: '<%= App.dist %>/data/configuration'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/file-organizer/',
                        src: 'package.json',
                        dest: '<%= App.dist %>/data/fileorganizer'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/preprocessor-server/',
                        src: 'package.json',
                        dest: '<%= App.dist %>/data/preprocessor'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/processor-server/',
                        src: 'package.json',
                        dest: '<%= App.dist %>/data/processor'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/result-sync/',
                        src: 'package.json',
                        dest: '<%= App.dist %>/data/resultsync'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.application %>/task-scheduler/',
                        src: 'package.json',
                        dest: '<%= App.dist %>/data/scheduler'
                    }
                ],
                options: {
                    process: (content) => {
                        content = content.replace('./src/App.js', './App.js');
                        return content;
                    }
                }
            },
            canvas: {
                files: [{
                        expand: true,
                        cwd: '<%= App.lib %>/canvas/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/preprocessor/node_modules/canvas'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.lib %>/canvas/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/processor/node_modules/canvas'
                    }
                ]
            },
            qrcode: {
                files: [{
                        expand: true,
                        cwd: '<%= App.lib %>/mstech-node-qrcode/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/fileorganizer/node_modules/mstech-node-qrcode'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.lib %>/mstech-node-qrcode/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/preprocessor/node_modules/mstech-node-qrcode'
                    }
                ]
            },
            crypto: {
                files: [{
                        expand: true,
                        cwd: '<%= App.lib %>/mstech-node-cryptography/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/scheduler/node_modules/mstech-node-cryptography'
                    },
                    {
                        expand: true,
                        cwd: '<%= App.lib %>/mstech-node-cryptography/',
                        src: ['**'],
                        dest: '<%= App.dist %>/data/configuration/node_modules/mstech-node-cryptography'
                    }
                ]
            },
            core: {
                expand: true,
                cwd: '<%= App.lib %>/',
                src: [
                    'convert.exe',
                    'node.exe',
                    'nssm.exe',
                    'vcredist_x86.exe'
                ],
                dest: '<%= App.dist %>/bin/'
            },
            all_bat: {
                expand: true,
                cwd: '<%= App.lib %>/bat/',
                src: ['**'],
                dest: '<%= App.dist %>/bin/',
                options: {
                    process: (content) => {
                        content = content.replace(/\[VERSION\]/g, version);
                        content = content.replace(/\[BASE_DIR_NAME\]/g, dirService);
                        return content;
                    }
                }
            },
            all_config: {
                expand: true,
                cwd: '<%= App.lib %>/config/',
                src: ['**'],
                dest: '<%= App.dist %>/config/',
                options: {
                    process: (content) => {
                        content = content.replace(/\[VERSION\]/g, version);
                        content = content.replace(/\[BASE_DIR_NAME\]/g, dirService);
                        return content;
                    }
                }
            },
            installer: {
                expand: true,
                cwd: '<%= App.src %>/',
                src: 'omr-installer.iss',
                dest: '<%= App.output %>',
                options: {
                    process: (content) => {
                        content = content.replace(/\[VERSION\]/g, version);
                        content = content.replace(/\[SORUCE_DIR\]/g, __dirname + '\\dist\\');
                        content = content.replace(/\[BASE_DIR_NAME\]/g, dirService);
                        return content;
                    }
                }
            }
        },

        innosetup_compiler: {
            single: {
                options: {
                    O: '<%= App.output %>/',
                    F: 'omr'
                },
                script: "<%= App.output %>/omr-installer.iss"
            }
        },
        zip: {
            'installer': {
                cwd: "<%= App.output %>/",
                src: ["<%= App.output %>/*.exe"],
                dest: '<%= App.output %>/omr_'+version+'.zip'
            }
        }
    });


    grunt.loadNpmTasks('innosetup-compiler');
    grunt.loadNpmTasks('grunt-zip');
    grunt.registerTask('default', [
        'clean',
        'exec',
        'copy:web',
        'copy:service',
        'copy:configuration',
        'copy:package',
        'copy:canvas',
        'copy:core',
        'copy:base',
        'copy:qrcode',
        'copy:crypto',
        'copy:all_bat',
        'copy:all_config',
        'copy:installer',
        'innosetup_compiler:single',
        'zip:installer'
    ]);
};
