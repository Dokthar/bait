
IMG := icons/bait-48.png icons/bait-96.png icons/bait.png
SRC := manifest.json bait.js bait.css $(IMG)
NAME := bait

all: $(NAME).zip

$(NAME).zip: $(SRC)
	zip -r -FS $@ $^

.PHONY: all dist
