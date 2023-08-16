rm -frd dist/*.js
rm -frd dist/*.css
rm -frd dist/*.gif
npx webpack
npx google-closure-compiler --js=bundle.js --js_output_file=dist/release.js --compilation_level=ADVANCED --language_out=ECMASCRIPT_2019 --warning_level=VERBOSE --jscomp_off=* --assume_function_wrapper
rm bundle.js
cp -r src/Assets/Images/gif.gif dist/gif.gif
css-minify -f src/Assets/Style/main.css -o dist