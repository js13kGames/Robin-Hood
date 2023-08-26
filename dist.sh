rm -frd dist/*.js
rm -frd dist/*.css
rm -frd dist/*.gif
npx webpack
npx google-closure-compiler --js=distprep/bundle.js --js_output_file=distprep/release.js --compilation_level=ADVANCED --language_out=ECMASCRIPT_2019 --warning_level=VERBOSE --jscomp_off=* --assume_function_wrapper
npx roadroller distprep/release.js -o distprep/main.js
cp distprep/main.js dist/main.js
# rm bundle.js
cp -r src/Assets/Images/gif2.gif dist/gif.gif
css-minify -f src/Assets/Style/main.css -o dist
#npx js13k-packer dist/index.html dist/publish --minify "{\"collapseBooleanAttributes\":true}"