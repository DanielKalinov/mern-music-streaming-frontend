function artistNames(artist: { name: string }[]) {
	if (artist) {
		return artist.length > 1
			? artist
					.map((item) => item.name)
					.join(', ')
					.toUpperCase()
			: artist[0].name.toUpperCase();
	}

	return '';
}

export default artistNames;
