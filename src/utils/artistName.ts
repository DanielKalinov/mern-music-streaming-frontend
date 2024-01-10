function artistNames(artist: { name: string }[]) {
	if (artist) {
		return artist.length > 1
			? artist.map((item) => item.name).join(', ')
			: artist[0].name;
	}

	return '';
}

export default artistNames;
