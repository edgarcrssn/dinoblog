export const manageToken = {
  key: 'token',

  set(token: string) {
    localStorage.setItem(this.key, JSON.stringify({ token }));
  },

  get(): string | null {
    const itemString = localStorage.getItem(this.key);
    if (!itemString) return null;
    const item = JSON.parse(itemString);

    return item.token;
  },

  remove() {
    localStorage.removeItem(this.key);
  },
};
