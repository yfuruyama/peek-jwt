convert-image:
	convert image/icon/icon.png -background none -resize 16x16   image/icon/icon_16x16.png
	convert image/icon/icon.png -background none -resize 48x48   image/icon/icon_48x48.png
	convert image/icon/icon.png -background none -resize 128x128 image/icon/icon_128x128.png

package:
	zip package.zip image/icon/* src/lib/* src/* manifest.json
