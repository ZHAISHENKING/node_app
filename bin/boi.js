#!/usr/bin/env node
const program = require('commander')

program.command('new [dir]')
.description('create a project')
.usage('[dir] --template <template>')
.option('-t --template [template]', 'specify template application')
.action(function (dir, options){
    require('./features/generator.js')(dir, options.template)
}).on('--help', function(){
    console.log(' Examples:\n')
    console.log('  $ boi new demo -t webapp')
    console.log('  $ boi new . -t webapp')
})