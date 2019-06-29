class Musican {
  constructor(url) {
    this.url = url;
  }

  async getAlbums() {
    const response = await fetch(this.url);
    return response.json();
  }
}
export { Musican };
