import Vue from 'vue'

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg'
// Require Froala Editor js file.
require('froala-editor/js/froala_editor.pkgd.min.js')

// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css')
require('font-awesome/css/font-awesome.css')
require('froala-editor/css/froala_style.min.css')
Vue.use(VueFroala)
